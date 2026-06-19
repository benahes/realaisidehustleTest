"use client";

import { useEffect, useState, useRef } from "react";

type ProfileData = {
  profile: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl: string;
    organization: string;
    role: string;
    isSubscribed: boolean;
    createdAt: string;
  };
  stats: {
    purchaseCount: number;
    totalRevenue: number;
    courseProgressCount: number;
    newsletterActive: boolean;
  };
  recentPurchases: Array<{
    id: string;
    itemType: "COURSE" | "TOOL";
    itemName: string;
    amount: number;
    currency: string;
    status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
    createdAt: string;
  }>;
};

export function ProfilePageClient() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadProfile = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/profile", { cache: "no-store" });
      const text = await res.text();
      const json = text ? JSON.parse(text) : {};
      if (!res.ok || !json?.success) {
        const msg = json?.error || `Failed to load profile (${res.status})`;
        const detail = json?.details ? `\n${json.details}` : '';
        throw new Error(msg + detail);
      }
      const payload = json.data as ProfileData;
      setData(payload);
      setFullName(payload.profile.fullName || "");
      setOrganization(payload.profile.organization || "");
      setAvatarUrl(payload.profile.avatarUrl || "");
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProfile(false);
  }, []);

  const memberSince = data?.profile.createdAt
    ? new Date(data.profile.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";

  const handleAvatarUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      });
      const uploadText = await uploadRes.text();
      const uploadJson = uploadText ? JSON.parse(uploadText) : {};
      if (!uploadRes.ok || !uploadJson?.success) {
        throw new Error(uploadJson?.error || `Upload failed (${uploadRes.status})`);
      }

      const publicUrl = uploadJson.data?.url;
      setAvatarUrl(publicUrl);

      // Auto-save after upload
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, organization, avatarUrl: publicUrl }),
      });
      const text = await res.text();
      const json = text ? JSON.parse(text) : {};
      if (!res.ok || !json?.success) {
        throw new Error(json?.error || `Failed to save avatar (${res.status})`);
      }
      setSuccess("Avatar updated successfully");
      await loadProfile();
    } catch (err: any) {
      setError(err.message || "Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, organization, avatarUrl }),
      });
      const text = await res.text();
      const json = text ? JSON.parse(text) : {};
      if (!res.ok || !json?.success) {
        const msg = json?.error || `Failed to save profile (${res.status})`;
        const detail = json?.details ? `\n${json.details}` : '';
        throw new Error(msg + detail);
      }
      setSuccess("Profile updated successfully");
      await loadProfile();
    } catch (err: any) {
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="max-w-container-max mx-auto px-3 sm:px-margin-edge pb-3 sm:pb-5 grid grid-cols-12 gap-2 sm:gap-gutter pt-[10px] sm:pt-[15px]">
      <aside className="col-span-12 lg:col-span-4 flex flex-col gap-2 sm:gap-stack-mid">
        <section className="glass-panel p-2.5 sm:p-gutter rounded-lg border border-outline-variant/30">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <h2 className="font-h2 text-lg sm:text-[24px] text-on-surface">
              Profile Overview
            </h2>
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary-container" />
          </div>

          {loading ? (
            <p className="text-on-surface-variant text-sm">Loading profile...</p>
          ) : (
            <div className="flex flex-col gap-2 sm:gap-gutter">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-outline-variant/40 cursor-pointer group shrink-0"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-container/30 flex items-center justify-center text-primary text-lg sm:text-xl font-bold">
                      {fullName ? fullName.charAt(0).toUpperCase() : data?.profile.email.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white text-lg sm:text-xl">photo_camera</span>
                  </div>
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAvatarUpload(file);
                    e.target.value = '';
                  }}
                />
                <p className="text-[10px] sm:text-xs text-outline cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  {uploading ? 'Uploading...' : 'Change photo'}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-xs sm:text-[13px] text-outline uppercase tracking-widest">
                  Full Name
                </label>
                <input
                  className="bg-transparent border-b border-outline-variant focus:border-primary outline-none py-1 text-on-surface text-sm sm:text-[16px] transition-colors"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-xs sm:text-[13px] text-outline uppercase tracking-widest">
                  Email
                </label>
                <input
                  className="bg-transparent border-b border-outline-variant py-1 text-on-surface text-sm sm:text-[16px] opacity-70"
                  type="email"
                  value={data?.profile.email || ""}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-xs sm:text-[13px] text-outline uppercase tracking-widest">
                  Organization
                </label>
                <input
                  className="bg-transparent border-b border-outline-variant focus:border-primary outline-none py-1 text-on-surface text-sm sm:text-[16px] transition-colors"
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <p className="font-label-caps text-xs sm:text-[12px] text-outline uppercase tracking-widest">
                    Role
                  </p>
                  <p className="text-on-surface text-sm">{data?.profile.role || "-"}</p>
                </div>
                <div>
                  <p className="font-label-caps text-xs sm:text-[12px] text-outline uppercase tracking-widest">
                    Member Since
                  </p>
                  <p className="text-on-surface text-sm">{memberSince}</p>
                </div>
              </div>

              {error && <p className="text-error text-xs sm:text-[13px]">{error}</p>}
              {success && <p className="text-primary text-xs sm:text-[13px]">{success}</p>}

              <div className="pt-1.5 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving || loading}
                  className="bg-primary-container text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm font-label-caps text-xs sm:text-[13px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </section>
      </aside>

      <div className="col-span-12 lg:col-span-8 flex flex-col gap-2 sm:gap-stack-mid">
        <section className="glass-panel rounded-lg border border-outline-variant/30">
          <div className="p-2.5 sm:p-gutter border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <div>
              <h2 className="font-h2 text-lg sm:text-[24px] text-on-surface">
                Account Stats
              </h2>
              <p className="text-xs sm:text-[13px] text-outline mt-0.5">
                Live data from your local backend
              </p>
            </div>
          </div>

          <div className="p-2.5 sm:p-gutter grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-gutter bg-surface-container-lowest">
            <div className="flex flex-col gap-1">
              <span className="font-label-caps text-xs sm:text-[13px] text-outline uppercase tracking-widest">
                Purchases
              </span>
              <span className="font-h1 text-xl sm:text-[26px] text-primary">
                {data?.stats.purchaseCount ?? 0}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-label-caps text-xs sm:text-[13px] text-outline uppercase tracking-widest">
                Revenue
              </span>
              <span className="font-h1 text-xl sm:text-[26px] text-on-surface">
                {data
                  ? `${(data.stats.totalRevenue / 100).toFixed(2)}`
                  : "0.00"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-label-caps text-xs sm:text-[13px] text-outline uppercase tracking-widest">
                Course Progress
              </span>
              <span className="font-h1 text-xl sm:text-[26px] text-tertiary">
                {data?.stats.courseProgressCount ?? 0}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-label-caps text-xs sm:text-[13px] text-outline uppercase tracking-widest">
                Newsletter
              </span>
              <span className="font-h1 text-xl sm:text-[26px] text-on-surface">
                {data?.stats.newsletterActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </section>

        <section className="glass-panel rounded-lg border border-outline-variant/30 overflow-hidden">
          <div className="p-2.5 sm:p-gutter border-b border-outline-variant bg-surface-container-low">
            <h2 className="font-h2 text-lg sm:text-[24px] text-on-surface">
              Recent Purchases
            </h2>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden bg-surface-container-lowest">
            {(data?.recentPurchases || []).length === 0 ? (
              <div className="p-2.5 text-on-surface-variant text-sm">
                No purchases yet.
              </div>
            ) : (
              <div className="divide-y divide-outline-variant/10">
                {data?.recentPurchases.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 flex flex-col gap-1 hover:bg-slate-800/20 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-on-surface font-medium text-sm">{p.itemName}</span>
                      <span className="text-xs text-on-surface-variant bg-surface-container-high px-1.5 py-0.5 rounded">{p.itemType}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-primary font-mono">{p.currency} {(p.amount / 100).toFixed(2)}</span>
                      <span className="text-on-surface-variant">{p.status}</span>
                    </div>
                    <div className="text-xs text-outline">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high border-b border-outline-variant">
                  <th className="p-2.5 font-label-caps text-xs sm:text-[13px] text-outline uppercase">
                    Item
                  </th>
                  <th className="p-2.5 font-label-caps text-xs sm:text-[13px] text-outline uppercase">
                    Type
                  </th>
                  <th className="p-2.5 font-label-caps text-xs sm:text-[13px] text-outline uppercase">
                    Amount
                  </th>
                  <th className="p-2.5 font-label-caps text-xs sm:text-[13px] text-outline uppercase">
                    Status
                  </th>
                  <th className="p-2.5 font-label-caps text-xs sm:text-[13px] text-outline uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {(data?.recentPurchases || []).length === 0 ? (
                  <tr>
                    <td className="p-2.5 text-on-surface-variant" colSpan={5}>
                      No purchases yet.
                    </td>
                  </tr>
                ) : (
                  data?.recentPurchases.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-800/20 transition-colors"
                    >
                      <td className="p-2.5 text-on-surface text-sm">{p.itemName}</td>
                      <td className="p-2.5 text-on-surface-variant text-sm">{p.itemType}</td>
                      <td className="p-2.5 text-on-surface text-sm">
                        {p.currency} {(p.amount / 100).toFixed(2)}
                      </td>
                      <td className="p-2.5 text-on-surface-variant text-sm">{p.status}</td>
                      <td className="p-2.5 text-on-surface-variant text-sm">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

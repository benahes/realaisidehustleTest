import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const auth = await requireAdmin();
  if ("error" in auth) redirect("/admin/login");

  let users: any[] = [];

  try {
    users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isSubscribed: true,
        createdAt: true,
        _count: { select: { purchases: true, blogPosts: true } },
      },
    });
  } catch {
    // Database unavailable — return empty state
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-h1 text-2xl tracking-tighter text-on-surface">Users</h1>
        <span className="font-mono-data text-sm text-outline">{users.length} total</span>
      </div>

      <div className="rounded-xl border border-outline-variant/30 overflow-hidden bg-surface-container/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-high border-b border-outline-variant/30">
              <tr>
                <th className="px-4 py-3 font-label-caps text-xs uppercase tracking-wider text-on-surface-variant">User</th>
                <th className="px-4 py-3 font-label-caps text-xs uppercase tracking-wider text-on-surface-variant">Role</th>
                <th className="px-4 py-3 font-label-caps text-xs uppercase tracking-wider text-on-surface-variant">Subscribed</th>
                <th className="px-4 py-3 font-label-caps text-xs uppercase tracking-wider text-on-surface-variant">Purchases</th>
                <th className="px-4 py-3 font-label-caps text-xs uppercase tracking-wider text-on-surface-variant">Posts</th>
                <th className="px-4 py-3 font-label-caps text-xs uppercase tracking-wider text-on-surface-variant">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-high/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">{user.name || "—"}</span>
                      <span className="text-on-surface-variant text-xs">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium uppercase tracking-wider ${
                      user.role === "ADMIN" || user.role === "SUPER_ADMIN"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-surface-container-high text-on-surface-variant border border-outline-variant/20"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`material-symbols-outlined text-sm ${user.isSubscribed ? "text-emerald-400" : "text-outline-variant"}`}>
                      {user.isSubscribed ? "check_circle" : "cancel"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono-data text-on-surface-variant">{user._count.purchases}</td>
                  <td className="px-4 py-3 font-mono-data text-on-surface-variant">{user._count.blogPosts}</td>
                  <td className="px-4 py-3 text-on-surface-variant text-xs">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="p-8 text-center text-on-surface-variant text-sm">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}

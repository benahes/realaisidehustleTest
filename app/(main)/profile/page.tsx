import type { Metadata } from "next";
import { ProfilePageClient } from "@/components/ProfilePageClient";

export const metadata: Metadata = {
  title: "Profile — AI Side Hustle",
  description: "User profile and account management.",
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}

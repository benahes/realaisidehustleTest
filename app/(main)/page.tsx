import type { Metadata } from "next";
import BlogHomeClient from "./_components/BlogHomeClient";

export const metadata: Metadata = {
  title: "AI Side Hustle — Build Income Streams with AI",
  description:
    "Discover AI tools, courses, playbooks, and intelligence to build real income streams. AI Side Hustle is the premier platform for AI-powered entrepreneurship.",
  openGraph: {
    title: "AI Side Hustle — Build Income Streams with AI",
    description:
      "Discover AI tools, courses, playbooks, and intelligence to build real income streams.",
    type: "website",
  },
};

export default function BlogHome() {
  return <BlogHomeClient />;
}
import type { Metadata } from "next";
import ViewTogglePosts from "@/components/ViewTogglePosts";
import AdSlot from "@/components/AdSlot";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <section className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="mt-3 text-gray-600 leading-relaxed">
          {siteConfig.description}
        </p>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <ViewTogglePosts posts={posts} />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-6">
            <AdSlot variant="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}

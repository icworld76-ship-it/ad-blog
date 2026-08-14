import type { Metadata } from "next";
import ViewTogglePosts from "@/components/ViewTogglePosts";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <section className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
          {siteConfig.name}
        </h1>
        <p className="mt-2 text-gray-600 leading-relaxed">
          {siteConfig.description}
        </p>
      </section>

      {/* 전체 가로폭 100% 활용하는 컴팩트 한 줄 목록 */}
      <div className="w-full">
        <ViewTogglePosts posts={posts} />
      </div>
    </div>
  );
}

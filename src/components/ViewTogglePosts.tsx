"use client";

import { useState } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

interface ViewTogglePostsProps {
  posts: PostMeta[];
}

export default function ViewTogglePosts({ posts }: ViewTogglePostsProps) {
  const [viewMode, setViewMode] = useState<"table" | "card">("table");

  return (
    <div>
      {/* 뷰 모드 전환 툴바 */}
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-800">포스트 목록</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-700">
            총 {posts.length}개
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition ${
              viewMode === "table"
                ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            한 줄 목록 보기 (GitHub 스타일)
          </button>

          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-semibold transition ${
              viewMode === "card"
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            카드형 보기
          </button>
        </div>
      </div>

      {/* 깃허브 스타일 컴팩트 한 줄 목록 테이블 */}
      {viewMode === "table" && (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 bg-gray-50 text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-3 py-2 text-center w-12">
                    번호
                  </th>
                  <th scope="col" className="px-4 py-2">
                    제목
                  </th>
                  <th scope="col" className="px-3 py-2 w-24">
                    작성자
                  </th>
                  <th scope="col" className="px-3 py-2 w-32">
                    대표 태그
                  </th>
                  <th scope="col" className="px-3 py-2 w-28 text-center">
                    발행일
                  </th>
                  <th scope="col" className="px-3 py-2 w-20 text-center">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post, index) => {
                  const mainTag =
                    post.tags && post.tags.length > 0
                      ? post.tags[0]
                      : "일반";

                  return (
                    <tr
                      key={post.slug}
                      className="hover:bg-blue-50/60 transition-colors h-10"
                    >
                      <td className="px-3 py-2 text-center font-mono text-[11px] text-gray-400">
                        {posts.length - index}
                      </td>
                      <td className="px-4 py-2 font-medium text-gray-900 max-w-xs sm:max-w-md truncate">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-600 hover:underline"
                          title={post.title}
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-gray-500 whitespace-nowrap">
                        {post.author || "Admin"}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 truncate max-w-[120px]">
                          #{mainTag}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center font-mono text-gray-500 whitespace-nowrap">
                        {post.date || "-"}
                      </td>
                      <td className="px-3 py-2 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          공개
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 카드형 레이아웃 */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

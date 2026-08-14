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
    <div className="w-full">
      {/* 상단 툴바 */}
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-800">전체 포스트 목록</span>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
            총 {posts.length}개
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-bold transition ${
              viewMode === "table"
                ? "bg-white text-blue-600 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="h-4 w-4"
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
            워드프레스 한 줄 표 보기
          </button>

          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-bold transition ${
              viewMode === "card"
                ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              className="h-4 w-4"
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

      {/* 워드프레스 관리자 스타일 100% 가로폭 한 줄 테이블 */}
      {viewMode === "table" && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-100 text-xs font-bold text-gray-700 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-4 py-2.5 text-center w-14">
                    번호
                  </th>
                  <th scope="col" className="px-5 py-2.5 font-bold">
                    제목
                  </th>
                  <th scope="col" className="px-4 py-2.5 w-28 font-bold">
                    작성자
                  </th>
                  <th scope="col" className="px-4 py-2.5 w-36 font-bold">
                    태그
                  </th>
                  <th scope="col" className="px-4 py-2.5 w-32 text-center font-bold">
                    발행일
                  </th>
                  <th scope="col" className="px-4 py-2.5 w-24 text-center font-bold">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {posts.map((post, index) => {
                  const mainTag =
                    post.tags && post.tags.length > 0 ? post.tags[0] : "일반";

                  return (
                    <tr
                      key={post.slug}
                      className="hover:bg-blue-50/70 transition-colors h-11"
                    >
                      <td className="px-4 py-2 text-center font-mono text-xs text-gray-400">
                        {posts.length - index}
                      </td>
                      <td className="px-5 py-2 font-semibold text-gray-900 truncate max-w-xl">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-600 hover:underline"
                          title={post.title}
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-xs text-gray-600 whitespace-nowrap font-medium">
                        {post.author || "Admin"}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="inline-block rounded bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 truncate max-w-[130px]">
                          #{mainTag}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center font-mono text-xs text-gray-500 whitespace-nowrap">
                        {post.date || "-"}
                      </td>
                      <td className="px-4 py-2 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          공개됨
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 content-start">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

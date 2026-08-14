"use client";

import { useState } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

interface ViewTogglePostsProps {
  posts: PostMeta[];
}

export default function ViewTogglePosts({ posts }: ViewTogglePostsProps) {
  const [viewMode, setViewMode] = useState<"card" | "table">("table");

  return (
    <div>
      {/* 뷰 모드 전환 툴바 (워드프레스 스타일) */}
      <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">전체 포스트</span>
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
            {posts.length}개
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
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

          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
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
            워드프레스 표 보기
          </button>
        </div>
      </div>

      {/* 카드형 레이아웃 */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* 워드프레스 스타일 테이블(표) 레이아웃 */}
      {viewMode === "table" && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-700">
                <tr>
                  <th scope="col" className="px-4 py-3 text-center w-12">
                    번호
                  </th>
                  <th scope="col" className="px-6 py-3">
                    제목
                  </th>
                  <th scope="col" className="px-4 py-3 w-28">
                    작성자
                  </th>
                  <th scope="col" className="px-4 py-3 w-36">
                    태그 / 카테고리
                  </th>
                  <th scope="col" className="px-4 py-3 w-28 text-center">
                    발행일
                  </th>
                  <th scope="col" className="px-4 py-3 w-20 text-center">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post, index) => (
                  <tr
                    key={post.slug}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-4 py-3.5 text-center font-mono text-xs text-gray-400">
                      {posts.length - index}
                    </td>
                    <td className="px-6 py-3.5 font-medium text-gray-900">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-blue-600 hover:underline line-clamp-1"
                      >
                        {post.title}
                      </Link>
                      {post.summary && (
                        <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">
                          {post.summary}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-600 font-medium">
                      {post.author || "Admin"}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {post.tags && post.tags.length > 0 ? (
                          post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                            >
                              #{tag}
                            </span>
                          ))
                        ) : (
                          <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-600">
                            일반
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center font-mono text-xs text-gray-500 whitespace-nowrap">
                      {post.date || "-"}
                    </td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        공개됨
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

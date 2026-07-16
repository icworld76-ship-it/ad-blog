import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 마크다운 본문 HTML을 문단 단위로 나눠 중간 지점에
 * 본문 삽입형 광고 슬롯을 끼워넣습니다.
 */
function splitContentForAd(contentHtml: string): [string, string] {
  const blocks = contentHtml.split(/(?=<h2)/);
  if (blocks.length < 2) {
    const mid = Math.floor(contentHtml.length / 2);
    const splitPoint = contentHtml.indexOf(">", mid) + 1;
    return [
      contentHtml.slice(0, splitPoint),
      contentHtml.slice(splitPoint),
    ];
  }
  const mid = Math.ceil(blocks.length / 2);
  return [blocks.slice(0, mid).join(""), blocks.slice(mid).join("")];
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "포스트를 찾을 수 없습니다" };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [post.thumbnail],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.thumbnail],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const [firstHalf, secondHalf] = splitContentForAd(post.contentHtml);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    image: `${siteConfig.url}${post.thumbnail}`,
  };

  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/"
        className="text-sm text-blue-600 hover:underline"
      >
        ← 목록으로
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px] mt-6">
        <div>
          <header className="mb-6">
            {post.tags.length > 0 && (
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                {post.tags[0]}
              </span>
            )}
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
              <span>{post.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </header>

          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 mb-8">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose-content text-gray-800 leading-relaxed [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-900 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-gray-100 [&_code]:font-mono [&_a]:text-blue-600 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: firstHalf }}
          />

          {/* 본문 중간 삽입 광고 슬롯 */}
          <div className="my-6">
            <AdSlot variant="in-content" />
          </div>

          <div
            className="prose-content text-gray-800 leading-relaxed [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-900 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-gray-100 [&_code]:font-mono [&_a]:text-blue-600 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: secondHalf }}
          />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-6">
            <AdSlot variant="sidebar" />
          </div>
        </aside>
      </div>
    </article>
  );
}

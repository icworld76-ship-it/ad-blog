import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  thumbnail: string;
  author: string;
  tags: string[];
};

export type Post = PostMeta & {
  contentHtml: string;
};

/**
 * content/posts 디렉터리에 있는 모든 .md 파일의 slug 목록을 반환합니다.
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return [];

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/**
 * 모든 포스트의 메타데이터를 최신 날짜순으로 정렬하여 반환합니다.
 */
export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();

  const posts = slugs.map((slug) => {
    const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      summary: data.summary ?? "",
      thumbnail: data.thumbnail ?? "/thumbnails/default.svg",
      author: data.author ?? "Admin",
      tags: data.tags ?? [],
    } satisfies PostMeta;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 지정한 slug의 포스트를 읽어 마크다운을 HTML로 변환하여 반환합니다.
 * 파일이 없으면 null을 반환합니다.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    summary: data.summary ?? "",
    thumbnail: data.thumbnail ?? "/thumbnails/default.svg",
    author: data.author ?? "Admin",
    tags: data.tags ?? [],
    contentHtml,
  };
}

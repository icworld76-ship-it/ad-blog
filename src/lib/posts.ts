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

  const posts = slugs
    .map((slug) => {
      try {
        const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        // Date 객체를 문자열로 안전하게 변환
        let dateStr = "";
        if (data.date) {
          if (data.date instanceof Date) {
            dateStr = data.date.toISOString().split("T")[0];
          } else {
            dateStr = String(data.date);
          }
        }

        return {
          slug,
          title: data.title ? String(data.title) : slug,
          date: dateStr,
          summary: data.summary ? String(data.summary) : "",
          thumbnail: data.thumbnail ? String(data.thumbnail) : "/thumbnails/default.svg",
          author: data.author ? String(data.author) : "Admin",
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        } satisfies PostMeta;
      } catch {
        return null;
      }
    })
    .filter((p): p is PostMeta => p !== null);

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 지정한 slug의 포스트를 읽어 마크다운을 HTML로 변환하여 반환합니다.
 * 파일이 없으면 null을 반환합니다.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content);
    const contentHtml = processedContent.toString();

    let dateStr = "";
    if (data.date) {
      if (data.date instanceof Date) {
        dateStr = data.date.toISOString().split("T")[0];
      } else {
        dateStr = String(data.date);
      }
    }

    return {
      slug,
      title: data.title ? String(data.title) : slug,
      date: dateStr,
      summary: data.summary ? String(data.summary) : "",
      thumbnail: data.thumbnail ? String(data.thumbnail) : "/thumbnails/default.svg",
      author: data.author ? String(data.author) : "Admin",
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      contentHtml,
    };
  } catch {
    return null;
  }
}

/**
 * 사이트 전역 설정.
 * 배포 시 실제 도메인으로 SITE_URL을 변경하거나 환경변수 NEXT_PUBLIC_SITE_URL을 설정하세요.
 */
export const siteConfig = {
  name: "Insight Blog",
  description: "기술, 라이프스타일, 생산성에 관한 인사이트를 전하는 블로그",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
};

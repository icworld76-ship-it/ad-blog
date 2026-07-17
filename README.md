[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Ficworld76-ship-it.github.io%2Fad-blog&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# Insight Blog — 광고 삽입형 블로그 (Next.js App Router)

Google AdSense 광고 삽입이 가능한 카드형 블로그 웹사이트입니다. Next.js App Router + TypeScript + Tailwind CSS + 마크다운(gray-matter) 기반 파일 CMS로 구성되어 있습니다.

## 기술 스택

- **Next.js 16 (App Router)** + TypeScript
- **Tailwind CSS v4**
- **gray-matter** — 마크다운 프론트매터 파싱
- **remark / remark-gfm / remark-html** — 마크다운 → HTML 변환
- 콘텐츠는 데이터베이스 없이 `content/posts/*.md` 파일로 관리 (파일 기반 CMS)

## 로컬 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속.

다른 유용한 스크립트:

```bash
npm run build   # 프로덕션 빌드
npm run start   # 빌드 결과 실행
npm run lint    # ESLint 검사
```

## 프로젝트 구조

```
content/posts/*.md         # 블로그 포스트 원본 (마크다운 + 프론트매터)
public/thumbnails/*.svg    # 포스트 썸네일 이미지
src/
├── app/
│   ├── layout.tsx         # 루트 레이아웃 (Header/Footer, 전역 메타데이터)
│   ├── page.tsx           # 메인 페이지 (카드형 포스트 목록)
│   ├── globals.css
│   ├── sitemap.ts         # /sitemap.xml 자동 생성
│   ├── robots.ts          # /robots.txt 자동 생성
│   └── blog/[slug]/
│       ├── page.tsx       # 포스트 상세 페이지
│       └── not-found.tsx  # 존재하지 않는 슬러그 처리
├── components/
│   ├── AdSlot.tsx         # 광고 슬롯 placeholder 컴포넌트 (핵심)
│   ├── Header.tsx         # 헤더 (헤더 배너 광고 포함)
│   ├── Footer.tsx
│   └── PostCard.tsx       # 메인 페이지 카드 컴포넌트
└── lib/
    ├── posts.ts           # 마크다운 파일 읽기/파싱 유틸
    └── site-config.ts     # 사이트명/설명/URL 등 전역 설정
```

## 새 포스트 추가 방법

1. `content/posts/` 디렉터리에 새 `.md` 파일을 만듭니다. 파일명이 곧 URL 슬러그가 됩니다.
   예: `content/posts/my-new-post.md` → `/blog/my-new-post`
2. 파일 맨 위에 프론트매터를 작성합니다.

   ```markdown
   ---
   title: "포스트 제목"
   date: "2026-07-20"
   summary: "목록 카드와 SEO 설명에 쓰일 한두 줄 요약"
   thumbnail: "/thumbnails/my-thumbnail.svg"
   author: "작성자명"
   tags: ["태그1", "태그2"]
   ---

   본문은 여기부터 마크다운으로 작성합니다.
   ```

3. `thumbnail` 경로에 해당하는 이미지 파일을 `public/thumbnails/`에 추가합니다 (없으면 기본 이미지가 표시됩니다).
4. 코드 수정 없이 `npm run dev`를 재시작(또는 이미 실행 중이면 자동 반영)하면 메인 페이지 목록과 sitemap에 자동으로 포함됩니다.

## Google AdSense 코드 삽입 위치

이 프로젝트는 실제 AdSense 코드 없이도 광고 영역의 구조(레이아웃/스타일)를 미리 갖춘 상태입니다. 애드센스 승인을 받은 후 다음 두 곳만 채우면 실제 광고가 노출됩니다.

### 1. 애드센스 스크립트 태그 (`src/app/layout.tsx`)

`<html>` 위 주석 블록을 참고하여 `<head>` 안에 스크립트를 추가하세요.

```tsx
<head>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
    crossOrigin="anonymous"
  />
</head>
```

### 2. 실제 광고 유닛 (`src/components/AdSlot.tsx`)

현재는 점선 테두리의 placeholder(`<div>`)만 렌더링됩니다. 컴포넌트 내부 주석에 있는 `<ins className="adsbygoogle" ... />` 블록의 주석을 해제하고, `data-ad-client` / `data-ad-slot` 값을 발급받은 실제 값으로 교체하세요. 광고를 렌더링한 뒤에는 `useEffect`에서 `(window.adsbygoogle = window.adsbygoogle || []).push({})`를 호출해야 합니다 (클라이언트 컴포넌트로 전환 필요, 컴포넌트 상단에 `"use client"` 추가).

`AdSlot`은 다음 3곳에 이미 배치되어 있습니다.

| 위치 | 파일 | variant |
|---|---|---|
| 헤더 배너 | `src/components/Header.tsx` | `header` |
| 포스트 사이드바 | `src/app/page.tsx`, `src/app/blog/[slug]/page.tsx` | `sidebar` |
| 포스트 본문 중간 | `src/app/blog/[slug]/page.tsx` | `in-content` |

## SEO

- `src/app/layout.tsx` — 전역 메타데이터(title 템플릿, OpenGraph, Twitter 카드)
- `src/app/blog/[slug]/page.tsx` — `generateMetadata`로 포스트별 메타데이터 및 JSON-LD(BlogPosting) 생성
- `src/app/sitemap.ts` — 모든 포스트를 포함한 `/sitemap.xml` 자동 생성
- `src/app/robots.ts` — `/robots.txt` 자동 생성 (sitemap 경로 포함)
- 배포 시 `src/lib/site-config.ts`의 `url` 값(또는 `NEXT_PUBLIC_SITE_URL` 환경변수)을 실제 도메인으로 변경하세요.

## 반응형 디자인

- 메인 페이지 카드 목록: 모바일 1열 → 태블릿/데스크톱 2열 (`grid-cols-1 sm:grid-cols-2`)
- 사이드바 광고: 데스크톱(`lg` 이상)에서만 노출, 모바일에서는 숨김 처리하여 본문 가독성 확보
- 헤더/카드/본문 모두 Tailwind의 반응형 유틸리티(`sm:`, `lg:`)로 모바일/데스크톱 대응

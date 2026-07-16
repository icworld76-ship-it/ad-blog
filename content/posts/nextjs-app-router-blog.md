---
title: "Next.js App Router로 블로그 구축하기"
date: "2026-07-10"
summary: "Next.js App Router의 핵심 개념과 파일 기반 라우팅을 활용해 블로그를 처음부터 구축하는 방법을 알아봅니다."
thumbnail: "/thumbnails/nextjs-app-router.svg"
author: "김개발"
tags: ["Next.js", "App Router", "React"]
---

## App Router란 무엇인가

Next.js의 App Router는 파일 시스템 기반 라우팅을 사용하여 `app` 디렉터리 안의 폴더와 파일로 라우트를 정의합니다. `page.tsx` 파일을 추가하면 해당 경로가 공개적으로 접근 가능해지고, `layout.tsx`를 통해 여러 페이지에서 공유되는 UI를 구성할 수 있습니다.

## 왜 블로그에 적합한가

블로그처럼 콘텐츠 중심의 사이트에는 다음과 같은 이유로 App Router가 특히 적합합니다.

- **서버 컴포넌트 기본 지원**: 마크다운 파일을 서버에서 읽고 파싱해서 클라이언트로 HTML만 전달할 수 있습니다.
- **동적 라우트**: `app/blog/[slug]/page.tsx`처럼 슬러그 기반 동적 라우트로 포스트마다 별도 파일을 만들지 않아도 됩니다.
- **메타데이터 API**: 각 페이지, 포스트별로 SEO에 필요한 `<meta>` 태그를 손쉽게 생성할 수 있습니다.

## 기본 구조 예시

```txt
app/
├── layout.tsx        # 루트 레이아웃 (헤더/푸터 공통)
├── page.tsx          # 메인 페이지 (포스트 목록)
└── blog/
    └── [slug]/
        └── page.tsx  # 포스트 상세 페이지
```

## 마무리

App Router와 파일 기반 마크다운 콘텐츠를 결합하면, 별도의 데이터베이스나 CMS 없이도 유지보수가 쉬운 블로그를 만들 수 있습니다. 새로운 글을 추가하려면 `content/posts` 디렉터리에 마크다운 파일 하나만 추가하면 됩니다.

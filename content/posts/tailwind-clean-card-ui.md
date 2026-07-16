---
title: "Tailwind CSS로 깔끔한 카드 UI 만들기"
date: "2026-07-08"
summary: "Tailwind CSS의 유틸리티 클래스를 활용해 미니멀하고 가독성 좋은 카드형 UI를 디자인하는 팁을 소개합니다."
thumbnail: "/thumbnails/tailwind-tips.svg"
author: "이디자인"
tags: ["Tailwind CSS", "UI", "디자인"]
---

## 카드 UI의 기본 구조

카드형 UI는 블로그, 대시보드, 커머스 등 다양한 서비스에서 널리 사용되는 레이아웃 패턴입니다. Tailwind CSS를 사용하면 별도의 CSS 파일 없이도 빠르게 일관된 카드 컴포넌트를 만들 수 있습니다.

```html
<div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
  <img class="rounded-xl aspect-video object-cover" src="..." />
  <h3 class="mt-4 text-lg font-semibold text-gray-900">제목</h3>
  <p class="mt-2 text-sm text-gray-600">요약 텍스트</p>
</div>
```

## 가독성을 높이는 타이포그래피

- 본문에는 `text-gray-700` 또는 `text-gray-600` 같은 중간 명도의 색상을 사용해 눈의 피로를 줄입니다.
- 제목과 본문의 크기 대비를 명확히 하여 (`text-lg` vs `text-sm`) 정보의 위계를 표현합니다.
- 줄 간격은 `leading-relaxed`를 활용해 문단을 편하게 읽을 수 있도록 합니다.

## 반응형 그리드

카드 리스트는 `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`와 같은 조합으로 화면 크기에 따라 자연스럽게 열 개수를 조절할 수 있습니다. 모바일에서는 1열, 태블릿에서는 2열, 데스크톱에서는 3열로 표시하면 대부분의 디바이스에서 좋은 사용자 경험을 제공합니다.

## 마무리

작은 디테일—여백, 그림자, 모서리 곡률—이 모여 전체적으로 깔끔하고 신뢰감 있는 디자인을 완성합니다.

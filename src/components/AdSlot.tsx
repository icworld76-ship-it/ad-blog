/**
 * AdSlot: 구글 애드센스 광고를 위한 placeholder 컴포넌트.
 *
 * 실제 배포 시 아래 두 가지를 채워주세요.
 * 1. `src/app/layout.tsx`의 <head>에 애드센스 스크립트 태그 추가:
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous"></script>
 * 2. 이 컴포넌트의 <ins> 블록 주석을 해제하고 data-ad-client / data-ad-slot 값을 발급받은 값으로 교체
 *
 * variant별 권장 사용처:
 * - "header": 페이지 최상단 배너
 * - "sidebar": 포스트 상세 페이지 사이드바 (세로형)
 * - "in-content": 포스트 본문 중간 삽입 (인피드 광고)
 */

type AdSlotProps = {
  variant: "header" | "sidebar" | "in-content";
  /** 애드센스 승인 후 발급되는 슬롯 ID (예: "1234567890") */
  adSlot?: string;
  /** 애드센스 계정 클라이언트 ID (예: "ca-pub-XXXXXXXXXXXXXXXX") */
  adClient?: string;
  className?: string;
};

const VARIANT_LABEL: Record<AdSlotProps["variant"], string> = {
  header: "헤더 배너 광고",
  sidebar: "사이드바 광고",
  "in-content": "본문 중간 광고",
};

const VARIANT_STYLE: Record<AdSlotProps["variant"], string> = {
  header: "h-[90px] w-full max-w-[728px] mx-auto",
  sidebar: "h-[280px] w-full",
  "in-content": "h-[120px] w-full",
};

export default function AdSlot({
  variant,
  adSlot,
  adClient,
  className = "",
}: AdSlotProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-400 ${VARIANT_STYLE[variant]} ${className}`}
      data-ad-variant={variant}
    >
      {/*
        실제 애드센스 코드로 교체할 때는 아래 주석을 해제하고
        위 div 래퍼를 제거(또는 유지)한 뒤 ins 태그를 렌더링하세요.

        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adClient ?? "ca-pub-XXXXXXXXXXXXXXXX"}
          data-ad-slot={adSlot ?? "0000000000"}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        그리고 클라이언트 컴포넌트에서 다음을 호출해야 합니다:
        useEffect(() => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }, []);
      */}
      <span>
        {VARIANT_LABEL[variant]} (AdSense Placeholder
        {adClient ? ` · client: ${adClient}` : ""}
        {adSlot ? ` · slot: ${adSlot}` : ""})
      </span>
    </div>
  );
}

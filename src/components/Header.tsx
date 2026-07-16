import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import AdSlot from "@/components/AdSlot";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            {siteConfig.name}
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              홈
            </Link>
            <a
              href="#"
              className="hover:text-gray-900"
              aria-disabled="true"
            >
              소개
            </a>
          </nav>
        </div>
        {/* 헤더 배너 광고 슬롯 */}
        <div className="py-3">
          <AdSlot variant="header" />
        </div>
      </div>
    </header>
  );
}

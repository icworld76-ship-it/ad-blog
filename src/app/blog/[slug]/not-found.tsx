import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-gray-900">
        포스트를 찾을 수 없습니다
      </h1>
      <p className="mt-3 text-gray-600">
        요청하신 글이 존재하지 않거나 삭제되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-blue-600 hover:underline"
      >
        ← 메인으로 돌아가기
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
            <h1 className="text-9xl font-black text-primary/20 select-none">404</h1>
            <h2 className="text-2xl font-bold mt-4 mb-2">길을 잃으셨나요?</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                찾으시는 페이지가 삭제되었거나 주소가 변경된 것 같습니다.<br />
                우주 미아가 되지 않도록 본부로 안내해 드릴게요.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-all"
            >
                <MoveLeft size={18} />
                홈으로 돌아가기
            </Link>
        </div>
    );
}

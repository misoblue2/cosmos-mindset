"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Global Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
            <h1 className="text-4xl font-black mb-4">문제가 발생했습니다</h1>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                시스템에 일시적인 오류가 발생했습니다.<br />
                잠시 후 다시 시도해 주시거나, 문제가 지속되면 관리자에게 문의해주세요.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-all"
                >
                    <RotateCcw size={18} />
                    다시 시도하기
                </button>
            </div>
        </div>
    );
}

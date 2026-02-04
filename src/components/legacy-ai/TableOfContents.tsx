
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { BookOpen, Check } from 'lucide-react';

interface TableOfContentsProps {
    chapters: string[];
}

export function TableOfContents({ chapters }: TableOfContentsProps) {
    const [activeChapter, setActiveChapter] = useState<number>(0);

    useEffect(() => {
        // Animate to the latest chapter
        setActiveChapter(chapters.length - 1);
    }, [chapters]);

    return (
        <div className="w-full bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                <BookOpen className="text-primary h-5 w-5" />
                <h3 className="font-serif font-bold text-lg text-primary">나만의 자서전 목차</h3>
            </div>

            <div className="space-y-4">
                {chapters.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                        AI와 대화를 시작하면 <br />
                        목차가 생성됩니다.
                    </div>
                ) : (
                    <ul className="space-y-3 relative">
                        {/* Timeline line */}
                        <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-border -z-10" />

                        {chapters.map((chapter, index) => (
                            <li
                                key={index}
                                className={cn(
                                    "flex items-start gap-3 animate-in fade-in slide-in-from-left-2 duration-500",
                                    index === chapters.length - 1 ? "opacity-100" : "opacity-80"
                                )}
                            >
                                <div className={cn(
                                    "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300 bg-background",
                                    index === chapters.length - 1
                                        ? "border-accent text-accent animate-pulse"
                                        : "border-primary text-primary"
                                )}>
                                    {index < chapters.length - 1 ? <Check size={14} /> : index + 1}
                                </div>
                                <div className="pt-0.5">
                                    <p className="text-sm font-medium text-foreground">{chapter}</p>
                                    {index === chapters.length - 1 && (
                                        <p className="text-xs text-accent mt-1 animate-pulse">
                                            작성 중...
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

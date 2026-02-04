"use client";

import Link from 'next/link';
import { LogIn, UserPlus, Settings2, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import GlobalCounter from './GlobalCounter';

export function Header() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <GlobalCounter />
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold font-serif text-primary hover:text-accent transition-colors">
                    Cosmic Mind
                </Link>
                <nav className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm font-bold">
                        <Link href="/" className="text-foreground/80 hover:text-primary transition-colors tracking-tight">홈</Link>
                        <Link href="/legacy-ai" className="text-foreground/80 hover:text-primary transition-colors tracking-tight">나만의 자서전 만들기</Link>
                        <Link href="/healing" className="text-foreground/80 hover:text-primary transition-colors tracking-tight font-serif text-amber-500/80 hover:text-amber-500">마음 상담소</Link>
                        <Link href="/originals" className="text-foreground/80 hover:text-primary transition-colors tracking-tight">가치토커 우주의 서재</Link>
                        <Link href="/imagination" className="text-foreground/80 hover:text-primary transition-colors tracking-tight font-serif text-orange-500/80 hover:text-orange-500">어린이 상상학교</Link>
                        <Link href="/shop" className="text-foreground/80 hover:text-primary transition-colors tracking-tight">Cosmic Shop</Link>
                    </div>

                    <div className="flex items-center gap-3 ml-4">
                        {isLoggedIn ? (
                            <>
                                <Link href="/mypage" className="flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary text-xs font-black rounded-full hover:bg-primary/20 transition-all">
                                    <User size={14} />
                                    마이페이지
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    <LogOut size={14} />
                                    로그아웃
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-foreground/70 hover:text-primary transition-colors">
                                    <LogIn size={14} />
                                    로그인
                                </Link>
                                <Link href="/signup" className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-xs font-black rounded-full hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                                    <UserPlus size={14} />
                                    회원가입
                                </Link>
                            </>
                        )}
                        <div className="w-px h-4 bg-border mx-1" />
                        <Link href="/admin" className="p-2 bg-secondary text-primary rounded-full hover:bg-primary hover:text-secondary transition-all">
                            <Settings2 size={16} />
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}

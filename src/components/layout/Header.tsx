"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, UserPlus, Settings2, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import GlobalCounter from './GlobalCounter';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ href, children, accent = false, className = "" }: { href: string; children: React.ReactNode; accent?: boolean; className?: string }) => (
    <Link
        href={href}
        className={`text-sm font-bold tracking-tight transition-all hover:scale-105 ${accent
            ? className
            : 'text-foreground/80 hover:text-primary'
            }`}
    >
        {children}
    </Link>
);

const MobileNavLink = ({ href, children, onClick, className = "" }: { href: string; children: React.ReactNode; onClick: () => void; className?: string }) => (
    <Link
        href={href}
        onClick={onClick}
        className={`text-2xl font-black tracking-tight py-3 hover:text-primary transition-colors ${className}`}
    >
        {children}
    </Link>
);

export function Header() {
    const { isLoggedIn, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setIsMenuOpen(false); // Clean up menu on route change
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
                <GlobalCounter />
                <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
                    <Link href="/" className="text-xl font-black tracking-tight text-white hover:text-purple-400 transition-colors z-50 flex items-center gap-2">
                        <span className="text-2xl">🌌</span> 우주마인드스쿨
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <NavLink href="/school" accent className="text-white hover:text-blue-400 font-bold">코스 수강</NavLink>
                        <NavLink href="/pdf-store" accent className="text-white hover:text-purple-400 font-bold">전자책 스토어</NavLink>
                        <NavLink href="/my-book" accent className="text-white hover:text-amber-400 font-bold">내 책 만들기</NavLink>
                        <NavLink href="/healing" accent className="text-white/60 hover:text-white font-medium text-xs">마음 상담소</NavLink>
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3 ml-4">
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
                        <Link href="/admin" className="p-2 bg-secondary text-primary rounded-full hover:bg-primary/20 transition-all">
                            <Settings2 size={16} />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground z-50 relative"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Full Screen Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col h-screen overflow-y-auto"
                    >
                        <div className="flex flex-col space-y-6">
                            <div className="space-y-4 flex flex-col items-start border-l-2 border-purple-500/50 pl-6">
                                <MobileNavLink href="/school" onClick={() => setIsMenuOpen(false)} className="text-white">코스 수강</MobileNavLink>
                                <MobileNavLink href="/pdf-store" onClick={() => setIsMenuOpen(false)} className="text-purple-400">전자책 스토어</MobileNavLink>
                                <MobileNavLink href="/my-book" onClick={() => setIsMenuOpen(false)} className="text-amber-400">내 책 만들기</MobileNavLink>
                                <MobileNavLink href="/healing" onClick={() => setIsMenuOpen(false)} className="text-white/50 text-lg">마음 상담소</MobileNavLink>
                            </div>

                            <div className="w-full h-px bg-border my-6" />

                            <div className="flex flex-col gap-4">
                                {isLoggedIn ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                <User size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-muted-foreground">환영합니다</span>
                                                <span className="text-lg font-black text-foreground">여행자님</span>
                                            </div>
                                        </div>
                                        <Link
                                            href="/mypage"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="w-full py-4 text-center bg-primary/10 text-primary font-bold rounded-xl"
                                        >
                                            마이페이지
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full py-4 text-center bg-secondary text-muted-foreground font-bold rounded-xl"
                                        >
                                            로그아웃
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="w-full py-4 text-center bg-secondary text-foreground font-bold rounded-xl hover:bg-secondary/80 transition-colors"
                                        >
                                            로그인
                                        </Link>
                                        <Link
                                            href="/signup"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="w-full py-4 text-center bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                        >
                                            회원가입
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

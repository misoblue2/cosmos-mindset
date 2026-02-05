"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, UserPlus, Settings2, User, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import GlobalCounter from './GlobalCounter';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
    const { isLoggedIn, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
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

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
                <GlobalCounter />
                <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
                    <Link href="/" className="text-xl font-bold font-serif text-primary hover:text-accent transition-colors z-50">
                        Cosmic Mind
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <NavLink href="/">홈</NavLink>
                        <NavLink href="/legacy-ai">나만의 시나리오</NavLink>
                        <NavLink href="/healing" accent className="font-serif text-amber-500/80 hover:text-amber-500">마음 상담소</NavLink>
                        <NavLink href="/originals">우주의 서재</NavLink>
                        <NavLink href="/imagination" accent className="font-serif text-orange-500/80 hover:text-orange-500">어린이 상상학교</NavLink>
                        <NavLink href="/shop">Cosmic Shop</NavLink>
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
                        <Link href="/admin" className="p-2 bg-secondary text-primary rounded-full hover:bg-primary hover:text-secondary transition-all">
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
                            <div className="space-y-4 flex flex-col items-start border-l-2 border-primary/20 pl-6">
                                <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>홈</MobileNavLink>
                                <MobileNavLink href="/legacy-ai" onClick={() => setIsMenuOpen(false)}>나만의 시나리오</MobileNavLink>
                                <MobileNavLink href="/healing" onClick={() => setIsMenuOpen(false)} className="text-amber-500 font-serif">마음 상담소</MobileNavLink>
                                <MobileNavLink href="/originals" onClick={() => setIsMenuOpen(false)}>우주의 서재</MobileNavLink>
                                <MobileNavLink href="/imagination" onClick={() => setIsMenuOpen(false)} className="text-orange-500 font-serif">어린이 상상학교</MobileNavLink>
                                <MobileNavLink href="/shop" onClick={() => setIsMenuOpen(false)}>Cosmic Shop</MobileNavLink>
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
                                            className="w-full py-4 text-center bg-primary/10 text-primary font-black rounded-2xl hover:bg-primary/20 transition-all border-2 border-primary/20"
                                        >
                                            마이페이지
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full py-4 text-center text-muted-foreground font-bold hover:text-destructive transition-colors border-2 border-transparent hover:border-destructive/20 rounded-2xl"
                                        >
                                            로그아웃
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="w-full py-4 text-center border-2 border-border text-foreground font-bold rounded-2xl hover:bg-muted transition-all"
                                        >
                                            로그인
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="w-full py-4 text-center bg-primary text-primary-foreground font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.95] transition-all"
                                        >
                                            회원가입
                                        </Link>
                                    </>
                                )}
                                <Link
                                    href="/admin"
                                    className="w-full py-3 text-center text-xs font-bold text-muted-foreground/50 hover:text-primary transition-colors mt-4 flex items-center justify-center gap-1"
                                >
                                    <Settings2 size={12} /> 관리자 페이지
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

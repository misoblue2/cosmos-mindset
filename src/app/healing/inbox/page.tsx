"use client";

import { useState, useEffect } from 'react';
import { getCounselingByUser, type CounselingSession } from '@/lib/db';
import { Mail, ArrowLeft, MessageCircleHeart, Search, User, Check, RefreshCw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function InboxPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sessions, setSessions] = useState<CounselingSession[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    useEffect(() => {
        // Simple persistence for "logged in" state
        const savedName = localStorage.getItem('healing_user_name');
        const savedEmail = localStorage.getItem('healing_user_email');
        if (savedName) {
            setName(savedName);
            if (savedEmail) setEmail(savedEmail);
            handleLogin(savedName, savedEmail || undefined);
        }
    }, []);

    const handleLogin = async (userName: string, userEmail?: string) => {
        if (!userName.trim()) return;
        setIsLoading(true);
        try {
            const data = await getCounselingByUser(userName, userEmail);
            setSessions(data);
            setIsLoggedIn(true);
            localStorage.setItem('healing_user_name', userName);
            if (userEmail) localStorage.setItem('healing_user_email', userEmail);
        } catch (error) {
            console.error("Failed to load inbox", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmitLogin = (e: React.FormEvent) => {
        e.preventDefault();
        handleLogin(name, email);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setSessions([]);
        setName('');
        setEmail('');
        localStorage.removeItem('healing_user_name');
        localStorage.removeItem('healing_user_email');
    };

    const toggleExpand = (id: string) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const refreshInbox = () => {
        handleLogin(name, email);
    };

    // Cosmic Theme Background
    const Background = () => (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-10 right-20 w-32 h-32 bg-amber-500/5 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute bottom-10 left-20 w-48 h-48 bg-blue-900/10 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        </div>
    );

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#0a0a0c] text-stone-300 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
                <Background />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-stone-900/60 backdrop-blur-md border border-stone-800 rounded-3xl p-8 shadow-2xl space-y-8 relative z-10"
                >
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-amber-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-500 border border-amber-500/20">
                            <Mail size={32} />
                        </div>
                        <h1 className="text-2xl font-serif text-stone-200">나의 우편함 열기</h1>
                        <p className="text-sm text-stone-500 font-light leading-relaxed">
                            마음 상담소에 남기신 이름으로<br />도착한 답장을 확인합니다.
                        </p>
                    </div>

                    <form onSubmit={onSubmitLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-12 pr-4 py-3 bg-black/40 border border-stone-800 rounded-xl focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all text-stone-300 placeholder:text-stone-700"
                                    placeholder="상담 시 입력한 이름"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wider">Email (Optional)</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                                <input
                                    type="email"
                                    className="w-full pl-12 pr-4 py-3 bg-black/40 border border-stone-800 rounded-xl focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all text-stone-300 placeholder:text-stone-700"
                                    placeholder="이메일을 입력하셨다면 입력해주세요"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-stone-100 text-stone-900 font-bold rounded-xl hover:bg-white hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-white/5"
                        >
                            {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <Search size={20} />}
                            우편함 확인하기
                        </button>
                    </form>

                    <div className="text-center pt-4 border-t border-stone-800">
                        <Link href="/healing" className="text-xs font-bold text-stone-500 hover:text-amber-500 flex items-center justify-center gap-1 transition-colors">
                            <ArrowLeft size={12} /> 상담소로 돌아가기
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-stone-300 relative font-sans">
            <Background />

            <header className="sticky top-0 z-5 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-stone-800/50">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/healing" className="p-2 -ml-2 text-stone-500 hover:text-stone-200 transition-colors">
                        <ArrowLeft />
                    </Link>
                    <h1 className="font-serif text-lg text-stone-200 flex items-center gap-2">
                        <Mail size={18} className="text-amber-600" />
                        <span className="bg-gradient-to-r from-stone-200 to-stone-500 bg-clip-text text-transparent">{name}님의 우편함</span>
                    </h1>
                    <button onClick={handleLogout} className="text-xs font-bold text-stone-600 hover:text-stone-400 border border-stone-800 rounded px-2 py-1 hover:border-stone-600 transition-all">
                        나가기
                    </button>
                </div>
            </header>

            <main className="max-w-3xl mx-auto p-6 pb-20 space-y-6 relative z-10">
                <div className="flex justify-between items-center px-2">
                    <p className="text-xs font-bold text-stone-600 uppercase tracking-widest">
                        Total <span className="text-amber-500 text-sm ml-1">{sessions.length}</span> Stars
                    </p>
                    <button onClick={refreshInbox} className="p-2 text-stone-600 hover:text-stone-300 transition-colors bg-stone-900/50 rounded-lg hover:bg-stone-800">
                        <RefreshCw size={14} />
                    </button>
                </div>

                <div className="space-y-4">
                    {sessions.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-24 bg-stone-900/30 border border-stone-800 rounded-3xl backdrop-blur-sm"
                        >
                            <div className="w-16 h-16 bg-stone-800/50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-600">
                                <MessageCircleHeart size={32} />
                            </div>
                            <p className="text-stone-400 font-light mb-2">아직 주고받은 이야기가 없습니다.</p>
                            <p className="text-stone-600 text-sm mb-8">마음속 이야기를 꺼내놓으시면 답장이 도착합니다.</p>
                            <Link href="/healing" className="inline-block px-8 py-3 bg-stone-800 text-stone-300 text-sm font-bold rounded-full hover:bg-stone-700 hover:text-white transition-all border border-stone-700">
                                고민 털어놓으러 가기
                            </Link>
                        </motion.div>
                    ) : (
                        sessions.map((session, index) => (
                            <motion.div
                                key={session.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-stone-900/40 border border-stone-800 rounded-3xl overflow-hidden shadow-lg hover:border-stone-700 transition-all backdrop-blur-sm group"
                            >
                                <div
                                    onClick={() => toggleExpand(session.id)}
                                    className="p-6 cursor-pointer flex items-start gap-5"
                                >
                                    <div className={`mt-1 min-w-[40px] h-[40px] rounded-full flex items-center justify-center text-lg shadow-inner ${session.status === 'replied'
                                            ? 'bg-amber-900/20 text-amber-500 border border-amber-900/30'
                                            : 'bg-stone-800/50 text-stone-600 border border-stone-800'
                                        }`}>
                                        {session.status === 'replied' ? <Check size={20} /> : <span className="animate-pulse">...</span>}
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold text-stone-500 bg-stone-900 border border-stone-800 px-2 py-0.5 rounded uppercase tracking-wider">
                                                {session.mood}
                                            </span>
                                            <span className="text-[10px] text-stone-600 font-mono">
                                                {new Date(session.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-sm font-medium text-stone-300 mb-1 line-clamp-1 group-hover:text-amber-100 transition-colors">
                                            {session.content}
                                        </h3>
                                        <p className="text-xs text-stone-600 font-light">
                                            {session.status === 'replied' ? '답장이 도착했습니다. 클릭해서 확인하세요.' : '가치토커가 답장을 준비하고 있습니다.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Expanded Detail */}
                                <AnimatePresence>
                                    {expandedIds.includes(session.id) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="bg-black/20 px-6 pb-8 pt-2 border-t border-stone-800/50">
                                                <div className="space-y-8 mt-4">
                                                    {/* My Message */}
                                                    <div className="pl-4 border-l border-stone-800">
                                                        <p className="text-[10px] font-bold text-stone-600 mb-2 uppercase tracking-widest">My Story</p>
                                                        <p className="text-sm leading-loose text-stone-400 font-light whitespace-pre-wrap">
                                                            {session.content}
                                                        </p>
                                                    </div>

                                                    {/* Reply Section */}
                                                    {session.status === 'replied' ? (
                                                        <div className="space-y-6">
                                                            {/* AI Reply */}
                                                            {session.aiReply && (
                                                                <div className="bg-purple-900/10 border border-purple-900/20 p-6 rounded-2xl relative">
                                                                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#0a0a0c] border border-purple-900/30 text-purple-400 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                                                        <Sparkles size={10} /> Cosmic Mind
                                                                    </div>
                                                                    <p className="text-sm leading-loose text-stone-400 font-light whitespace-pre-wrap">
                                                                        {session.aiReply}
                                                                    </p>
                                                                </div>
                                                            )}

                                                            {/* Admin Reply */}
                                                            {session.adminReply && (
                                                                <div className="bg-amber-900/10 border border-amber-900/20 p-6 rounded-2xl relative shadow-[0_4px_20px_rgba(251,191,36,0.05)]">
                                                                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#0a0a0c] border border-amber-900/30 text-amber-500 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                                                        <MessageCircleHeart size={10} /> Value Talker
                                                                    </div>
                                                                    <p className="text-sm leading-loose text-stone-300 font-light whitespace-pre-wrap">
                                                                        {session.adminReply}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="text-center p-8 text-stone-600 text-xs bg-stone-900/30 rounded-2xl border border-dashed border-stone-800">
                                                            <span className="animate-pulse flex items-center justify-center gap-2">
                                                                <Sparkles size={12} /> 마음을 담은 답장을 준비하고 있습니다...
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

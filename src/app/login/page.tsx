"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff, HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showRecovery, setShowRecovery] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (email && password) {
                await login(email, password);
                router.push('/mypage');
            }
        } catch (error) {
            console.error("Login failed", error);
            alert("이메일 또는 비밀번호를 확인해주세요.");
        }
    };

    return (
        <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Cosmic Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="text-center space-y-2">
                    <Link href="/" className="inline-block group">
                        <h2 className="text-3xl font-black font-serif tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">Cosmic Mind</h2>
                    </Link>
                    <p className="text-white/60 font-medium">무한한 가능성의 세계로 접속합니다</p>
                </div>

                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
                    <div className="space-y-6">
                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/50 uppercase ml-1 tracking-widest">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@cosmos.com"
                                        className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all font-medium text-white placeholder:text-white/20"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/50 uppercase ml-1 tracking-widest">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition-all font-medium text-white placeholder:text-white/20"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowRecovery(true)}
                                    className="text-xs text-white/40 font-bold hover:text-purple-400 transition-colors flex items-center gap-1.5"
                                >
                                    <HelpCircle size={12} />
                                    계정 정보를 잊으셨나요?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-purple-900/20 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>접속하기</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-white/40 font-medium">
                            아직 탑승권이 없으신가요?{" "}
                            <Link href="/signup" className="text-purple-400 font-black hover:text-purple-300 hover:underline underline-offset-4 transition-colors">회원가입하기</Link>
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-white/20 font-bold text-[10px] uppercase tracking-widest">
                    <ShieldCheck size={14} />
                    <span>Quantum Encryption Secured</span>
                </div>
            </div>

            {/* Account Recovery Modal */}
            <AnimatePresence>
                {showRecovery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowRecovery(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#1a1a2e] border border-white/10 rounded-[2rem] p-8 max-w-sm w-full shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowRecovery(false)}
                                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-xl font-bold text-white mb-2">계정 찾기</h3>
                            <p className="text-white/60 text-sm mb-6">가입 시 입력한 이메일로<br />임시 접속 코드를 전송해드립니다.</p>

                            <form className="space-y-4" onSubmit={(e) => {
                                e.preventDefault();
                                alert("입력하신 이메일로 복구 안내가 전송되었습니다.");
                                setShowRecovery(false);
                            }}>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/50 uppercase ml-1 tracking-widest">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="가입한 이메일 입력"
                                        className="w-full px-5 py-3.5 bg-black/20 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium text-white placeholder:text-white/20 text-sm"
                                        required
                                    />
                                </div>
                                <button className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all">
                                    복구 메일 보내기
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

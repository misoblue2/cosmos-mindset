"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, MapPin, ArrowRight, ShieldCheck, Eye, EyeOff, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
    const router = useRouter();
    const { signup } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Form States
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Derived state for password mismatch
    const isPasswordMismatch = confirmPassword && password !== confirmPassword;
    const passwordErrorText = isPasswordMismatch ? "비밀번호가 일치하지 않습니다." : "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            await signup({
                id: `user-${Date.now()}`,
                email,
                password,
                name,
                phone,
                address,
                createdAt: Date.now()
            });
            alert("회원가입이 완료되었습니다! 환영합니다.");
            router.push('/mypage');
        } catch (error: any) {
            console.error("Signup failed", error);
            if (error.message === "이미 가입된 이메일입니다.") {
                alert("이미 가입된 이메일입니다. 로그인해주세요.");
                router.push('/login');
            } else {
                alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050510] flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
            {/* Cosmic Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-lg space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center space-y-2">
                    <Link href="/" className="inline-block group">
                        <h2 className="text-3xl font-black font-serif tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">Cosmic Mind</h2>
                    </Link>
                    <p className="text-white/60 font-medium">나만의 기록관, 코스믹 마인드의 멤버가 되어보세요</p>
                </div>

                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
                    <div className="space-y-6">
                        {/* Signup Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/50 uppercase ml-1 tracking-widest">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={17} />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="성함"
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium text-sm text-white placeholder:text-white/20"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/50 uppercase ml-1 tracking-widest">Phone Number</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={17} />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="010-0000-0000"
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium text-sm text-white placeholder:text-white/20"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/50 uppercase ml-1 tracking-widest">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={17} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium text-sm text-white placeholder:text-white/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-white/50 uppercase ml-1 tracking-widest">Shipping Address</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={17} />
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="도서 배송을 위한 정확한 주소"
                                        className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium text-sm text-white placeholder:text-white/20"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/50 uppercase ml-1 tracking-widest">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={17} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="8자 이상"
                                            className="w-full pl-11 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 outline-none transition-all font-medium text-sm text-white placeholder:text-white/20"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-white/50 uppercase ml-1 tracking-widest">Confirm</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors" size={17} />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="비밀번호 확인"
                                            className={`w-full pl-11 pr-10 py-3.5 bg-white/5 border rounded-2xl focus:ring-2 outline-none transition-all font-medium text-sm text-white placeholder:text-white/20 ${passwordErrorText ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-purple-500/50'}`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {passwordErrorText && (
                                <p className="text-[11px] text-red-400 font-bold flex items-center gap-1.5 animate-in slide-in-from-top-1">
                                    <X size={12} /> {passwordErrorText}
                                </p>
                            )}
                            {!passwordErrorText && confirmPassword && (
                                <p className="text-[11px] text-green-400 font-bold flex items-center gap-1.5 animate-in slide-in-from-top-1">
                                    <Check size={12} /> 비밀번호가 일치합니다
                                </p>
                            )}

                            <div className="p-4 bg-white/5 rounded-2xl space-y-2 border border-white/5">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="terms" className="rounded border-white/20 bg-transparent text-purple-500 focus:ring-purple-500/20" required />
                                    <label htmlFor="terms" className="text-[11px] text-white/60 font-bold">서비스 이용약관 및 개인정보 처리방침 동의 (필수)</label>
                                </div>
                            </div>

                            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-purple-900/20 hover:scale-[1.02] active:scale-[0.98]">
                                <span>탑승 수속 완료하기</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 text-center text-sm font-medium">
                        <p className="text-white/40">
                            이미 계정이 있으신가요?{" "}
                            <Link href="/login" className="text-purple-400 font-black hover:underline underline-offset-4 hover:text-purple-300 transition-colors">로그인하기</Link>
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-white/20 font-bold text-[10px] uppercase tracking-widest">
                    <ShieldCheck size={14} />
                    <span>Privacy First Data Protection</span>
                </div>
            </div>
        </div>
    );
}

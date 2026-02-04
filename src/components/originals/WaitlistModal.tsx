
"use client";

import { useState } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    productTitle: string;
}

export function WaitlistModal({ isOpen, onClose, productTitle }: WaitlistModalProps) {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Conversion Event: Waitlist [${productTitle}] - Email: ${email}`);
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-md bg-background rounded-xl shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                >
                    <X size={20} />
                </button>

                {submitted ? (
                    <div className="flex flex-col items-center text-center py-8 gap-4 animate-in fade-in slide-in-from-bottom-2">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-serif text-primary">신청 완료!</h3>
                        <p className="text-muted-foreground">
                            재입고 즉시 <strong>{email}</strong>로 <br />
                            가장 먼저 알려드릴게요.
                        </p>
                        <button
                            onClick={onClose}
                            className="mt-4 px-6 py-2 bg-secondary text-secondary-foreground font-bold rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                            닫기
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="space-y-2 text-center">
                            <h3 className="text-2xl font-bold font-serif text-primary">출간 알림 신청</h3>
                            <p className="text-sm text-balance text-muted-foreground">
                                <span className="font-semibold text-foreground">&quot;{productTitle}&quot;</span><br />
                                종이책은 현재 품절 상태입니다.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">이메일</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="name@example.com"
                                        className="w-full pl-10 pr-4 py-2.5 bg-input/20 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md active:scale-95"
                            >
                                알림 받기
                            </button>
                            <p className="text-xs text-center text-muted-foreground/60">
                                * 스팸은 발송되지 않으며, 알림 목적으로만 사용됩니다.
                            </p>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

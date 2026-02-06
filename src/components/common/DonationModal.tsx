"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

interface DonationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
}

export function DonationModal({
    isOpen,
    onClose,
    onConfirm,
    title = "마음 보내기",
    description = "여러분의 소중한 후원이 더 나은 세상을 만듭니다.",
    confirmText = "후원 완료했어요"
}: DonationModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        setIsSubmitting(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSubmitting(false);
        onConfirm?.();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-card border border-border w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 pb-0 flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap mt-2">{description}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-muted rounded-full transition-colors"
                            >
                                <X size={20} className="text-muted-foreground" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            {/* Bank Account */}
                            <div className="bg-muted/50 rounded-2xl p-5 border border-border space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                    Bank Transfer
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-black text-primary font-mono tracking-tight">신한 110-513-646297</span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText("110513646297");
                                            alert("계좌번호가 복사되었습니다.");
                                        }}
                                        className="p-2 hover:bg-background rounded-lg text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>
                                <div className="text-sm font-bold text-foreground">예금주: 정겨운</div>
                            </div>

                            {/* Kakao QR */}
                            <button
                                onClick={() => window.open("https://qr.kakaopay.com/Ej7qNKGFs", "_blank")}
                                className="w-full flex items-center justify-between p-4 bg-[#FAE100] hover:bg-[#FADB00] transition-colors rounded-2xl group shadow-sm"
                            >
                                <div className="flex flex-col items-start">
                                    <span className="text-[10px] font-black text-[#371D1E]/60 uppercase tracking-wider mb-0.5">Kakaopay</span>
                                    <span className="text-sm font-bold text-[#371D1E]">QR코드로 송금하기</span>
                                </div>
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/KakaoPay_logo.svg/1024px-KakaoPay_logo.svg.png" alt="Kakao" className="w-4 opacity-80" />
                                </div>
                            </button>

                            {/* Confirm Button */}
                            <button
                                onClick={handleConfirm}
                                disabled={isSubmitting}
                                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {confirmText}
                                        <Check size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

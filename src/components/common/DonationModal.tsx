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
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("110513646297");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleKakaoPay = () => {
        window.open("https://qr.kakaopay.com/Ej7qNKGFs", "_blank");
    };

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

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
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="relative p-8 pb-6 text-center border-b border-stone-100">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">{title}</h3>
                            <p className="text-stone-500 text-sm whitespace-pre-line">{description}</p>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6">
                            {/* Bank Transfer */}
                            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-100">
                                <span className="block text-xs font-bold text-stone-400 mb-2 uppercase tracking-wider">Bank Transfer</span>
                                <div className="flex items-center justify-between mb-1">
                                    <div className="font-bold text-stone-800">신한은행 110-513-646297</div>
                                    <button
                                        onClick={handleCopy}
                                        className="text-stone-400 hover:text-primary transition-colors"
                                    >
                                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                    </button>
                                </div>
                                <div className="text-sm text-stone-500">예금주: 정겨운</div>
                            </div>

                            {/* KakaoPay Section */}
                            <div className="bg-[#FAE100] rounded-2xl p-5 shadow-sm">
                                <span className="block text-xs font-bold text-[#371D1E]/60 mb-3 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#371D1E]"></span> KAKAOPAY
                                </span>

                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    {/* QR Code for Desktop/Scan */}
                                    <div className="bg-white p-2 rounded-xl shadow-inner shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://qr.kakaopay.com/Ej7qNKGFs"
                                            alt="KakaoPay QR"
                                            className="w-20 h-20 md:w-24 md:h-24 object-contain"
                                        />
                                    </div>

                                    <div className="flex-1 text-center md:text-left space-y-2">
                                        <p className="text-xs text-[#371D1E]/80 leading-relaxed font-bold">
                                            <span className="md:hidden">버튼을 눌러 결제해주세요.</span>
                                            <span className="hidden md:inline">휴대폰 카메라로 QR코드를 스캔하거나<br />버튼을 눌러 결제해주세요.</span>
                                        </p>
                                        <button
                                            onClick={handleKakaoPay}
                                            className="w-full py-2.5 bg-[#371D1E] text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
                                        >
                                            카카오페이 열기
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Manual Confirm / Close */}
                            <button
                                onClick={handleConfirm}
                                className="w-full py-4 bg-stone-900 hover:bg-black text-white rounded-xl font-bold transition-transform active:scale-95"
                            >
                                {confirmText}
                            </button>

                            <p className="text-[11px] text-center text-stone-400 leading-relaxed">
                                * 보내주신 마음은 전액 목적에 맞게 투명하게 사용됩니다.<br />
                                별도의 영수증 발급이 필요하시면 문의해주세요.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

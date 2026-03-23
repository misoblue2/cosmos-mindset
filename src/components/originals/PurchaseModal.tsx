"use client";

import { useState } from 'react';
import {
    X,
    User,
    CheckCircle2,
    Copy,
    Heart,
    CreditCard
} from 'lucide-react';
import { addDonation, type Product } from '@/lib/db';

interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    book: Product;
}

export function PurchaseModal({ isOpen, onClose, book }: PurchaseModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [paymentTab, setPaymentTab] = useState<'bank' | 'kakao'>('bank');
    const [orderId, setOrderId] = useState('');

    if (!isOpen) return null;

    const price = book.price || 0;
    const donationAmount = Math.floor(price * 0.1);

    const handleConfirmOrder = async () => {
        setIsSubmitting(true);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Finalize order
        setOrderId(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
        await addDonation(donationAmount);

        setIsSubmitting(false);
        setIsFinished(true);
    };

    if (isFinished) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
                <div className="relative bg-white border border-gray-200 rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 overflow-hidden">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-green-600" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center text-gray-900">주문 접수 완료!</h3>
                    <p className="text-gray-500 text-sm mb-8 text-center leading-relaxed">
                        입금 확인 후 이메일로<br />
                        <span className="font-bold text-gray-900">다운로드 링크</span>가 발송됩니다.
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 space-y-4 border border-gray-100">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 font-medium uppercase tracking-wider">주문 번호</span>
                            <span className="font-black text-gray-900">{orderId}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 font-medium uppercase tracking-wider">결제 금액</span>
                            <span className="font-bold text-blue-600">{price.toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500 font-medium uppercase tracking-wider">입금 상태</span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full font-bold">
                                입금 대기중
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all"
                    >
                        확인 완료
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
            <div className="relative bg-white border border-gray-200 rounded-[2.5rem] max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 md:p-8 pb-0 flex justify-between items-start shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">결제하기</h2>
                        <p className="text-gray-500 text-sm mt-1">{book.title}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 md:p-8 space-y-6 overflow-y-auto">

                    {/* Price Info */}
                    <div className="flex justify-between items-baseline border-b border-gray-100 pb-6">
                        <span className="text-gray-500 font-medium">총 결제금액</span>
                        <span className="text-3xl font-black text-gray-900">{price.toLocaleString()}<span className="text-lg font-bold text-gray-400 ml-1">원</span></span>
                    </div>

                    {/* Payment Method Tabs */}
                    <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
                        <button
                            onClick={() => setPaymentTab('bank')}
                            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${paymentTab === 'bank' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <CreditCard size={16} />
                            무통장 입금
                        </button>
                        <button
                            onClick={() => setPaymentTab('kakao')}
                            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 md:hidden ${paymentTab === 'kakao' ? 'bg-[#FAE100] text-[#371D1E] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            kakaoPay
                        </button>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 min-h-[200px] flex flex-col justify-center">
                        {paymentTab === 'bank' ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">은행명</label>
                                    <div className="text-lg font-bold text-gray-900">신한은행</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">계좌번호</label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-black text-gray-900 font-mono tracking-tight">110-513-646297</span>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText("110513646297");
                                                alert("계좌번호가 복사되었습니다.");
                                            }}
                                            className="p-1.5 hover:bg-gray-200 rounded-md text-gray-500 transition-colors"
                                        >
                                            <Copy size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">예금주</label>
                                    <div className="text-lg font-bold text-gray-900">정겨운</div>
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-xs text-blue-600 font-medium">
                                        * 입금자명을 주문자명과 동일하게 해주세요.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-4 py-8">
                                <div>
                                    <p className="text-sm font-bold text-gray-900 mb-2">카카오페이 송금</p>
                                    <button
                                        onClick={() => window.open("https://qr.kakaopay.com/Ej7qNKGFs", "_blank")}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#FAE100] text-[#371D1E] rounded-xl text-md font-bold hover:bg-[#FADB00] transition-colors shadow-sm"
                                    >
                                        카카오페이 실행하기
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Donation Info Section */}
                    <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                            <Heart size={18} className="text-orange-500 fill-orange-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-orange-900">따뜻한 나눔이 함께합니다</p>
                            <p className="text-xs text-orange-700/70">
                                결제 금액의 10% ({donationAmount.toLocaleString()}원)는<br />
                                <span className="font-bold">어린이 상상학교</span>에 자동으로 후원됩니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 md:p-8 pt-0 sticky bottom-0 bg-white border-t border-gray-50 mt-auto">
                    <button
                        onClick={handleConfirmOrder}
                        disabled={isSubmitting}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20"
                    >
                        {isSubmitting ? '처리중...' : '입금 완료 후 주문하기'}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">
                        위 내용을 확인하였으며 결제 진행에 동의합니다.
                    </p>
                </div>
            </div>
        </div>
    );
}

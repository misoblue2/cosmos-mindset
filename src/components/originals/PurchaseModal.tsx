"use client";

import { useState } from 'react';
import {
    X,
    User,
    UserPlus,
    Truck,
    Download,
    CheckCircle2,
    ArrowRight,
    Shield,
    Heart
} from 'lucide-react';
import { addDonation } from '@/lib/db';

interface PurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    book: any;
    type: 'pdf' | 'physical';
    onDownload?: () => void;
}

export function PurchaseModal({ isOpen, onClose, book, type, onDownload }: PurchaseModalProps) {
    const [mode, setMode] = useState<'login' | 'guest' | 'signup'>('login');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'naver' | 'kakao'>('card');
    const [orderId, setOrderId] = useState('');

    if (!isOpen) return null;

    const handleAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate a small delay for "payment processing"
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Finalize order
        setOrderId(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

        // Add Donation (10% of price)
        // Parse price removing non-numeric chars
        const priceStr = book.price || "15000";
        const price = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
        const donationAmount = Math.floor(price * 0.1);

        await addDonation(donationAmount);

        setIsSubmitting(false);
        setIsFinished(true);

        // Trigger download in background if PDF
        if (type === 'pdf' && onDownload) {
            onDownload();
        }
    };

    if (isFinished) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
                <div className="relative bg-card border border-border rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-primary" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-1 text-center font-serif">주문에 감사드립니다!</h3>
                    <p className="text-muted-foreground text-sm mb-8 text-center leading-relaxed">
                        성공적으로 주문이 접수되었습니다.
                    </p>

                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2 delay-300">
                        <div className="p-2 bg-white rounded-full shadow-sm">
                            <Heart size={16} className="text-orange-500 fill-orange-500" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-orange-800">어린이 상상학교 후원 적립 완료</p>
                            <p className="text-[10px] text-orange-600/80">구매 금액의 10%가 자동으로 기부되었습니다.</p>
                        </div>
                    </div>

                    <div className="bg-muted/30 rounded-2xl p-6 mb-8 space-y-4 border border-border/50">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground font-medium uppercase tracking-wider">주문 번호</span>
                            <span className="font-black text-primary">{orderId}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground font-medium uppercase tracking-wider">상품명</span>
                            <span className="font-bold">{book.title}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground font-medium uppercase tracking-wider">진행 상태</span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-full font-bold">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                {type === 'pdf' ? '다운로드 준비완료' : '상품 준비 중'}
                            </span>
                        </div>
                        {type === 'physical' && (
                            <div className="pt-4 border-t border-border/50 flex items-start gap-3">
                                <Truck size={14} className="text-muted-foreground mt-0.5" />
                                <p className="text-[10px] text-muted-foreground leading-normal">
                                    영업일 기준 **3일 내**에 출고되어 운송장 번호가 휴대전화로 전송될 예정입니다.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-primary text-primary-foreground font-black rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            주문 확인 및 홈으로
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
            <div className="relative bg-card border border-border rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-muted rounded-full transition-all text-muted-foreground"
                >
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                        {type === 'pdf' ? <Download className="text-primary" size={24} /> : <Truck className="text-primary" size={24} />}
                    </div>
                    <div className="text-left">
                        <h3 className="text-xl font-bold font-serif">{book.title}</h3>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                            {type === 'pdf' ? 'Digital PDF Edition' : 'Physical Book Edition'}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex bg-muted/50 p-1.5 rounded-2xl mb-8">
                    <button
                        onClick={() => setMode('login')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'login' || mode === 'signup' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <User size={16} />
                        회원 구매
                    </button>
                    <button
                        onClick={() => setMode('guest')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'guest' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <UserPlus size={16} />
                        비회원 구매
                    </button>
                </div>

                <form onSubmit={handleAction} className="space-y-6 text-left">
                    {mode === 'login' && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">이메일/아이디</label>
                                <input type="text" placeholder="your@email.com" className="w-full px-5 py-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">비밀번호</label>
                                <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" required />
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <button type="button" onClick={() => setMode('signup')} className="text-primary font-bold hover:underline">회원가입하기</button>
                                <button type="button" className="text-muted-foreground font-medium">아이디/비밀번호 찾기</button>
                            </div>
                        </div>
                    )}

                    {mode === 'signup' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase ml-1">이름</label>
                                    <input type="text" placeholder="성함" className="w-full px-5 py-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase ml-1">연락처</label>
                                    <input type="tel" placeholder="010-0000-0000" className="w-full px-5 py-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">이메일</label>
                                <input type="email" placeholder="your@email.com" className="w-full px-5 py-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">배송 주소</label>
                                <input type="text" placeholder="기본 주소 및 상세 주소" className="w-full px-5 py-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">비밀번호</label>
                                <input type="password" placeholder="8자 이상 입력" className="w-full px-5 py-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" required />
                            </div>
                            <button type="button" onClick={() => setMode('login')} className="text-xs text-primary font-bold hover:underline">이미 계정이 있으신가요?</button>
                        </div>
                    )}

                    {mode === 'guest' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase ml-1">구매자 성함</label>
                                    <input type="text" placeholder="실명 입력" className="w-full px-5 py-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase ml-1">연락처</label>
                                    <input type="tel" placeholder="010-0000-0000" className="w-full px-5 py-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">배송 주소 (실물 도서 선택 시)</label>
                                <input type="text" placeholder="주소를 입력해주세요" className="w-full px-5 py-3.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all" required={type === 'physical'} />
                            </div>
                            <div className="p-4 bg-muted/30 rounded-xl flex gap-3 items-start">
                                <Shield className="text-blue-500 shrink-0 mt-0.5" size={16} />
                                <p className="text-[11px] text-muted-foreground leading-snug">
                                    주문하신 도서의 배송 현황은 입력하신 연락처로 실시간 전송됩니다. 안전하게 암호화되어 보호되니 안심하고 입력해주세요.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase ml-1">결제 수단 선택</label>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('card')}
                                className={`py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border bg-background hover:border-muted-foreground/30'}`}
                            >
                                <span className="text-[10px] font-black uppercase">일반 결제</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('naver')}
                                className={`py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${paymentMethod === 'naver' ? 'border-[#03C75A] bg-[#03C75A]/5' : 'border-border bg-background hover:border-[#03C75A]/30'}`}
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Naver_Pay_Logo.png" alt="Naver Pay" className="h-3 md:h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('kakao')}
                                className={`py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${paymentMethod === 'kakao' ? 'border-[#FAE100] bg-[#FAE100]/5' : 'border-border bg-background hover:border-[#FAE100]/30'}`}
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/KakaoPay_logo.svg/1024px-KakaoPay_logo.svg.png" alt="Kakao Pay" className="h-3 md:h-4" />
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-5 font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 group ${paymentMethod === 'naver' ? 'bg-[#03C75A] text-white shadow-[#03C75A]/20' :
                            paymentMethod === 'kakao' ? 'bg-[#FAE100] text-[#3c1e1e] shadow-[#FAE100]/20' :
                                'bg-primary text-primary-foreground shadow-primary/20'
                            }`}
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>{paymentMethod === 'naver' ? '네이버페이로 결제' : paymentMethod === 'kakao' ? '카카오페이로 결제' : (type === 'pdf' ? 'PDF 구매 및 다운로드' : '실물도서 주문하기')}</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-[10px] text-muted-foreground font-medium">
                    안전한 결제를 위해 최신 암호화 기술이 적용되어 있습니다.
                </div>
            </div>
        </div>
    );
}

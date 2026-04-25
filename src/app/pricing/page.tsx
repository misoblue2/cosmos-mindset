"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Check, Crown, Zap, Sparkles, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { PLANS, getSubscription, activateSubscription, type SubscriptionData } from '@/lib/subscriptionStore';
import { MENTORS } from '@/lib/mentorData';

declare global {
    interface Window {
        IMP?: {
            init: (merchantId: string) => void;
            request_pay: (params: any, callback: (rsp: any) => void) => void;
        };
    }
}

export default function PricingPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [currentSub, setCurrentSub] = useState<SubscriptionData | null>(null);
    const [paymentProcessing, setPaymentProcessing] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            const sub = await getSubscription();
            setCurrentSub(sub);
            setIsMounted(true);
        };
        load();
    }, []);

    const handlePayment = async (planId: string) => {
        const plan = PLANS.find(p => p.id === planId);
        if (!plan) return;

        setPaymentProcessing(planId);

        // PortOne (아임포트) 결제 호출
        if (typeof window !== 'undefined' && window.IMP) {
            window.IMP.init('imp00000000'); // TODO: 실제 가맹점 코드로 교체
            window.IMP.request_pay({
                pg: 'html5_inicis',
                pay_method: 'card',
                merchant_uid: `cosmos_${planId}_${Date.now()}`,
                name: `긍정마인드셋 학교 - ${plan.name}`,
                amount: plan.price,
                buyer_email: '',
                buyer_name: '수강생',
            }, async (rsp: any) => {
                if (rsp.success) {
                    // 결제 성공 → 구독 활성화
                    const sub = await activateSubscription(
                        plan.id, plan.name, plan.price, plan.durationMonths, rsp.imp_uid
                    );
                    setCurrentSub(sub);
                    alert(`🎉 ${plan.name} 결제가 완료되었습니다! 이제 학교에 입학하세요!`);
                } else {
                    alert(`결제에 실패했습니다: ${rsp.error_msg}`);
                }
                setPaymentProcessing(null);
            });
        } else {
            // 아임포트가 로드되지 않은 경우 → 데모 모드
            const confirmed = confirm(`[테스트 모드] ${plan.name} (${plan.priceLabel})을 데모 결제하시겠습니까?\n실제 결제는 이루어지지 않습니다.`);
            if (confirmed) {
                const sub = await activateSubscription(
                    plan.id, plan.name, plan.price, plan.durationMonths, `demo_${Date.now()}`
                );
                setCurrentSub(sub);
            }
            setPaymentProcessing(null);
        }
    };

    if (!isMounted) return <div className="min-h-screen bg-[#050510]" />;

    return (
        <div className="min-h-screen bg-[#050510] text-white overflow-hidden relative">
            {/* 배경 앰비언트 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[200px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[200px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
                {/* 네비게이션 */}
                <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 font-bold group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 메인으로 돌아가기
                </Link>

                {/* 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20 space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-black uppercase tracking-[0.3em] text-purple-300">
                        <Crown size={14} /> Positive Mindset School
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-blue-300">
                            당신의 뇌를 바꾸는
                        </span>
                        <br />
                        <span className="text-white">30일의 여정</span>
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed font-medium">
                        뇌과학의 신경 가소성 원리를 기반으로, 매일 20분씩 멘토들의 지혜를 직접 손으로 타이핑하며
                        뇌 회로를 물리적으로 바꾸는 훈련소입니다.
                    </p>
                </motion.div>

                {/* 현재 구독 상태 배너 */}
                {currentSub?.isActive && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 max-w-2xl mx-auto">
                        <div className="flex items-center gap-4 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                            <ShieldCheck size={32} className="text-emerald-400" />
                            <div>
                                <p className="font-black text-emerald-300">{currentSub.planLabel} 구독 중</p>
                                <p className="text-emerald-200/60 text-sm">
                                    만료일: {currentSub.endDate ? new Date(currentSub.endDate).toLocaleDateString('ko-KR') : '무기한'}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 가격 카드 3개 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-32">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className={`relative rounded-[2.5rem] overflow-hidden transition-all hover:scale-[1.02] ${
                                plan.popular
                                    ? 'bg-gradient-to-b from-blue-600/20 to-indigo-900/40 border-2 border-blue-400/50 shadow-[0_0_80px_rgba(99,102,241,0.3)]'
                                    : 'bg-white/5 border border-white/10'
                            }`}
                        >
                            {/* 인기 뱃지 */}
                            {plan.badge && (
                                <div className={`absolute top-0 right-6 px-4 py-2 rounded-b-xl font-black text-xs tracking-widest uppercase ${
                                    plan.popular ? 'bg-blue-500 text-white' : 'bg-amber-500 text-black'
                                }`}>
                                    {plan.badge}
                                </div>
                            )}

                            <div className="p-10 flex flex-col h-full">
                                {/* 플랜 아이콘 */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                    {i === 0 ? <Sparkles className="text-white" size={28} /> :
                                     i === 1 ? <Zap className="text-white" size={28} /> :
                                     <Crown className="text-white" size={28} />}
                                </div>

                                <h3 className="text-2xl font-black mb-1">{plan.name}</h3>
                                <p className="text-white/40 text-sm font-bold mb-6">{plan.duration} 코스</p>

                                {/* 가격 */}
                                <div className="mb-8">
                                    <span className="text-5xl font-black">{plan.priceLabel}</span>
                                    <span className="text-white/40 text-sm ml-2">/ {plan.duration}</span>
                                </div>

                                {/* 특징 리스트 */}
                                <ul className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((feat, fi) => (
                                        <li key={fi} className="flex items-start gap-3 text-sm">
                                            <Check size={18} className={plan.popular ? 'text-blue-400 mt-0.5' : 'text-emerald-400 mt-0.5'} />
                                            <span className="text-white/80 font-medium">{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA 버튼 */}
                                <button
                                    onClick={() => handlePayment(plan.id)}
                                    disabled={paymentProcessing === plan.id || (currentSub?.isActive && currentSub.plan === plan.id)}
                                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
                                        currentSub?.isActive && currentSub.plan === plan.id
                                            ? 'bg-white/5 border border-white/10 text-white/30 cursor-default'
                                            : plan.popular
                                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95'
                                                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                                    }`}
                                >
                                    {paymentProcessing === plan.id ? (
                                        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : currentSub?.isActive && currentSub.plan === plan.id ? (
                                        '현재 구독 중'
                                    ) : (
                                        <>입학하기 <ArrowRight size={18} /></>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 멘토 라인업 프리뷰 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="max-w-5xl mx-auto mb-20"
                >
                    <h2 className="text-3xl font-black text-center mb-4">10명의 세계적인 멘토가 당신을 기다립니다</h2>
                    <p className="text-center text-white/40 mb-12 font-medium">
                        150개 이상의 명언을 직접 손으로 타이핑하며 뇌에 새깁니다.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {MENTORS.map((m, i) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + i * 0.08 }}
                                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 text-center transition-all cursor-default"
                            >
                                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border-2" style={{ borderColor: m.color, backgroundColor: m.color + '20' }}>
                                    <Star size={20} style={{ color: m.color }} fill={m.color} />
                                </div>
                                <h4 className="font-black text-sm mb-1">{m.name}</h4>
                                <p className="text-white/30 text-[10px] font-bold">{m.nameEn}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 브랜드 철학 */}
                <div className="max-w-3xl mx-auto text-center space-y-6 pb-20">
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
                    <p className="text-white/30 text-sm leading-relaxed font-medium italic">
                        &ldquo;이 학교는 단순한 온라인 강의가 아닙니다.<br/>
                        뇌 과학의 신경 가소성 원리를 기반으로, 매일 20분씩 30일간 멘토들의 지혜를 직접 손으로 타이핑하며<br/>
                        뇌 회로를 물리적으로 바꾸는 훈련소입니다.&rdquo;
                    </p>
                    <Link href="/graduation" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold text-sm transition-colors">
                        🎓 졸업장 발급 페이지 보기 <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

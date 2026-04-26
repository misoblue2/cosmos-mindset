"use client";
import { motion } from 'framer-motion';
import { Check, Sparkles, Star, Zap, ShieldCheck, CreditCard, Apple, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const PLANS = [
  {
    id: "monthly",
    name: "입문 코스",
    duration: "1개월",
    price: "10,000",
    billing: "월 결제 / 해지 가능",
    features: [
      "30일 완전 커리큘럼",
      "멘토 3인 콘텐츠",
      "매일 6단계 루틴",
      "432Hz 힐링 명상",
      "1개월 졸업장 발급",
      "누적 타이핑 통계"
    ],
    highlight: false,
    btnText: "지금 시작하기"
  },
  {
    id: "sixMonth",
    name: "창조자 코스",
    duration: "6개월",
    price: "60,000",
    billing: "6개월 선결제 (월 1만)",
    features: [
      "1개월 코스 전체 포함",
      "탑 10 멘토 전체 해제",
      "6개월 확장 커리큘럼",
      "마음상담소 무제한",
      "우주서재 전자책 1권",
      "졸업장 3종 발급",
      "마인드 라운드테이블"
    ],
    highlight: true,
    badge: "가장 인기 있는 플랜",
    btnText: "6개월 시작하기"
  },
  {
    id: "annual",
    name: "그랜드 마스터",
    duration: "12개월",
    price: "120,000",
    billing: "12개월 선결제 (월 1만)",
    features: [
      "6개월 코스 전체 포함",
      "1년 전체 커리큘럼 해제",
      "커스텀 코스 개설 권한",
      "신규생 멘토링 권한",
      "전자책 전권 무료",
      "졸업장 4종 발급",
      "동문 네트워크 등재",
      "AI 전담 코치 배정"
    ],
    highlight: false,
    btnText: "마스터로 시작하기"
  }
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (planId: string) => {
    setLoading(planId);
    // 실제 구현 시 여기에 /api/create-checkout-session 호출 로직 추가
    console.log(`Processing checkout for ${planId}`);
    setTimeout(() => {
      alert("결제 시스템 연동을 위해 Stripe API 키 설정이 필요합니다. 전송해주신 기획서의 로직을 백엔드에 안전하게 이식하겠습니다.");
      setLoading(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32 px-6 overflow-hidden">
      {/* 배경 라인 컨셉 */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-20 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black tracking-widest uppercase"
          >
            <Zap size={14} /> membership plans
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">코스믹마인드 플랜</h1>
          <p className="text-white/40 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-medium">
            매일 20분. 30일이면 완전히 다른 뇌가 됩니다.<br/>
            당신의 변화에 가장 적합한 플랜을 선택하세요.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col p-10 rounded-[2.5rem] border transition-all duration-500 overflow-hidden group ${
                plan.highlight 
                  ? 'bg-white text-black border-white shadow-[0_50px_100px_rgba(255,255,255,0.08)]' 
                  : 'bg-white/[0.03] border-white/10 hover:border-white/30 text-white'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-0 right-0 h-10 bg-black text-white text-[10px] font-black flex items-center justify-center tracking-[0.3em] uppercase">
                   {plan.badge}
                </div>
              )}

              <div className="mt-8 mb-10">
                <div className={`text-[10px] font-black tracking-[0.2em] uppercase mb-4 ${plan.highlight ? 'text-black/40' : 'text-white/40'}`}>
                  {plan.name}
                </div>
                <h3 className="text-3xl font-black mb-8 tracking-tight">{plan.duration}</h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-6xl font-black tracking-tighter ${plan.highlight ? 'text-black' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  <span className="text-xl opacity-40 font-black">원</span>
                </div>
                <div className="text-xs opacity-40 mt-4 font-bold tracking-tight">{plan.billing}</div>
              </div>

              <ul className="space-y-5 mb-14 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className={`flex items-start gap-3 text-sm font-bold leading-tight transition-colors ${plan.highlight ? 'text-black/60' : 'text-white/40 group-hover:text-white'}`}>
                    <Check size={16} className={`${plan.highlight ? 'text-black' : 'text-white'} shrink-0 mt-0.5`} />
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleCheckout(plan.id)}
                disabled={loading !== null}
                className={`w-full py-6 rounded-2xl font-black text-sm tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 ${
                plan.highlight
                  ? 'bg-black text-white hover:scale-[1.03] active:scale-95 shadow-2xl'
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-black hover:scale-[1.03] active:scale-95'
              }`}>
                {loading === plan.id ? "연결 중..." : plan.btnText}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center space-y-10">
           <div className="flex items-center justify-center gap-10 opacity-30 invert brightness-0">
             <CreditCard size={24} />
             <Apple size={24} />
             <Wallet size={24} />
           </div>
           
           <p className="text-white/30 text-sm font-bold">
             결제 없이 먼저 체험하고 싶다면, <Link href="/training/day1" className="text-white border-b border-white/30 pb-0.5 hover:text-white/80 transition-colors">Day 1 무료 체험하기 →</Link>
           </p>
           
           <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black text-white/20 tracking-[0.4em] uppercase">
              <span className="flex items-center gap-2"><ShieldCheck size={14} /> 7-Day Guarantee</span>
              <span className="flex items-center gap-2"><ShieldCheck size={14} /> Secure Payment</span>
              <span className="flex items-center gap-2"><ShieldCheck size={14} /> Cancel Anytime</span>
           </div>
        </div>
      </div>
    </div>
  );
}

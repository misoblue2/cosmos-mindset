"use client";
import { motion } from 'framer-motion';
import { Check, Sparkles, Star, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const PLANS = [
  {
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
  return (
    <div className="min-h-screen bg-[#07070f] text-white pt-24 pb-32 px-6 overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#c8a84b]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-20 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c8a84b]/10 border border-[#c8a84b]/20 text-[#c8a84b] text-[10px] font-black tracking-widest uppercase"
          >
            <Zap size={14} /> membership plans
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">코스믹마인드 플랜 선택</h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
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
                  ? 'bg-white/[0.06] border-[#c8a84b] shadow-[0_30px_100px_rgba(200,168,75,0.1)]' 
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-[#c8a84b] to-[#ffd700] text-black text-[10px] font-black flex items-center justify-center tracking-widest uppercase">
                   {plan.badge}
                </div>
              )}

              <div className="mt-4 mb-10">
                <div className="text-[10px] font-black tracking-widest text-white/30 uppercase mb-2">{plan.name}</div>
                <h3 className="text-2xl font-black mb-6">{plan.duration}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[#c8a84b] tracking-tighter">{plan.price}</span>
                  <span className="text-lg text-white/30 font-bold">원</span>
                </div>
                <div className="text-xs text-white/40 mt-3 font-medium">{plan.billing}</div>
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                    <Check size={16} className="text-[#c8a84b] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 rounded-2xl font-black text-sm tracking-widest transition-all ${
                plan.highlight
                  ? 'bg-gradient-to-r from-[#c8a84b] to-[#ffd700] text-black hover:scale-[1.02] shadow-xl'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}>
                {plan.btnText}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center space-y-6">
           <p className="text-white/30 text-sm">
             결제 없이 먼저 체험하고 싶다면, <Link href="/training/day1" className="text-[#c8a84b] font-bold border-b border-[#c8a84b]/30 pb-0.5">Day 1 무료 체험하기 →</Link>
           </p>
           <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-white/20 tracking-[0.2em] uppercase">
              <span className="flex items-center gap-2"><ShieldCheck size={14} /> 7일 환불 보장</span>
              <span className="flex items-center gap-2"><ShieldCheck size={14} /> 언제든지 해지 가능</span>
              <span className="flex items-center gap-2"><ShieldCheck size={14} /> 보안 결제 시스템</span>
           </div>
        </div>
      </div>
    </div>
  );
}

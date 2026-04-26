"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, CheckCircle2, PlayCircle, Star, Brain, Heart, Sparkles } from 'lucide-react';

const PHASES = [
  {
    title: "Phase 1. 비우기 (Day 1 - 9)",
    subtitle: "낡은 회로 제거",
    color: "blue",
    days: [
      { day: 1, title: "내 마음은 정원이다", mentor: "제임스 앨런", status: "open" },
      { day: 2, title: "생각의 관찰자", mentor: "제임스 앨런", status: "locked" },
      { day: 3, title: "감정의 뿌리", mentor: "제임스 앨런", status: "locked" },
      { day: 4, title: "통제력의 회복", mentor: "아우렐리우스", status: "locked" },
      { day: 5, title: "외부의 소음 차단", mentor: "아우렐리우스", status: "locked" },
      { day: 6, title: "내면의 고요", mentor: "아우렐리우스", status: "locked" },
      { day: 7, title: "반응의 선택", mentor: "빅터 프랭클", status: "locked" },
      { day: 8, title: "고난의 의미", mentor: "빅터 프랭클", status: "locked" },
      { day: 9, title: "최후의 자유", mentor: "빅터 프랭클", status: "locked" },
    ]
  },
  {
    title: "Phase 2. 채우기 (Day 10 - 21)",
    subtitle: "새로운 회로 설치",
    color: "purple",
    days: [
      { day: 10, title: "잠재의식 비밀", mentor: "조셉 머피", status: "locked" },
      // ... 생략 (실제 데이터는 스크롤로 유도)
    ]
  }
];

export default function TrainingDashboard() {
  return (
    <div className="min-h-screen bg-[#07070f] text-white pt-24 pb-48 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c8a84b]/10 border border-[#c8a84b]/20 text-[#c8a84b] text-xs font-bold tracking-widest mb-6"
          >
            <Sparkles size={14} /> MINDSET TRAINING CENTER
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
            30일 뇌 개조 커리큘럼
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            영상 시청이 아닙니다. 직접 타이핑하며 당신의 신경 회로를 물리적으로 재배선하세요.
            매일 20분, 30일 후 당신은 다른 사람이 되어 있을 것입니다.
          </p>
        </header>

        <div className="space-y-24">
          {PHASES.map((phase, pIdx) => (
            <section key={pIdx}>
              <div className="flex items-end justify-between mb-10 pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-black text-white mb-1">{phase.title}</h2>
                  <p className="text-[#c8a84b] font-bold text-sm tracking-widest uppercase">{phase.subtitle}</p>
                </div>
                <div className="text-xs text-white/30 font-mono">0 / {phase.days.length} COMPLETED</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {phase.days.map((day) => (
                  <Link 
                    key={day.day} 
                    href={day.status === 'open' ? `/training/day${day.day}` : '#'}
                    className={`group relative p-8 rounded-[2rem] border transition-all ${
                      day.status === 'open' 
                        ? 'bg-white/5 border-white/10 hover:border-[#c8a84b]/50 hover:bg-white/10' 
                        : 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-4xl font-black ${day.status === 'open' ? 'text-white' : 'text-white/20'}`}>
                        {String(day.day).padStart(2, '0')}
                      </span>
                      {day.status === 'open' ? (
                        <PlayCircle className="text-[#c8a84b] group-hover:scale-110 transition-transform" />
                      ) : (
                        <Lock size={20} className="text-white/20" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2 group-hover:text-[#c8a84b] transition-colors">{day.title}</h3>
                      <div className="flex items-center gap-2 text-xs font-bold text-white/40">
                         <Brain size={14} /> 멘토: {day.mentor}
                      </div>
                    </div>

                    {day.status === 'open' && (
                      <div className="absolute bottom-6 right-8 text-[10px] font-black tracking-widest text-[#c8a84b] opacity-0 group-hover:opacity-100 transition-opacity">
                        훈련 시작하기 →
                      </div>
                    )}
                  </Link>
                ))}
                
                {/* 커밍순 카드 (Phase 2 예시용) */}
                {pIdx === 0 && (
                   <div className="p-8 rounded-[2rem] border border-white/5 bg-black/40 flex items-center justify-center text-white/10 italic font-bold">
                     Next Phase Unlocks on Day 10
                   </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* 하단 통계 바 */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-4xl bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 flex flex-wrap items-center justify-around gap-8 z-50">
           <div className="text-center">
             <div className="text-2xl font-black text-[#c8a84b]">0</div>
             <div className="text-[10px] font-bold text-white/40 tracking-widest uppercase">누적 타이핑</div>
           </div>
           <div className="w-px h-8 bg-white/10 hidden md:block" />
           <div className="text-center">
             <div className="text-2xl font-black text-[#c8a84b]">0</div>
             <div className="text-[10px] font-bold text-white/40 tracking-widest uppercase">연속 출석</div>
           </div>
           <div className="w-px h-8 bg-white/10 hidden md:block" />
           <div className="text-center">
             <div className="text-2xl font-black text-[#c8a84b]">0 / 30</div>
             <div className="text-[10px] font-bold text-white/40 tracking-widest uppercase">진행률</div>
           </div>
           <Link href="/pricing" className="px-8 py-3 bg-[#c8a84b] text-black font-black text-sm rounded-xl hover:scale-105 transition-transform">
             전체 잠금 해제하기
           </Link>
        </div>
      </div>
    </div>
  );
}

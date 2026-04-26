"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, CheckCircle2, PlayCircle, Star, Brain, Heart, Sparkles, Zap } from 'lucide-react';

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
    ]
  }
];

export default function TrainingDashboard() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-48 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black tracking-widest mb-8 uppercase"
          >
            <Zap size={14} /> neural modification training center
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">
            30일 인간 개조 루틴
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            보는 것으로는 바뀌지 않습니다. 직접 새겨야 바뀝니다.<br/>
            매일 20분, 30일 후 당신은 완전히 다른 뇌를 갖게 됩니다.
          </p>
        </header>

        <div className="space-y-32">
          {PHASES.map((phase, pIdx) => (
            <section key={pIdx} className="relative">
              <div className="flex items-end justify-between mb-12 pb-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{phase.title}</h2>
                  <p className="text-white/40 font-black text-[10px] tracking-[0.4em] uppercase">{phase.subtitle}</p>
                </div>
                <div className="text-[10px] text-white/20 font-black tracking-widest">0 / {phase.days.length} COMPLETED</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {phase.days.map((day) => {
                  const isDay1 = day.day === 1;
                  return (
                    <Link 
                      key={day.day} 
                      href={isDay1 ? `/training/day1` : '#'}
                      className={`group relative p-10 rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                        isDay1
                          ? 'bg-white/[0.04] border-white/20 hover:border-white shadow-[0_30px_60px_rgba(255,255,255,0.05)] hover:-translate-y-2' 
                          : 'bg-black border-white/5 opacity-30 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-10">
                        <span className={`text-5xl font-black italic tracking-tighter ${isDay1 ? 'text-white' : 'text-white/10'}`}>
                          {String(day.day).padStart(2, '0')}
                        </span>
                        {isDay1 ? (
                          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                             <PlayCircle size={24} fill="black" />
                          </div>
                        ) : (
                          <Lock size={20} className="text-white/20" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black mb-3 group-hover:text-white transition-colors tracking-tight">{day.title}</h3>
                        <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                           <Brain size={14} /> 멘토: {day.mentor}
                        </div>
                      </div>

                      {isDay1 && (
                        <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-[10px] font-black tracking-widest text-white uppercase bg-white/10 inline-block px-4 py-2 rounded-full">
                          Train Now →
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* 하단 플로팅 통계 바 */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-4xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 flex flex-wrap items-center justify-around gap-8 z-50 shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
           <div className="text-center">
             <div className="text-3xl font-black text-white italic tracking-tighter">0</div>
             <div className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase mt-1">Typing Total</div>
           </div>
           <div className="w-px h-10 bg-white/10 hidden md:block" />
           <div className="text-center">
             <div className="text-3xl font-black text-white italic tracking-tighter">0</div>
             <div className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase mt-1">Con. Days</div>
           </div>
           <div className="w-px h-10 bg-white/10 hidden md:block" />
           <div className="text-center">
             <div className="text-3xl font-black text-white italic tracking-tighter">0%</div>
             <div className="text-[10px] font-black text-white/30 tracking-[0.2em] uppercase mt-1">Success Rate</div>
           </div>
           <Link href="/pricing" className="px-10 py-4 bg-white text-black font-black text-xs rounded-2xl hover:scale-[1.03] active:scale-95 transition-all shadow-2xl tracking-[0.2em] uppercase">
             Unlock Course
           </Link>
        </div>
      </div>
    </div>
  );
}

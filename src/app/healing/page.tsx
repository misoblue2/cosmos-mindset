"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Moon, Zap, CloudMoon, Wind, PenTool, Sparkles, Thermo } from 'lucide-react';

const MOOD_MESSAGES = {
  low: ['지금 많이 힘드시죠. 여기 있어도 됩니다.', '힘든 날이 있어야 좋은 날도 빛납니다.', '지금 이 순간, 숨만 쉬어도 됩니다.'],
  mid: ['오늘도 여기 오신 것만으로 충분합니다.', '평범한 하루도 충분히 소중합니다.', '지금 이 순간이 선물입니다.'],
  high: ['오늘 에너지가 넘치는군요. 이 에너지를 나눠보세요.', '빛나는 하루가 될 것입니다.', '이 좋은 기운이 주변으로 퍼집니다.']
};

export default function HealingPage() {
  const [mood, setMood] = useState(50);
  const [journal, setJournal] = useState('');

  const getMoodInfo = (val: number) => {
    if (val <= 30) return { label: '차갑고 무겁습니다', color: '#3b82f6', msgs: MOOD_MESSAGES.low };
    if (val <= 70) return { label: '보통의 평온함입니다', color: '#9b7fd4', msgs: MOOD_MESSAGES.mid };
    return { label: '따뜻하고 활기찹니다', color: '#c8a84b', msgs: MOOD_MESSAGES.high };
  };

  const info = getMoodInfo(mood);

  return (
    <div className="min-h-screen bg-[#07070f] text-white pt-24 pb-32 px-6 overflow-hidden">
      {/* 배경 다이나믹 그라데이션 */}
      <motion.div 
        className="fixed inset-0 pointer-events-none transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at 50% 50%, ${info.color}15 0%, transparent 70%)` }}
      />

      <div className="max-w-[680px] mx-auto relative z-10 space-y-20">
        <header className="text-center space-y-4">
           <div className="text-[10px] font-black tracking-[0.4em] text-[#9b7fd4] uppercase">✦ Healing Space ✦</div>
           <h1 className="text-4xl font-black">마음상담소</h1>
           <p className="text-white/40 leading-relaxed max-w-sm mx-auto">
             지금 이 순간, 마음이 어디에 있든 괜찮습니다.<br/>
             여기는 판단 없이 쉬어갈 수 있는 공간입니다.
           </p>
        </header>

        {/* 마음 온도계 */}
        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-2xl backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                <Heart size={18} />
              </div>
              <h3 className="text-xl font-black italic">오늘 마음의 온도는?</h3>
           </div>

           <div className="space-y-10">
              <input 
                type="range" min="0" max="100" value={mood} 
                onChange={(e) => setMood(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#9b7fd4]"
                style={{ accentColor: info.color }}
              />
              
              <div className="text-center space-y-4">
                 <motion.div 
                   key={info.label} 
                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                   className="text-3xl font-black" style={{ color: info.color }}
                 >
                   {mood}도 — {info.label}
                 </motion.div>
                 <p className="text-white/40 text-sm font-medium leading-relaxed italic px-8">
                   "{info.msgs[Math.floor(mood % 3)]}"
                 </p>
              </div>
           </div>
        </section>

        {/* 힐링 라이브러리 버튼 그리드 */}
        <div className="grid grid-cols-2 gap-4">
           {[
             { id: 'comfort', label: '위로가 필요해', icon: <Moon />, color: 'rgba(155,127,212,0.15)', borderColor: 'rgba(155,127,212,0.3)' },
             { id: 'motivation', label: '동기가 필요해', icon: <Zap />, color: 'rgba(200,168,75,0.12)', borderColor: 'rgba(200,168,75,0.3)' },
             { id: 'sleep', label: '잠을 못 자겠어', icon: <CloudMoon />, color: 'rgba(59,130,246,0.12)', borderColor: 'rgba(59,130,246,0.3)' },
             { id: 'anger', label: '화가 가라앉지 않아', icon: <Wind />, color: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.3)' }
           ].map(btn => (
             <Link 
               key={btn.id}
               href={`/healing/${btn.id}`}
               className="p-8 rounded-3xl flex flex-col items-center gap-4 transition-all hover:scale-[1.03] active:scale-[0.97]"
               style={{ background: btn.color, border: `1px solid ${btn.borderColor}` }}
             >
                <div className="text-white/80">{btn.icon}</div>
                <span className="text-xs md:text-sm font-black whitespace-nowrap">{btn.label}</span>
             </Link>
           ))}
        </div>

        <Link 
          href="/healing/silence"
          className="w-full block py-5 text-center bg-white/5 border border-white/10 rounded-2xl text-white/40 font-bold text-sm tracking-widest hover:bg-white/10 transition-colors"
        >
          🤫 그냥 조용히 있고 싶어
        </Link>

        {/* 저널링 */}
        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 md:p-12">
            <div className="flex items-center gap-3 mb-8 text-white/50">
               <PenTool size={18} />
               <h3 className="text-lg font-bold">지금 마음속에 있는 것들을 자유롭게 적어보세요</h3>
            </div>
            <textarea 
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="이곳에는 아무도 들어오지 않습니다. 솔직하게 써도 괜찮습니다..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-sm md:text-base leading-relaxed text-white/80 min-h-[180px] outline-none focus:border-[#9b7fd4]/40 transition-colors resize-none"
            />
            <button className="mt-8 px-10 py-4 bg-gradient-to-r from-[#9b7fd4] to-[#6b4fd4] text-white font-black text-sm rounded-xl shadow-xl hover:scale-105 transition-transform">
              마음 기록 저장
            </button>
        </section>

      </div>
    </div>
  );
}

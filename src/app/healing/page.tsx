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
    if (val <= 30) return { label: '차갑고 무겁습니다', color: '#FFFFFF', msgs: MOOD_MESSAGES.low };
    if (val <= 70) return { label: '보통의 평온함입니다', color: '#FFFFFF', msgs: MOOD_MESSAGES.mid };
    return { label: '따뜻하고 활기찹니다', color: '#FFFFFF', msgs: MOOD_MESSAGES.high };
  };

  const info = getMoodInfo(mood);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-48 px-6">
      <div className="max-w-[680px] mx-auto space-y-24">
        <header className="text-center space-y-6">
           <div className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">✦ Healing Space ✦</div>
           <h1 className="text-4xl md:text-5xl font-black tracking-tighter">마음상담소</h1>
           <p className="text-white/40 leading-relaxed max-w-sm mx-auto font-medium">
             지금 이 순간, 마음이 어디에 있든 괜찮습니다.<br/>
             여기는 판단 없이 쉬어갈 수 있는 공간입니다.
           </p>
        </header>

        {/* 마음 온도계 - 심플 블랙 유아이 */}
        <section className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-12 backdrop-blur-xl">
           <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                <Heart size={18} />
              </div>
              <h3 className="text-xl font-black italic tracking-tight">오늘 마음의 온도는?</h3>
           </div>

           <div className="space-y-12">
              <input 
                type="range" min="0" max="100" value={mood} 
                onChange={(e) => setMood(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
              />
              
              <div className="text-center space-y-4">
                 <motion.div 
                   key={info.label} 
                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                   className="text-4xl font-black tracking-tighter"
                 >
                   {mood}° — <span className="text-white/40">{info.label}</span>
                 </motion.div>
                 <p className="text-white/60 text-sm font-bold leading-relaxed italic px-8">
                    "{info.msgs[Math.floor(mood % 3)]}"
                 </p>
              </div>
           </div>
        </section>

        {/* 힐링 라이브러리 버튼 그리드 - 애플 스타일 심플 그리드 */}
        <div className="grid grid-cols-2 gap-6">
           {[
             { id: 'comfort', label: '위로가 필요해', icon: <Moon size={24} /> },
             { id: 'motivation', label: '동기가 필요해', icon: <Zap size={24} /> },
             { id: 'sleep', label: '잠을 못 자겠어', icon: <CloudMoon size={24} /> },
             { id: 'anger', label: '화가 가라앉지 않아', icon: <Wind size={24} /> }
           ].map(btn => (
             <Link 
               key={btn.id}
               href={`/healing/${btn.id}`}
               className="p-10 bg-white/[0.03] border border-white/10 rounded-[2.5rem] flex flex-col items-center gap-6 transition-all hover:bg-white/[0.06] hover:scale-[1.03] active:scale-[0.97] group"
             >
                <div className="text-white/40 group-hover:text-white transition-colors">{btn.icon}</div>
                <span className="text-sm font-black whitespace-nowrap tracking-tight">{btn.label}</span>
             </Link>
           ))}
        </div>

        <Link 
          href="/healing/silence"
          className="w-full block py-6 text-center bg-white/[0.02] border border-white/5 rounded-2xl text-white/20 font-black text-xs tracking-[0.3em] uppercase hover:bg-white/5 transition-all"
        >
          🤫 그냥 조용히 있고 싶어
        </Link>

        {/* 저널링 - 심플 에디터 룩 */}
        <section className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-12">
            <div className="flex items-center gap-3 mb-8 text-white/40">
               <PenTool size={20} />
               <h3 className="text-lg font-black tracking-tight">마음 기록하기</h3>
            </div>
            <textarea 
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="이곳에는 아무도 들어오지 않습니다. 솔직하게 써도 괜찮습니다..."
              className="w-full bg-white/[0.02] border border-white/10 rounded-3xl p-8 text-lg leading-relaxed text-white/80 min-h-[220px] outline-none focus:border-white/30 transition-all resize-none font-medium"
            />
            <button className="mt-10 w-full md:w-auto px-12 py-5 bg-white text-black font-black text-sm rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
              마음 기록 저장
            </button>
        </section>

      </div>
    </div>
  );
}

"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, CheckCircle2, Lock, PlayCircle, Waves, Quote, PenTool, Heart, Trophy, ChevronRight, Music } from 'lucide-react';
import Link from 'next/link';

// --- 전역 데이터 ---
const MENTOR_DATA = {
  id: "mentor1",
  name: "제임스 앨런",
  theme: "내 마음은 정원이다",
  quotes: [
    "마음은 정원이고, 우리는 정원사다.",
    "부정적 생각이라는 잡초를 방치하면 삶이 황폐해진다.",
    "우리는 생각의 주인이 될 수 있다.",
    "고귀한 생각을 품으면 고귀한 삶이 온다.",
    "오늘 내가 심는 씨앗이 내일의 나를 만든다."
  ],
  meditation_affirmations: [
    "나는 지금 이 순간 완전히 평화롭다.",
    "내 마음은 고요하고 나는 이 고요 안에서 강하다.",
    "나는 내 생각의 주인이다.",
    "풍요가 나에게 흘러온다."
  ]
};

const STAGE_NAMES = [
  "호흡 명상",
  "432Hz 힐링 명상",
  "지혜 주입",
  "신경 필사",
  "감사 일기 5가지",
  "현실 로그온"
];

export default function Day1Training() {
  const [stage, setStage] = useState(1);
  const [view, setView] = useState<'intro' | 'active' | 'complete'>('active'); 
  const [stats, setStats] = useState({ typing: 0, gratitude: 0, attendance: 1 });

  const nextStage = () => {
    if (stage < 6) setStage(stage + 1);
    else setView('complete');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans relative">
      <div className="relative z-10 max-w-[680px] mx-auto px-6 py-24 pb-48">
        {/* 헤더 */}
        <header className="flex items-center justify-between mb-16">
          <div className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">✦ Cosmos Mindset</div>
          <div className="bg-white text-black text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase">Day 01</div>
        </header>

        {/* 진행률 바 - 심플 라인 */}
        <div className="mb-20">
          <div className="flex justify-between text-[10px] font-black text-white/20 mb-4 tracking-[0.2em] uppercase">
            <span>Stage {stage} / 6 — {STAGE_NAMES[stage-1]}</span>
            <span>{Math.round(((stage-1)/6)*100)}%</span>
          </div>
          <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
               className="h-full bg-white"
               initial={{ width: 0 }}
               animate={{ width: `${((stage-1)/6)*100}%` }}
               transition={{ duration: 0.8 }}
            />
          </div>
          
          {/* 스텝 인디케이터 - 다크 무드 */}
          <div className="flex justify-center gap-4 mt-12">
            {[1,2,3,4,5,6].map(i => (
              <div 
                key={i}
                className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-black transition-all duration-500 ${
                  i < stage ? 'bg-white border-white text-black' :
                  i === stage ? 'bg-white/10 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]' :
                  'border-white/5 text-white/10'
                }`}
              >
                {i < stage ? <CheckCircle2 size={16} /> : i}
              </div>
            ))}
          </div>
        </div>

        {/* 메인 훈련 카드 */}
        <AnimatePresence mode="wait">
          {view === 'active' && (
            <motion.div 
              key={stage}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-12 md:p-16 shadow-2xl backdrop-blur-xl"
            >
              {stage === 1 && <Stage1Breathing onComplete={nextStage} />}
              {stage === 2 && <Stage2Meditation onComplete={nextStage} />}
              {stage === 3 && <Stage3Insight onComplete={nextStage} />}
              {stage === 4 && <Stage4Typing onComplete={(chars) => { setStats(s => ({...s, typing: s.typing + chars})); nextStage(); }} />}
              {stage === 5 && <Stage5Gratitude onComplete={(count) => { setStats(s => ({...s, gratitude: count})); nextStage(); }} />}
              {stage === 6 && <Stage6Logon onComplete={nextStage} />}
            </motion.div>
          )}

          {view === 'complete' && (
            <motion.div 
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-12 animate-pulse">✦</div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">훈련 완료.</h2>
              <p className="text-white/40 leading-relaxed mb-16 text-lg font-medium">
                오늘 당신의 뇌에 새로운 신경 회로를 설치했습니다.<br/>
                내일 Day 2에서 성장을 계속하세요.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-16">
                <div className="bg-white/[0.03] rounded-3xl p-8 border border-white/5">
                  <div className="text-3xl font-black text-white mb-2">{stats.typing}</div>
                  <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">Typing</div>
                </div>
                <div className="bg-white/[0.03] rounded-3xl p-8 border border-white/5">
                  <div className="text-3xl font-black text-white mb-2">{stats.gratitude}</div>
                  <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">Gratitude</div>
                </div>
                <div className="bg-white/[0.03] rounded-3xl p-8 border border-white/5">
                  <div className="text-3xl font-black text-white mb-2">{stats.attendance}</div>
                  <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">Attendance</div>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/pricing" className="block w-full py-6 bg-white text-black font-black text-lg rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl">
                  코스 전체 잠금 해제하기
                </Link>
                
                <Link href="/training" className="block w-full py-6 bg-white/5 border border-white/10 text-white/40 font-bold rounded-2xl hover:bg-white/10 transition-all">
                  대시보드로 돌아가기
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- 하위 컴포넌트들 (Stage 1~6) ---

function Stage1Breathing({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale'>('ready');
  const [round, setRound] = useState(0);
  const [count, setCount] = useState(0);

  const start = () => {
    setRound(1);
    runSequence(1);
  };

  const runSequence = (r: number) => {
    setPhase('inhale');
    tick(4, () => {
      setPhase('hold');
      tick(7, () => {
        setPhase('exhale');
        tick(8, () => {
          if (r < 4) {
             setRound(r + 1);
             runSequence(r + 1);
          } else {
             onComplete();
          }
        });
      });
    });
  };

  const tick = (seconds: number, next: () => void) => {
    let current = seconds;
    setCount(current);
    const id = setInterval(() => {
      current--;
      setCount(current);
      if (current <= 0) {
        clearInterval(id);
        next();
      }
    }, 1000);
  };

  return (
    <div className="text-center">
      <div className="text-[10px] font-black tracking-[0.4em] text-white/40 mb-10 uppercase">Stage 01 · Breathing</div>
      
      <div className="flex flex-col items-center justify-center gap-16 py-10">
        <div className="relative flex items-center justify-center">
          <motion.div 
            className="absolute w-56 h-56 rounded-full border border-white/20"
            animate={phase === 'inhale' ? { scale: 1.5, opacity: 1 } : phase === 'exhale' ? { scale: 0.8, opacity: 0.3 } : { scale: 1, opacity: 0.1 }}
            transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 8 : 1, ease: "easeInOut" }}
          />
          <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center z-10 shadow-2xl">
            <span className="text-4xl font-mono font-black">{count || '—'}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-white text-2xl font-black tracking-tight leading-tight uppercase min-h-[60px]">
            {phase === 'ready' ? '마음을 정돈하세요.' : 
             phase === 'inhale' ? '코로 들이마십니다 (4초)' :
             phase === 'hold' ? '멈춥니다 (7초)' : '입으로 내뱉습니다 (8초)'}
          </div>
          <div className="text-white/20 text-xs font-black tracking-[0.2em] uppercase">{round} / 4 Rounds</div>
        </div>

        {phase === 'ready' && (
          <button onClick={start} className="w-full py-6 bg-white text-black font-black text-xl rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all">
             훈련 시작
          </button>
        )}
      </div>
    </div>
  );
}

function Stage2Meditation({ onComplete }: { onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(120); 
  const [isActive, setIsActive] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
        if (timeLeft % 30 === 0) setQuoteIdx(i => (i + 1) % MENTOR_DATA.meditation_affirmations.length);
      }, 1000);
    } else if (timeLeft === 0) {
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const remainingS = s % 60;
    return `${m}:${remainingS.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center">
      <div className="text-[10px] font-black tracking-[0.4em] text-white/40 mb-10 uppercase">Stage 02 · Meditation</div>

      <div className="py-8 flex flex-col items-center gap-16">
        <motion.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 4, repeat: Infinity }}
           className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center bg-white/5"
        >
          <Music size={40} className="text-white/60" />
        </motion.div>

        <div className="space-y-6 max-w-sm min-h-[120px] flex items-center justify-center">
           <AnimatePresence mode="wait">
             <motion.p 
               key={quoteIdx}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="text-2xl font-black leading-tight tracking-tight italic"
             >
               "{MENTOR_DATA.meditation_affirmations[quoteIdx]}"
             </motion.p>
           </AnimatePresence>
        </div>

        <div className="text-6xl font-mono font-black text-white tracking-tighter">
          {formatTime(timeLeft)}
        </div>

        {!isActive && (
          <button onClick={() => setIsActive(true)} className="w-full py-6 bg-white text-black font-black text-xl rounded-2xl hover:scale-[1.02] transition-all">
             명상 시작 (눈을 감으세요)
          </button>
        )}
      </div>
    </div>
  );
}

function Stage3Insight({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);

  return (
    <div className="text-center">
       <div className="text-[10px] font-black tracking-[0.4em] text-white/40 mb-10 uppercase">Stage 03 · Insight</div>

       <div className="min-h-[300px] flex flex-col items-center justify-center gap-16 py-10">
          <Quote className="text-white/10" size={64} />
          <AnimatePresence mode="wait">
            <motion.div 
               key={idx}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.05 }}
               className="text-3xl md:text-4xl font-black leading-tight tracking-tighter"
            >
              {MENTOR_DATA.quotes[idx]}
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-3">
             {MENTOR_DATA.quotes.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${i === idx ? 'bg-white w-8' : 'bg-white/10'}`} />
             ))}
          </div>
       </div>

       <button 
          onClick={() => {
            if (idx < MENTOR_DATA.quotes.length - 1) setIdx(idx + 1);
            else onComplete();
          }} 
          className="w-full py-6 bg-white text-black font-black text-xl rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
        >
          {idx === MENTOR_DATA.quotes.length - 1 ? '새기기 시작하기' : '다음 지혜'} <ChevronRight size={24} />
       </button>
    </div>
  );
}

function Stage4Typing({ onComplete }: { onComplete: (chars: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(true);

  const currentSentence = MENTOR_DATA.quotes[idx];

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    if (currentSentence.startsWith(val)) {
      setIsCorrect(true);
      if (val === currentSentence) {
        setTimeout(() => {
          if (idx < MENTOR_DATA.quotes.length - 1) {
            setIdx(idx + 1);
            setInputValue('');
          } else {
            onComplete(MENTOR_DATA.quotes.join('').length);
          }
        }, 500);
      }
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div>
       <div className="text-center">
         <div className="text-[10px] font-black tracking-[0.4em] text-white/40 mb-10 uppercase">Stage 04 · Neuro-Typing</div>
       </div>

       <div className="space-y-12">
         <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 text-2xl font-black leading-tight tracking-tight text-center min-h-[140px] flex items-center justify-center">
            "{currentSentence}"
         </div>

         <div className="relative">
           <textarea 
             autoFocus
             value={inputValue}
             onChange={handleInput}
             placeholder="위 문장을 똑같이 입력하세요..."
             className={`w-full bg-white/[0.03] border-2 rounded-[2rem] p-8 text-2xl font-bold outline-none focus:ring-0 resize-none min-h-[160px] transition-all duration-300 ${
                isCorrect ? 'border-white/10 focus:border-white/40' : 'border-red-900 bg-red-900/5'
             }`}
           />
           {!isCorrect && <div className="absolute top-4 right-6 text-red-500 text-[10px] font-black uppercase tracking-widest">Mismatch</div>}
         </div>

         <div className="flex justify-between items-center text-[10px] font-black text-white/20 tracking-[0.2em] uppercase">
            <span>Sentence {idx + 1} / {MENTOR_DATA.quotes.length}</span>
            <span>Manual input required</span>
         </div>
       </div>
    </div>
  );
}

function Stage5Gratitude({ onComplete }: { onComplete: (count: number) => void }) {
  const [items, setItems] = useState(['', '', '', '', '']);
  const count = items.filter(i => i.trim().length > 0).length;

  return (
    <div>
       <div className="text-center">
         <div className="text-[10px] font-black tracking-[0.4em] text-white/40 mb-10 uppercase">Stage 05 · Gratitude Journal</div>
       </div>

       <div className="space-y-6 mb-16">
          {items.map((val, i) => (
            <div key={i} className="flex gap-6 items-center">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-black border transition-all duration-500 shrink-0 ${val.trim() ? 'bg-white border-white text-black' : 'border-white/10 text-white/10'}`}>
                 {i + 1}
               </div>
               <input 
                 value={val}
                 onChange={(e) => {
                   const newItems = [...items];
                   newItems[i] = e.target.value;
                   setItems(newItems);
                 }}
                 placeholder={["맛있는 식사를 했나요?", "누군가 웃어주었나요?", "몸 상태는 어떤가요?", "날씨가 좋았나요?", "배운 것이 있나요?"][i]}
                 className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl px-8 py-5 text-xl font-medium outline-none focus:bg-white/5 focus:border-white/20 transition-all"
               />
            </div>
          ))}
       </div>

       <div className="mb-12">
          <div className="flex justify-between text-[10px] font-black text-white/60 mb-4 uppercase tracking-[0.3em]">
             <span>Abundance Frequency</span>
             <span>{(count/5)*100}%</span>
          </div>
          <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
             <motion.div className="h-full bg-white" initial={{ width: 0 }} animate={{ width: `${(count/5)*100}%` }} />
          </div>
       </div>

       <button 
          disabled={count < 5}
          onClick={() => onComplete(5)}
          className="w-full py-6 bg-white disabled:bg-white/5 disabled:text-white/10 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02]"
       >
         {count < 5 ? `${5-count} more paths to discover` : '저장 및 다음 단계'}
       </button>
    </div>
  );
}

function Stage6Logon({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState('');

  return (
    <div>
       <div className="text-center">
         <div className="text-[10px] font-black tracking-[0.4em] text-white/40 mb-10 uppercase">Stage 06 · Reality Logon</div>
         <p className="text-white/40 text-lg font-medium mb-12 leading-relaxed text-center">오늘 배운 원리를 삶에서 실천할<br/>1가지 구체적인 행동을 입력하세요.</p>
       </div>

       <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="예: 오늘 만나는 모든 사람에게 마음속으로 축복의 인사를 건네겠다."
          className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-10 text-2xl font-bold outline-none focus:border-white/30 transition-all resize-none min-h-[220px] mb-12 leading-tight"
       />

       <div className="flex flex-wrap justify-center gap-3 mb-16">
          {["상상 실천", "감사 인사", "긍정 피드백", "심호흡 10회"].map(hint => (
            <button 
               key={hint} 
               onClick={() => setText(hint)}
               className="px-6 py-2.5 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/30 hover:border-white/20 hover:text-white transition-all"
            >
              {hint}
            </button>
          ))}
       </div>

       <button 
          disabled={text.trim().length < 5}
          onClick={onComplete}
          className="w-full py-7 bg-white text-black font-black text-2xl rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20"
       >
         ✦ 훈련 완료
       </button>
    </div>
  );
}

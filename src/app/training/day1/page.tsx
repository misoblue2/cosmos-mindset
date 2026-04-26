"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, CheckCircle2, Quote, Music, ChevronRight, FileText, MousePointer2 } from 'lucide-react';
import Link from 'next/link';

// --- v2.0 정통 기획 데이터 ---
const MENTOR_DATA = {
  id: "mentor1",
  name: "제임스 앨런 (James Allen)",
  theme: "내 마음은 정원이다. 내가 심는 것이 자란다.",
  bio: "제임스 앨런의 '생각하라 그러면 이루어지리라'는 1903년 출판되어 지금도 전 세계에서 수백만 부씩 팔리는 불멸의 고전입니다. 그는 인간의 내면이 곧 외면의 거울이며, 마음의 질이 삶의 질을 100% 결정한다고 말했습니다.",
  quotes: [
    "마음은 정원이고, 우리는 정원사다.",
    "부정적 생각이라는 잡초를 방치하면 삶이 황폐해진다.",
    "우리는 생각의 주인이 될 수 있다.",
    "고귀한 생각을 품으면 고귀한 삶이 온다.",
    "오늘 내가 심는 씨앗이 내일의 나를 만든다."
  ],
  meditation_affirmations: [
    "나는 지금 이 순간 완전히 평화롭다.",
    "내 안에 무한한 지혜와 힘이 있다.",
    "나는 이미 원하는 삶 속에 있다.",
    "우주는 나를 사랑한다."
  ]
};

const STAGE_NAMES = [
  "심호흡 명상",
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
          <div className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">✦ Cosmic Mindset Mastery</div>
          <div className="bg-white text-black text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase">Phase 1 · Day 01</div>
        </header>

        {/* 진행률 바 */}
        <div className="mb-20">
          <div className="flex justify-between text-[10px] font-black text-white/20 mb-4 tracking-[0.2em] uppercase">
            <span className="flex items-center gap-2 tracking-tighter"><FileText size={10} /> Stage {stage} / 6 — {STAGE_NAMES[stage-1]}</span>
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
          
          <div className="flex justify-center gap-4 mt-12">
            {[1,2,3,4,5,6].map(i => (
              <div 
                key={i}
                className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-black transition-all duration-500 ${
                  i < stage ? 'bg-white border-white text-black' :
                  i === stage ? 'bg-white/10 border-white text-white shadow-[0_0_25px_rgba(255,255,255,0.1)]' :
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
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 md:p-16 shadow-2xl relative overflow-hidden"
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
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-7xl mb-12 animate-pulse font-black leading-none">✦</div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter leading-tight">신경 회로 설치 완료.</h2>
              <p className="text-white/40 leading-relaxed mb-16 text-lg font-medium">
                오늘 당신의 뇌에 새로운 긍정 회로를 각인했습니다.<br className="hidden md:block"/>
                작은 시작이 가장 강력한 변화의 씨앗입니다.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-20 px-4">
                <div className="bg-white/[0.03] rounded-3xl py-10 px-4 border border-white/5">
                  <div className="text-3xl font-black text-white mb-2">{stats.typing.toLocaleString()}</div>
                  <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">Typing Chars</div>
                </div>
                <div className="bg-white/[0.03] rounded-3xl py-10 px-4 border border-white/5">
                  <div className="text-3xl font-black text-white mb-2">{stats.gratitude}</div>
                  <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">Gratitude Items</div>
                </div>
                <div className="bg-white/[0.03] rounded-3xl py-10 px-4 border border-white/5">
                  <div className="text-3xl font-black text-white mb-2">{stats.attendance}</div>
                  <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">Continuous Days</div>
                </div>
              </div>

              <div className="space-y-4 max-w-sm mx-auto">
                <Link href="/pricing" className="block w-full py-6 bg-white text-black font-black text-lg rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-2xl">
                  Day 2 계속하기 (플랜 선택)
                </Link>
                
                <Link href="/training" className="block w-full py-6 bg-black border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all text-sm uppercase tracking-widest">
                  마침표 찍기
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// v2.0 Stage 1: 심호흡 명상 (4-7-8 루틴)
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
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-black tracking-widest uppercase text-white/40 mb-12">Alpha Wave Entry</div>
      
      <div className="flex flex-col items-center justify-center gap-20 py-6">
        <div className="relative flex items-center justify-center">
          <motion.div 
            className="absolute rounded-full border border-white/10"
            animate={phase === 'inhale' ? { width: 340, height: 340, opacity: 0.4 } : phase === 'exhale' ? { width: 120, height: 120, opacity: 0.1 } : { width: 220, height: 220, opacity: 0.05 }}
            transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 8 : 1, ease: "easeInOut" }}
          />
          <div className="w-28 h-28 rounded-full bg-white text-black flex items-center justify-center z-10 shadow-2xl relative">
            <span className="text-4xl font-mono font-black">{count || '—'}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-white text-3xl font-black tracking-tighter leading-[0.95] min-h-[80px] flex items-center justify-center italic">
            {phase === 'ready' ? '뇌를 준비시키세요.' : 
             phase === 'inhale' ? '코로 천천히 들이쉽니다.' :
             phase === 'hold' ? '잠시 멈춥니다.' : '입으로 천천히 내쉽니다.'}
          </div>
          <div className="text-white/20 text-[10px] font-black tracking-[0.4em] uppercase">{round} / 4 Rounds</div>
        </div>

        {phase === 'ready' && (
          <button onClick={start} className="w-full py-6 bg-white text-black font-black text-xl rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.03] transition-all">
             호흡 시작하기
          </button>
        )}
      </div>
    </div>
  );
}

// v2.0 Stage 2: 432Hz 힐링 명상
function Stage2Meditation({ onComplete }: { onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(240); 
  const [isActive, setIsActive] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
        if (timeLeft % 60 === 0) setQuoteIdx(i => (i + 1) % MENTOR_DATA.meditation_affirmations.length);
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
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-black tracking-widest uppercase text-white/40 mb-12">Cellular Resonance 432Hz</div>

      <div className="py-6 flex flex-col items-center gap-16">
        <motion.div 
           animate={isActive ? { scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] } : {}}
           transition={{ duration: 4, repeat: Infinity }}
           className="w-40 h-40 rounded-full border border-white/5 flex items-center justify-center bg-white/[0.02]"
        >
          <Music size={48} className="text-white/20" />
        </motion.div>

        <div className="space-y-8 max-w-sm min-h-[140px] flex flex-col items-center justify-center">
           <AnimatePresence mode="wait">
             <motion.p 
               key={quoteIdx}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -15 }}
               className="text-2xl font-black leading-tight tracking-tight italic text-white/80"
             >
               "{MENTOR_DATA.meditation_affirmations[quoteIdx]}"
             </motion.p>
           </AnimatePresence>
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Now Inner Calming</p>
        </div>

        <div className="text-7xl font-mono font-black text-white tracking-tighter">
          {formatTime(timeLeft)}
        </div>

        {!isActive && (
          <button onClick={() => setIsActive(true)} className="w-full py-6 bg-white text-black font-black text-xl rounded-2xl hover:scale-[1.03] active:scale-95 transition-all">
             명상 시작 (눈을 감으세요)
          </button>
        )}
      </div>
    </div>
  );
}

// v2.0 Stage 3: 지혜 주입
function Stage3Insight({ onComplete }: { onComplete: () => void }) {
  const [idx, setIdx] = useState(0);

  return (
    <div className="text-center px-4">
       <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-black tracking-widest uppercase text-white/40 mb-12">Wisdom Injection</div>

       <div className="min-h-[340px] flex flex-col items-center justify-center gap-16 py-6">
          <Quote className="text-white/5" size={80} />
          <AnimatePresence mode="wait">
            <motion.div 
               key={idx}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.02 }}
               className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tighter"
            >
              {MENTOR_DATA.quotes[idx]}
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2.5">
             {MENTOR_DATA.quotes.map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-700 ${i === idx ? 'bg-white w-12' : 'bg-white/10 w-4'}`} />
             ))}
          </div>
       </div>

       <button 
          onClick={() => {
            if (idx < MENTOR_DATA.quotes.length - 1) setIdx(idx + 1);
            else onComplete();
          }} 
          className="w-full py-6 bg-white text-black font-black text-xl rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-95 transition-all shadow-2xl"
        >
          {idx === MENTOR_DATA.quotes.length - 1 ? '문장을 손끝에 새기기' : '다음 지혜 읽기'} <ChevronRight size={24} />
       </button>
       <div className="mt-8 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{MENTOR_DATA.name}</div>
    </div>
  );
}

// v2.0 Stage 4: 신경 필사 (Neuro-Typing)
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
        }, 600);
      }
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="px-2">
       <div className="text-center">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-black tracking-widest uppercase text-white/40 mb-12">Neuro-Rewiring Typing</div>
       </div>

       <div className="space-y-12">
         <div className="bg-white/[0.015] border border-white/5 rounded-[2rem] p-12 text-2xl md:text-3xl font-black leading-snug tracking-tight text-center min-h-[160px] flex items-center justify-center italic">
            "{currentSentence}"
         </div>

         <div className="relative">
           <textarea 
             autoFocus
             value={inputValue}
             onChange={handleInput}
             placeholder="위 문장을 오타 없이 똑같이 타이핑하세요..."
             className={`w-full bg-white/[0.03] border-2 rounded-[2.5rem] p-10 text-2xl font-bold outline-none focus:ring-0 resize-none min-h-[220px] transition-all duration-400 ${
                isCorrect ? 'border-white/10 focus:border-white/40' : 'border-red-950 bg-red-950/10'
             }`}
           />
           {!isCorrect && (
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="absolute top-6 right-8 text-red-500 text-[10px] font-black uppercase tracking-[0.3em]"
             >
               Miss-Inked
             </motion.div>
           )}
         </div>

         <div className="flex justify-between items-center text-[10px] font-black text-white/20 tracking-[0.4em] uppercase px-4">
            <span>Circuit {idx + 1} / {MENTOR_DATA.quotes.length}</span>
            <span className="flex items-center gap-2"><MousePointer2 size={12} /> Correct typing is required</span>
          </div>
       </div>
    </div>
  );
}

// v2.0 Stage 5: 감사 일기 (5가지)
function Stage5Gratitude({ onComplete }: { onComplete: (count: number) => void }) {
  const [items, setItems] = useState(['', '', '', '', '']);
  const count = items.filter(i => i.trim().length > 0).length;

  return (
    <div>
       <div className="text-center">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-black tracking-widest uppercase text-white/40 mb-12">Frequency Alignment</div>
       </div>

       <div className="space-y-6 mb-16 px-2">
          {items.map((val, i) => (
            <div key={i} className="flex gap-6 items-center">
               <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-black border transition-all duration-700 shrink-0 ${val.trim() ? 'bg-white border-white text-black shadow-xl' : 'border-white/10 text-white/10'}`}>
                 {i + 1}
               </div>
               <input 
                 value={val}
                 onChange={(e) => {
                   const newItems = [...items];
                   newItems[i] = e.target.value;
                   setItems(newItems);
                 }}
                 placeholder={["어떤 맛있는 식사를 했나요?", "누군가 나에게 미소지었나요?", "현재 몸 상태에서 기쁜 점은?", "오늘 하늘이 어땠나요?", "오늘 새롭게 깨달은 것은?"][i]}
                 className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl px-8 py-5 text-lg font-bold outline-none focus:bg-white/5 focus:border-white/30 transition-all placeholder:text-white/10"
               />
            </div>
          ))}
       </div>

       <div className="mb-14 px-4 text-center">
          <div className="flex justify-between text-[10px] font-black text-white/30 mb-5 uppercase tracking-[0.4em]">
             <span>Abundance Frequency</span>
             <span className="text-white">{(count/5)*100}%</span>
          </div>
          <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-white" 
               initial={{ width: 0 }} 
               animate={{ width: `${(count/5)*100}%` }} 
               transition={{ duration: 1 }}
             />
          </div>
       </div>

       <button 
          disabled={count < 5}
          onClick={() => onComplete(5)}
          className="w-full py-7 bg-white disabled:bg-white/5 disabled:text-white/5 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-2xl"
       >
         {count < 5 ? `남은 ${5-count}개의 풍요 주파수 채우기` : '풍요 주파수 고정 및 저장'}
       </button>
    </div>
  );
}

// v2.0 Stage 6: 현실 로그온
function Stage6Logon({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState('');

  return (
    <div>
       <div className="text-center px-4">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-black tracking-widest uppercase text-white/40 mb-12">Reality Integration</div>
         <p className="text-white text-3xl font-black mb-12 tracking-tighter leading-tight text-center">오늘 배운 원리를 삶에서 실천할<br/>1가지 구체적인 행동은 무엇인가요?</p>
       </div>

       <textarea 
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="예: 오늘 만나는 모든 사람에게 마음속으로 따뜻한 축복을 보낸다."
          className="w-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 text-2xl font-bold outline-none focus:border-white/40 transition-all resize-none min-h-[220px] mb-12 leading-snug placeholder:text-white/10"
       />

       <div className="flex flex-wrap justify-center gap-3 mb-20">
          {["잠들기 전 5분 상상", "누군가에게 칭찬 한마디", "불평 없는 하루 보내기", "심호흡 10회 실천"].map(hint => (
            <button 
               key={hint} 
               onClick={() => setText(hint)}
               className="px-6 py-2.5 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/30 hover:border-white/20 hover:text-white transition-all"
            >
              # {hint}
            </button>
          ))}
       </div>

       <button 
          disabled={text.trim().length < 5}
          onClick={onComplete}
          className="w-full py-8 bg-white text-black font-black text-2xl rounded-3xl shadow-[0_30px_60px_rgba(255,255,255,0.1)] hover:scale-[1.03] active:scale-[0.97] transition-all disabled:opacity-10"
       >
         ✦ 체험 훈련 수료
       </button>
    </div>
  );
}

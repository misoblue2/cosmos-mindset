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
  const [view, setView] = useState<'intro' | 'active' | 'complete'>('active'); // 간소화를 위해 바로 시작
  const [stats, setStats] = useState({ typing: 0, gratitude: 0, attendance: 1 });

  const nextStage = () => {
    if (stage < 6) setStage(stage + 1);
    else setView('complete');
  };

  return (
    <div className="min-h-screen bg-[#07070f] text-white overflow-x-hidden font-sans relative">
      {/* 별 배경 (CSS 애니메이션 대체) */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[680px] mx-auto px-6 py-12 pb-32">
        {/* 헤더 */}
        <header className="flex items-center justify-between mb-10">
          <div className="text-[10px] font-bold tracking-[0.3em] text-[#c8a84b] uppercase">✦ Cosmosmindset</div>
          <div className="bg-gradient-to-r from-[#c8a84b] to-[#ffd700] text-black text-[10px] font-black px-3 py-1 rounded-full">DAY 01</div>
        </header>

        {/* 진행률 바 */}
        <div className="mb-12">
          <div className="flex justify-between text-[10px] font-bold text-white/30 mb-3 tracking-widest uppercase">
            <span>Stage {stage} / 6 — {STAGE_NAMES[stage-1]}</span>
            <span>{Math.round(((stage-1)/6)*100)}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
               className="h-full bg-gradient-to-r from-[#c8a84b] to-[#ffd700]"
               initial={{ width: 0 }}
               animate={{ width: `${((stage-1)/6)*100}%` }}
               transition={{ duration: 0.8 }}
            />
          </div>
          
          {/* 스텝 인디케이터 */}
          <div className="flex justify-center gap-3 mt-8">
            {[1,2,3,4,5,6].map(i => (
              <div 
                key={i}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${
                  i < stage ? 'bg-[#c8a84b] border-[#c8a84b] text-black' :
                  i === stage ? 'border-[#c8a84b] text-[#c8a84b] shadow-[0_0_15px_rgba(200,168,75,0.3)]' :
                  'border-white/10 text-white/20'
                }`}
              >
                {i < stage ? <CheckCircle2 size={14} /> : i}
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
              className="bg-white/[0.04] border border-white/[0.08] rounded-[2.5rem] p-10 md:p-12 shadow-2xl backdrop-blur-xl"
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-8 animate-bounce">🏆</div>
              <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-[#c8a84b] to-[#ffd700] bg-clip-text text-transparent">Day 1 훈련 완료!</h2>
              <p className="text-white/40 leading-relaxed mb-12">
                오늘 당신의 뇌에 새로운 신경 회로 1개를 설치했습니다.<br/>
                꾸준함이 비범함을 만듭니다. 내일 Day 2에서 뵙겠습니다.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-2xl font-black text-[#c8a84b]">{stats.typing}</div>
                  <div className="text-[10px] text-white/30 font-bold uppercase mt-1">타이핑</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-2xl font-black text-[#c8a84b]">{stats.gratitude}</div>
                  <div className="text-[10px] text-white/30 font-bold uppercase mt-1">감사 항목</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-2xl font-black text-[#c8a84b]">{stats.attendance}</div>
                  <div className="text-[10px] text-white/30 font-bold uppercase mt-1">연속 출석</div>
                </div>
              </div>

              <Link href="/pricing" className="block w-full py-5 bg-[#c8a84b] text-black font-black text-lg rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_50px_rgba(200,168,75,0.3)]">
                Day 2 계속하기 — 플랜 선택
              </Link>
              
              <Link href="/training" className="block w-full mt-4 py-4 border border-white/10 text-white/50 font-bold rounded-2xl hover:bg-white/5">
                대시보드로 돌아가기
              </Link>
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
    // 4 (In) - 7 (Hold) - 8 (Out)
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
      <div className="text-[10px] font-black tracking-widest text-[#c8a84b] mb-2 uppercase">Stage 1 · 4분</div>
      <h3 className="text-2xl font-black mb-10">심호흡 명상</h3>
      
      <div className="flex flex-col items-center justify-center gap-12 py-10">
        <div className="relative flex items-center justify-center">
          {/* 가이드 원 */}
          <motion.div 
            className="absolute w-48 h-48 rounded-full border border-[#c8a84b]/20"
            animate={phase === 'inhale' ? { scale: 1.4 } : phase === 'exhale' ? { scale: 0.8 } : { scale: 1 }}
            transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 8 : 1, ease: "easeInOut" }}
          />
          {/* 중심 원 */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c8a84b]/40 to-[#ffd700]/10 flex items-center justify-center z-10">
            <span className="text-4xl font-mono font-black">{count || '—'}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[#c8a84b] text-xl font-bold tracking-widest uppercase">
            {phase === 'ready' ? '준비 되셨나요?' : 
             phase === 'inhale' ? '코로 들이마십니다 (4초)' :
             phase === 'hold' ? '멈춥니다 (7초)' : '입으로 내뱉습니다 (8초)'}
          </div>
          <div className="text-white/20 text-sm font-bold uppercase">{round} / 4 세트</div>
        </div>

        {phase === 'ready' && (
          <button onClick={start} className="w-full py-5 bg-[#c8a84b] text-black font-black text-xl rounded-2xl flex items-center justify-center gap-3">
             <PlayCircle /> 훈련 시작
          </button>
        )}
      </div>
    </div>
  );
}

function Stage2Meditation({ onComplete }: { onComplete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(120); // 2분으로 단축 (테스트용)
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
      <div className="text-[10px] font-black tracking-widest text-[#c8a84b] mb-2 uppercase">Stage 2 · 4분</div>
      <h3 className="text-2xl font-black mb-10">432Hz 힐링 명상</h3>

      <div className="py-8 flex flex-col items-center gap-12">
        <motion.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
           transition={{ duration: 3, repeat: Infinity }}
           className="w-32 h-32 rounded-full bg-blue-500/10 border-2 border-blue-500/30 flex items-center justify-center"
        >
          <Music size={40} className="text-blue-400" />
        </motion.div>

        <div className="space-y-4 max-w-sm">
           <AnimatePresence mode="wait">
             <motion.p 
               key={quoteIdx}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="text-xl font-medium leading-relaxed italic"
             >
               "{MENTOR_DATA.meditation_affirmations[quoteIdx]}"
             </motion.p>
           </AnimatePresence>
           <p className="text-white/20 text-xs tracking-tighter uppercase font-bold">자연의 기본 주파수 432Hz / 바이노럴 비트</p>
        </div>

        <div className="text-5xl font-mono font-black text-[#c8a84b]">
          {formatTime(timeLeft)}
        </div>

        {!isActive && (
          <button onClick={() => setIsActive(true)} className="w-full py-5 bg-[#c8a84b] text-black font-black text-xl rounded-2xl">
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
       <div className="text-[10px] font-black tracking-widest text-[#c8a84b] mb-2 uppercase">Stage 3 · 2분</div>
       <h3 className="text-2xl font-black mb-10">지혜 주입</h3>

       <div className="min-h-[250px] flex flex-col items-center justify-center gap-12 py-10">
          <Quote className="text-white/10" size={48} />
          <AnimatePresence mode="wait">
            <motion.div 
               key={idx}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="text-2xl md:text-3xl font-black leading-tight tracking-tight"
            >
              {MENTOR_DATA.quotes[idx]}
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2">
             {MENTOR_DATA.quotes.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-[#c8a84b] w-4' : 'bg-white/10'}`} />
             ))}
          </div>
       </div>

       <button 
          onClick={() => {
            if (idx < MENTOR_DATA.quotes.length - 1) setIdx(idx + 1);
            else onComplete();
          }} 
          className="w-full py-5 bg-[#c8a84b] text-black font-black text-xl rounded-2xl flex items-center justify-center gap-2"
        >
          {idx === MENTOR_DATA.quotes.length - 1 ? '새기기 시작하기' : '다음 지혜'} <ChevronRight size={20} />
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
         <div className="text-[10px] font-black tracking-widest text-[#c8a84b] mb-2 uppercase">Stage 4 · 6분</div>
         <h3 className="text-2xl font-black mb-8 text-center">신경 필사</h3>
       </div>

       <div className="space-y-8">
         <div className="bg-white/5 border border-[#c8a84b]/20 rounded-2xl p-6 text-xl md:text-2xl font-bold leading-relaxed text-center min-h-[100px] flex items-center justify-center">
            {currentSentence}
         </div>

         <div className="relative">
           <textarea 
             autoFocus
             value={inputValue}
             onChange={handleInput}
             placeholder="위 문장을 똑같이 입력하세요..."
             className={`w-full bg-white/5 border-2 rounded-2xl p-6 text-xl outline-none focus:ring-0 resize-none min-h-[120px] transition-colors ${
                isCorrect ? 'border-white/10 focus:border-[#c8a84b]/50' : 'border-red-500/50 bg-red-500/5'
             }`}
           />
           {!isCorrect && <div className="absolute top-2 right-4 text-red-500 text-[10px] font-bold uppercase">오타 발생</div>}
         </div>

         <div className="flex justify-between items-center text-[10px] font-bold text-white/30 tracking-widest uppercase">
            <span>문장 {idx + 1} / {MENTOR_DATA.quotes.length}</span>
            <span>복사 붙여넣기는 금지됩니다</span>
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
         <div className="text-[10px] font-black tracking-widest text-[#c8a84b] mb-2 uppercase">Stage 5 · 2분</div>
         <h3 className="text-2xl font-black mb-8">감사 일기 5가지</h3>
       </div>

       <div className="space-y-4 mb-10">
          {items.map((val, i) => (
            <div key={i} className="flex gap-4 items-center">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black border-2 shrink-0 transition-all ${val.trim() ? 'bg-[#c8a84b] border-[#c8a84b] text-black' : 'border-white/5 text-white/20'}`}>
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
                 className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c8a84b]/30 transition-colors"
               />
            </div>
          ))}
       </div>

       <div className="mb-8">
          <div className="flex justify-between text-[10px] font-black text-[#c8a84b] mb-2 uppercase tracking-widest">
             <span>풍요 주파수 달성도</span>
             <span>{(count/5)*100}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
             <motion.div className="h-full bg-gradient-to-r from-purple-500 to-[#c8a84b]" initial={{ width: 0 }} animate={{ width: `${(count/5)*100}%` }} />
          </div>
       </div>

       <button 
          disabled={count < 5}
          onClick={() => onComplete(5)}
          className="w-full py-5 bg-[#c8a84b] disabled:bg-white/5 disabled:text-white/20 text-black font-black text-xl rounded-2xl transition-all"
       >
         {count < 5 ? `${5-count}통로 더 발견하기` : '감사 에너지 저장'}
       </button>
    </div>
  );
}

function Stage6Logon({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState('');

  return (
    <div>
       <div className="text-center">
         <div className="text-[10px] font-black tracking-widest text-[#c8a84b] mb-2 uppercase">Stage 6 · 2분</div>
         <h3 className="text-2xl font-black mb-4 text-center">현실 로그온</h3>
         <p className="text-white/40 text-sm mb-10 leading-relaxed text-center">오늘 배운 원리를 삶에서 실천할 1가지 구체적인 행동을 입력하세요.</p>
       </div>

       <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="예: 오늘 만나는 모든 사람에게 마음속으로 축복의 인사를 건네겠다."
          className="w-full bg-white/5 border-2 border-[#c8a84b]/20 rounded-3xl p-8 text-lg outline-none focus:border-[#c8a84b]/50 transition-colors resize-none min-h-[180px] mb-8 leading-relaxed"
       />

       <div className="flex flex-wrap gap-2 mb-10">
          {["잠들기 전 5분 상상", "칭찬 한 마디", "불평 없이 지내기", "심호흡 10회"].map(hint => (
            <button 
               key={hint} 
               onClick={() => setText(hint)}
               className="px-4 py-2 rounded-full border border-white/5 text-[10px] font-bold text-white/30 hover:border-[#c8a84b]/30 hover:text-[#c8a84b] transition-all"
            >
              {hint}
            </button>
          ))}
       </div>

       <button 
          disabled={text.trim().length < 5}
          onClick={onComplete}
          className="w-full py-5 bg-gradient-to-r from-[#c8a84b] to-[#ffd700] text-black font-black text-xl rounded-2xl shadow-[0_0_30px_rgba(200,168,75,0.2)] disabled:opacity-20"
       >
         ✦ 훈련 완료 · Day 1 실현
       </button>
    </div>
  );
}

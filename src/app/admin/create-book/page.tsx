"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Youtube, FileText, Settings, PlayCircle, Layers, CheckCircle2, Lock, Download, Database } from 'lucide-react';

export default function AdminCreateBookPage() {
  const [phase, setPhase] = useState<1|2|3|4|5>(1);
  const [chapters, setChapters] = useState([
    { id: 1, title: '도입: 고통의 임계점과 각성', status: 'completed' },
    { id: 2, title: '심층: 뇌에 파편화된 잠재의식 해킹', status: 'generating' },
    { id: 3, title: '거장의 지혜: 조셉 머피의 프로그래밍', status: 'locked' },
    { id: 4, title: '실천: 현실을 구부리는 21일 수동 파동', status: 'locked' },
    { id: 5, title: '워크북: 당신의 확언을 디자인하라', status: 'locked' },
  ]);

  return (
    <div className="min-h-screen bg-[#050510] text-white flex">
      {/* 관리자 사이드바 */}
      <div className="w-64 bg-[#0a0a0f] border-r border-white/10 hidden lg:block shrink-0 h-screen sticky top-0">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="text-xl font-black flex items-center gap-2 mb-2"><span className="text-2xl">🌌</span> 우주마인드스쿨</Link>
          <div className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded inline-block">가치토커 전용 (ADMIN)</div>
        </div>
        <div className="p-4 space-y-2">
          <button className="w-full text-left px-4 py-3 bg-white/10 text-white font-bold rounded-xl flex items-center gap-3">
            <Database size={18} className="text-blue-400" /> 책 생성 파이프라인
          </button>
          <button className="w-full text-left px-4 py-3 text-white/50 hover:text-white hover:bg-white/5 font-bold rounded-xl flex items-center gap-3 transition-colors">
            <Users size={18} /> 구독자 관리
          </button>
          <button className="w-full text-left px-4 py-3 text-white/50 hover:text-white hover:bg-white/5 font-bold rounded-xl flex items-center gap-3 transition-colors">
            <CreditCard size={18} /> 결제 및 정산 내역
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <header className="h-16 px-8 bg-[#050510]/80 backdrop-blur border-b border-white/10 flex items-center justify-between sticky top-0 z-50">
          <h2 className="font-black text-xl">자동 출판 솔루션</h2>
          <div className="flex gap-2">
            {[1,2,3,4,5].map(p => (
              <div key={p} className={`w-8 h-2 rounded-full ${p <= phase ? 'bg-amber-500' : 'bg-white/10'}`} />
            ))}
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-8 py-12">
          
          <AnimatePresence mode="wait">
            {/* PHASE 1: 입력 */}
            {phase === 1 && (
              <motion.div key="p1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="mb-12">
                  <span className="text-amber-500 font-bold text-sm tracking-widest mb-2 block">PHASE 1</span>
                  <h1 className="text-4xl font-black">소스 데이터 입력</h1>
                  <p className="text-white/50 mt-2">유튜브 영상 URL이나 스크립트를 입력하여 책 뼈대를 자동 생성합니다.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2">책 제목 (가제)</label>
                    <input type="text" placeholder="예: 잠재의식의 비밀" className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2">유튜브 원본 URL</label>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-[#111116] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                        <Youtube size={18} className="text-red-500" />
                        <input type="text" placeholder="https://youtube.com/watch?v=..." className="bg-transparent outline-none w-full" />
                      </div>
                      <button className="px-6 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors whitespace-nowrap">스크립트 자동 추출</button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2">또는 직접 텍스트 입력</label>
                    <textarea placeholder="스크립트 내용..." rows={8} className="w-full bg-[#111116] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-amber-500 resize-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-6 bg-[#111116] border border-white/10 hover:border-amber-500 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-colors">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/50 group-hover:bg-amber-500/20 group-hover:text-amber-500"><FileText /></div>
                      <h4 className="font-bold">100페이지 요약본</h4>
                    </button>
                    <button className="p-6 bg-amber-500/10 border border-amber-500 rounded-2xl flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500"><Layers /></div>
                      <h4 className="font-bold text-amber-500">200페이지 마스터본 (워크북 포함)</h4>
                    </button>
                  </div>
                </div>

                <button onClick={() => setPhase(2)} className="w-full py-4 mt-8 bg-amber-500 text-black font-black text-lg rounded-xl hover:bg-amber-400 transition-colors shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                  목차(TOC) AI 구조화 시작
                </button>
              </motion.div>
            )}

            {/* PHASE 3: 챕터 생성 상태 (PHASE 2 생략하고 바로 보여줌) */}
            {phase === 2 && (
              <motion.div key="p3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="mb-12">
                  <span className="text-amber-500 font-bold text-sm tracking-widest mb-2 block">PHASE 3</span>
                  <h1 className="text-4xl font-black">AI 챕터 순차 집필</h1>
                  <p className="text-white/50 mt-2">각 챕터가 5단계 구조(도입-심층-거장-실천-워크북)로 자동 확장 집필됩니다. 토큰 제한 방지를 위해 순차 병렬 처리됩니다.</p>
                </div>

                <div className="space-y-4">
                  {chapters.map((ch, i) => (
                    <div key={ch.id} className={`p-6 rounded-2xl border ${
                      ch.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30' :
                      ch.status === 'generating' ? 'bg-amber-500/10 border-amber-500/50' : 'bg-white/5 border-white/10 opacity-50'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          {ch.status === 'completed' && <CheckCircle2 className="text-emerald-500" size={24} />}
                          {ch.status === 'generating' && <div className="w-6 h-6 border-2 border-amber-500 border-t-amber-500/30 rounded-full animate-spin" />}
                          {ch.status === 'locked' && <Lock className="text-white/30" size={24} />}
                          <h3 className="font-black text-lg">챕터 {i+1}. {ch.title}</h3>
                        </div>
                        {ch.status === 'completed' && <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">완료됨 (12p)</span>}
                        {ch.status === 'generating' && <span className="px-3 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full animate-pulse">집필 중...</span>}
                      </div>

                      {ch.status === 'completed' && (
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold text-white rounded-lg transition-colors">내용 보기/수정</button>
                          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold text-white rounded-lg transition-colors flex items-center gap-2"><Download size={14} /> PDF 시안</button>
                        </div>
                      )}
                      
                      {ch.status === 'generating' && (
                        <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 w-2/3 h-full rounded-full relative">
                            <div className="absolute inset-0 bg-white/20 animate-[loading_1s_ease-in-out_infinite]" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button onClick={() => setPhase(4)} className="w-full py-4 mt-8 border-2 border-white/10 text-white font-black text-lg rounded-xl hover:bg-white/5 transition-colors">
                  [개발용] 병합 단계로 건너뛰기
                </button>
              </motion.div>
            )}

            {phase === 4 && (
              <motion.div key="p4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-8">
                  <Database size={48} />
                </div>
                <h1 className="text-4xl font-black mb-4">전체 병합 및 출판 파일 생성</h1>
                <p className="text-white/50 max-w-lg mb-8">표지, 목차, 각 챕터 본문, 판권지를 합쳐 교보문고 및 부크크에 제출 가능한 최종 A5 출판용 파일을 만들 준비가 되었습니다.</p>
                
                <button className="px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center gap-3">
                  <Settings className="animate-spin-slow" /> 파이프라인 가동 (전체 병합 시작)
                </button>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// 아이콘 폴백 - UI 렌더링 에러 방지
const Users = Database;
const CreditCard = Database;

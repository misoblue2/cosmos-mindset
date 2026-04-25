"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, Save, Sparkles, BookOpen, AlertTriangle, PenTool, LayoutTemplate, Settings2 } from 'lucide-react';

const CHAPTERS = [
  { id: 1, title: '프롤로그: 마음의 스위치를 켜다', status: 'completed' },
  { id: 2, title: '당신의 잠재의식은 명령만을 기다린다', status: 'completed' },
  { id: 3, title: '[AI 보강] 뇌신경 회로의 물리적 변화 기전', status: 'editing' },
  { id: 4, title: '[추가] 가치토커 확언 워크북 파트', status: 'pending' },
  { id: 5, title: '결론: 내가 창조한 현실로의 도약', status: 'pending' }
];

export default function BookEditorPage() {
  const [activeChapter, setActiveChapter] = useState(3);
  const [content, setContent] = useState(`뇌과학적으로 잠재의식을 재프로그래밍한다는 것은 결국 뉴런 간의 새로운 시냅스 연결을 구축하는 과정입니다. 기존의 원고에서는 단순히 '긍정적으로 생각하라'고 명시되어 있었지만, 우주마인드스쿨 AI는 여기에 구체적인 양자역학 및 신경가소성 이론을 결합하여 독자의 물리적 행동 변화를 촉구합니다. 

당신의 의식이 부정적인 피드백 루프에 빠져있을 때, 잠재의식은 그것을 명령으로 인식하여 파괴적인 현실을 인쇄하기 시작합니다. 

... [작성중인 본문 내용] ...`);

  return (
    <div className="min-h-screen bg-[#111116] text-white flex flex-col h-screen overflow-hidden">
      {/* 탑바 */}
      <header className="h-16 flex items-center justify-between px-6 bg-[#0a0a0f] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/my-book/upload" className="text-white/40 hover:text-white transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div className="font-black text-lg">우주마인드스쿨 AI 에디터</div>
          <div className="px-3 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full border border-amber-500/30 flex items-center gap-1">
            <Sparkles size={12} /> 200페이지 마스터 플랜
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/50 flex items-center gap-2">마지막 자동저장: 1분 전 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /></span>
          <Link href="/my-book/download" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-black rounded-lg transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            최종 파일 생성하기
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 좌측: 목차 네비게이션 */}
        <div className="w-80 bg-[#0a0a0f] border-r border-white/10 flex flex-col hidden md:flex shrink-0">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-bold flex items-center gap-2 text-white/80"><BookOpen size={16} /> 프로젝트 목차</h3>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-2/5 h-full" />
            </div>
            <p className="text-[10px] text-white/50 mt-1 text-right">진행률 40% (2/5 챕터)</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {CHAPTERS.map(ch => (
              <button 
                key={ch.id} onClick={() => setActiveChapter(ch.id)}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                  activeChapter === ch.id ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white/80'
                }`}
              >
                {ch.status === 'completed' && <CheckCircle size={14} className="text-emerald-500 shrink-0" />}
                {ch.status === 'editing' && <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-500 border-t-transparent animate-spin shrink-0" />}
                {ch.status === 'pending' && <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 shrink-0" />}
                <span className="text-sm font-medium line-clamp-1 flex-1">{ch.title}</span>
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-white/10">
             <button className="w-full py-2 border border-white/10 rounded-lg text-xs font-bold text-white/60 hover:bg-white/5">+ 새 챕터 수동 추가</button>
          </div>
        </div>

        {/* 중앙: 에디터 */}
        <div className="flex-1 flex flex-col bg-[#111116] relative">
          <div className="flex-1 overflow-y-auto p-8 md:p-16">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-black mb-8 pb-4 border-b border-white/10 outline-none" contentEditable>
                {CHAPTERS.find(c => c.id === activeChapter)?.title}
              </h1>
              <textarea 
                className="w-full h-[600px] bg-transparent resize-none outline-none text-white/80 leading-[1.8] text-lg placeholder:text-white/20"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="내용을 입력하세요..."
              />
            </div>
          </div>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full shadow-2xl">
             <button className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors" title="이전 챕터"><ChevronLeft size={18} /></button>
             <span className="text-xs font-bold px-4 border-x border-white/10">{activeChapter} / 5</span>
             <button className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors" title="다음 챕터"><ChevronLeft size={18} className="rotate-180" /></button>
          </div>
        </div>

        {/* 우측: AI 어시스턴트 컨트롤 창 */}
        <div className="w-72 bg-[#0a0a0f] border-l border-white/10 flex flex-col hidden lg:flex shrink-0">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-bold flex items-center gap-2 text-amber-400"><Wand2 size={16} /> AI 어시스턴트</h3>
          </div>
          <div className="p-4 space-y-4 flex-1">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <h4 className="text-xs font-black text-amber-500 mb-2">분량 보강 추천</h4>
              <p className="text-[10px] text-white/60 mb-3">현재 챕터 분량이 200페이지 목표치에 부족합니다. 이론 및 예시를 추가할까요?</p>
              <button className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs font-bold rounded-lg transition-colors border border-amber-500/30">
                AI로 내용 확장하기 (약 3p 추가)
              </button>
            </div>

            <div className="space-y-2">
              <button className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl flex items-center gap-3 transition-colors text-sm text-left">
                <LayoutTemplate size={16} className="text-blue-400 shrink-0" />
                <div>
                  <div className="font-bold">워크북 섹션 추가</div>
                  <div className="text-[10px] text-white/40">독자 확언 페이지 템플릿</div>
                </div>
              </button>
              <button className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl flex items-center gap-3 transition-colors text-sm text-left">
                <PenTool size={16} className="text-purple-400 shrink-0" />
                <div>
                  <div className="font-bold">어조 변경 (가치토커 톤)</div>
                  <div className="text-[10px] text-white/40">더 확고하고 직설적인 문장으로</div>
                </div>
              </button>
              <button className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl flex items-center gap-3 transition-colors text-sm text-left">
                <Sparkles size={16} className="text-yellow-400 shrink-0" />
                <div>
                  <div className="font-bold">거장의 명언 삽입</div>
                  <div className="text-[10px] text-white/40">조셉 머피 등 멘토 인용구 추천</div>
                </div>
              </button>
            </div>
          </div>
          <div className="p-4 border-t border-white/10">
             <button className="w-full py-3 bg-white hover:bg-gray-200 text-black font-black rounded-xl transition-colors flex items-center justify-center gap-2">
               <Save size={16} /> 이 챕터 저장
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 아이콘 폴백용 임시 임포트 방지 컴포넌트 내부에 단순 정의
const Wand2 = Sparkles;
const CheckCircle = CheckCircle2;
import { CheckCircle as CheckCircle2 } from 'lucide-react';

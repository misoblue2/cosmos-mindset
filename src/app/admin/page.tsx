"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Video, Youtube, FileText, Settings, Book, 
  Trash2, ChevronRight, Sparkles, CheckCircle2, Lock,
  Zap, PenTool, Globe, Save, Download, Eye, Layers, 
  ArrowRight, ShieldCheck, AlertCircle, RefreshCw
} from 'lucide-react';
import { jsPDF } from 'jspdf';

/**
 * [코스믹마인드 관리자 모드] 영상 -> 전자책 자동 변환기 v1.0
 * Antigravity High-End B&W Re-design
 */

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('upload');
  
  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white flex font-sans">
      {/* 사이드바 */}
      <aside className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-3xl sticky top-0 h-screen flex flex-col p-8 z-50">
        <div className="mb-12">
          <div className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase mb-2">Cosmosmindset</div>
          <div className="text-xl font-black tracking-tighter">ADMIN CONSOLE</div>
        </div>

        <nav className="flex-grow space-y-2">
          <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-4 px-3">E-Book Generator</div>
          <NavItem active={activePage === 'upload'} onClick={() => setActivePage('upload')} icon={<Video size={18} />} label="영상 업로드" />
          <NavItem active={activePage === 'editor'} onClick={() => setActivePage('editor')} icon={<PenTool size={18} />} label="챕터 편집" />
          <NavItem active={activePage === 'preview'} onClick={() => setActivePage('preview')} icon={<Eye size={18} />} label="미리보기" />
          <NavItem active={activePage === 'export'} onClick={() => setActivePage('export')} icon={<Download size={18} />} label="내보내기" />
          
          <div className="pt-8 text-[9px] font-black text-white/20 uppercase tracking-widest mb-4 px-3">Management</div>
          <NavItem active={activePage === 'library'} onClick={() => setActivePage('library')} icon={<Book size={18} />} label="도서 라이브러리" />
          <NavItem active={activePage === 'settings'} onClick={() => setActivePage('settings')} icon={<Settings size={18} />} label="시스템 설정" />
        </nav>

        <div className="pt-8 border-t border-white/5 opacity-30">
          <div className="text-[10px] font-medium leading-relaxed">
            Admin v2.0<br/>
            Neural Modification Engine
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-grow p-12 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activePage === 'upload' && <UploadPage key="upload" onNext={() => setActivePage('editor')} />}
          {activePage === 'editor' && <EditorPage key="editor" onNext={() => setActivePage('preview')} />}
          {activePage === 'preview' && <PreviewPage key="preview" onNext={() => setActivePage('export')} />}
          {activePage === 'export' && <ExportPage key="export" />}
          {activePage === 'settings' && <SettingsPage key="settings" />}
          {activePage === 'library' && <LibraryPage key="library" />}
        </AnimatePresence>
      </main>

      {/* 토스트 알림 컨테이너 (실제 구현 시 필요) */}
    </div>
  );
}

// ── 컴포넌트: 네비게이션 아이템 ──
function NavItem({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
        active 
          ? 'bg-white text-black font-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
          : 'text-white/40 hover:text-white hover:bg-white/5 font-medium'
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
      {active && <motion.div layoutId="nav-glow" className="ml-auto w-1 h-4 bg-black rounded-full" />}
    </button>
  );
}

// ── 컴포넌트: 관리자 로그인 ──
function AdminLogin({ onLogin }: any) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === 'selina' && pw === 'cosmosmind2025') {
      onLogin();
    } else {
      setError('인증 정보가 올바르지 않습니다.');
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-black border border-white/10 rounded-[3rem] p-12 shadow-2xl text-center"
      >
        <div className="text-white/20 font-black tracking-[0.5em] text-[10px] mb-4 uppercase">Cosmic Mindset</div>
        <h1 className="text-3xl font-black mb-2 tracking-tighter">OWNER LOGIN</h1>
        <p className="text-white/40 text-sm mb-12">시스템 접근을 위해 관리자 인증이 필요합니다.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="관리자 아이디" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white transition-all text-center font-bold text-white"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="관리자 인증키" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white transition-all text-center tracking-widest font-black text-white"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-red-500 text-xs font-bold"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            className="w-full bg-white text-black font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl mt-4"
          >
            ENTER SYSTEM
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ── 페이지: 업로드 ──
function UploadPage({ onNext }: any) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const startAnalysis = () => {
    setIsProcessing(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(onNext, 1000);
      }
    }, 100);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <header className="mb-16">
        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
          <Zap size={14} className="text-white" /> Step 01. Source Injection
        </div>
        <h2 className="text-6xl font-black tracking-tighter">영상 → 전자책 변환</h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="p-12 bg-white/[0.03] border border-white/10 rounded-[3rem] hover:border-white/20 transition-all group cursor-pointer text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-2xl">
                <Upload size={32} />
              </div>
              <h3 className="text-2xl font-black mb-3">직접 업로드</h3>
              <p className="text-white/40 text-sm leading-relaxed">MP4, MOV, AVI (최대 500MB)<br/>AI가 음성을 추출하여 텍스트로 변환합니다.</p>
            </div>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>

          <div className="p-12 bg-white/[0.03] border border-white/10 rounded-[3rem] space-y-6">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <Youtube size={28} className="text-red-500" /> 유튜브 연동
            </h3>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="https://www.youtube.com/watch?v=..." 
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/40 transition-all text-sm font-medium"
              />
              <button 
                onClick={startAnalysis}
                className="px-8 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm"
              >
                분석 시작
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[3rem] space-y-8">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
               <Layers size={20} /> 전자책 엔진 설정
            </h3>
            
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <button className="p-8 border-2 border-white rounded-[2.5rem] bg-white/5 text-left">
                  <div className="text-3xl mb-4 text-white">📗</div>
                  <div className="font-black text-lg">100페이지</div>
                  <div className="text-[10px] text-white/40 font-black tracking-widest uppercase mt-2">Essential Edition</div>
                </button>
                <button className="p-8 border border-white/10 rounded-[2.5rem] bg-black text-left opacity-40 hover:opacity-100 transition-all">
                  <div className="text-3xl mb-4">📘</div>
                  <div className="font-black text-lg">200페이지</div>
                  <div className="text-[10px] text-white/40 font-black tracking-widest uppercase mt-2">Master Edition</div>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-white/20 tracking-widest ml-1">Author Name</label>
                  <input type="text" placeholder="정셀리나" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase text-white/20 tracking-widest ml-1">Category</label>
                  <input type="text" placeholder="자기계발" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none text-sm" />
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isProcessing && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-10 bg-white border border-black rounded-[3rem] text-black">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center animate-spin">
                      <RefreshCw size={24} />
                    </div>
                    <div>
                      <div className="font-black text-xl italic tracking-tighter">ANALYZING ENGINE...</div>
                      <div className="text-[10px] font-black uppercase tracking-widest opacity-50">Transcribing voice & structure</div>
                    </div>
                  </div>
                  <div className="text-3xl font-black italic tracking-tighter">{progress}%</div>
                </div>
                <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-black"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ── 페이지: 에디터 (챕터 관리) ──
function EditorPage({ onNext }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <header className="mb-16 flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-4">Step 02. Structure Sculpting</div>
          <h2 className="text-6xl font-black tracking-tighter">챕터 구성 및 집필</h2>
        </div>
        <button 
          onClick={onNext}
          className="px-10 py-5 bg-white text-black font-black rounded-3xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
        >
          미리보기 확인 <ArrowRight size={20} />
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="xl:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
          {[1,2,3,4,5,6,7,8].map((i) => (
            <div key={i} className={`p-8 bg-white/[0.03] border transition-all rounded-[2rem] flex items-center gap-6 group cursor-pointer ${i === 1 ? 'border-white shadow-2xl' : 'border-white/5 opacity-50 hover:opacity-100'}`}>
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black italic text-xl group-hover:bg-white group-hover:text-black transition-all">
                {String(i).padStart(2, '0')}
              </div>
              <div className="flex-grow">
                <div className="text-sm font-black tracking-tight mb-1">챕터 {i} 제목입니다</div>
                <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">12 Pages · AI Drafted</div>
              </div>
            </div>
          ))}
          <button className="w-full py-6 border border-dashed border-white/20 rounded-[2rem] text-white/30 text-xs font-black uppercase tracking-widest hover:border-white/40 hover:text-white transition-all">
            + Add New Chapter
          </button>
        </div>

        <div className="xl:col-span-2 space-y-8">
          <div className="p-12 bg-white/[0.03] border border-white/10 rounded-[3rem] space-y-12">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-white/20 tracking-widest">Chapter Title</label>
              <input type="text" className="w-full bg-transparent border-b border-white/10 text-4xl font-black outline-none focus:border-white transition-all pb-4 tracking-tighter" placeholder="챕터 제목을 입력하세요" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-black uppercase text-white/20 tracking-widest">Body Composition</label>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black text-white/60 hover:bg-white hover:text-black transition-all uppercase tracking-tighter">🤖 AI 2배 확장</button>
                  <button className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black text-white/60 hover:bg-white hover:text-black transition-all uppercase tracking-tighter">📚 사례 추가</button>
                  <button className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black text-white/60 hover:bg-white hover:text-black transition-all uppercase tracking-tighter">✏️ 실습 설계</button>
                </div>
              </div>
              <textarea 
                className="w-full bg-white/[0.02] border border-white/5 rounded-3xl p-10 h-[500px] outline-none focus:border-white/20 transition-all leading-relaxed text-lg font-medium custom-scrollbar"
                placeholder="AI가 생성한 초안이 이곳에 표시됩니다. 직접 편집하거나 확장을 요청하세요."
              />
            </div>

            <div className="flex justify-between items-center text-white/30 text-[10px] font-black uppercase tracking-widest pt-8 border-t border-white/5">
               <div className="flex gap-8">
                 <span>Words: 1,420</span>
                 <span>Est. Pages: 6</span>
               </div>
               <button className="flex items-center gap-2 hover:text-white transition-colors">
                 <Save size={12} /> Save Progress
               </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── 페이지: 미리보기 ──
function PreviewPage({ onNext }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="mb-16 flex items-end justify-between">
        <div>
          <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-4">Step 03. Visual Manifestation</div>
          <h2 className="text-6xl font-black tracking-tighter">최종 검수</h2>
        </div>
        <button 
          onClick={onNext}
          className="px-10 py-5 bg-white text-black font-black rounded-3xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
        >
          데이터 내보내기 <ArrowRight size={20} />
        </button>
      </header>

      <div className="bg-white text-black p-16 md:p-32 rounded-[5rem] shadow-2xl max-w-4xl mx-auto min-h-[1000px] font-serif ring-1 ring-black/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 text-[12px] font-black tracking-widest opacity-20 rotate-90 origin-top-right">COSMOS MINDSET PUBLICATION</div>
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mt-32 mb-64">
            <div className="w-16 h-px bg-black mx-auto mb-12 opacity-20" />
            <h1 className="text-7xl font-bold italic tracking-tighter mb-8 leading-none">생각의 정원</h1>
            <p className="text-xl italic opacity-40">정셀리나 지음</p>
          </div>

          <div className="space-y-16">
            <div className="text-[12px] font-bold tracking-[0.4em] uppercase mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-black" /> CONTENTS
            </div>
            <div className="space-y-6">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="flex items-end justify-between group cursor-default">
                  <div className="text-xl font-bold leading-none">{i}. 챕터 제목 샘플입니다</div>
                  <div className="flex-grow border-b border-dotted border-black/20 mx-4" />
                  <div className="font-bold opacity-40">{i * 12}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── 페이지: 내보내기 ──
function ExportPage() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
      <header className="mb-16">
        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-4">Final Step. Distribution</div>
        <h2 className="text-6xl font-black tracking-tighter">내보내기 및 등록</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[4rem] text-center space-y-8 flex flex-col items-center">
          <div className="text-6xl mb-4">📄</div>
          <div>
            <h3 className="text-2xl font-black mb-2">프리미엄 PDF</h3>
            <p className="text-white/40 text-sm">우주서재 판매 및 인쇄용 고해상도 파일</p>
          </div>
          <button className="mt-auto w-full py-5 bg-white text-black font-black rounded-3xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-2">
            <Download size={18} /> DOWNLOAD PDF
          </button>
        </div>

        <div className="p-10 bg-white/[0.03] border border-white/10 rounded-[4rem] text-center space-y-8 flex flex-col items-center">
          <div className="text-6xl mb-4">📚</div>
          <div>
            <h3 className="text-2xl font-black mb-2">우주서재 즉시 등록</h3>
            <p className="text-white/40 text-sm">입고 정보 설정 후 즉시 스토어 노출</p>
          </div>
          <div className="w-full space-y-4">
            <input type="number" placeholder="판매가 (15,000)" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white/40" />
            <button className="w-full py-5 bg-white/10 text-white font-black rounded-3xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
               PUBLISH STORE
            </button>
          </div>
        </div>

        <div className="p-10 bg-white/[0.03] border border-white/20 rounded-[4rem] text-center space-y-8 flex flex-col items-center ring-2 ring-white/10">
          <div className="text-6xl mb-4 text-green-500">✓</div>
          <div>
            <h3 className="text-2xl font-black mb-2">훈련 코스 등록</h3>
            <p className="text-white/40 text-sm">30일 훈련 챌린지 텍스트 데이터로 변환</p>
          </div>
          <button className="mt-auto w-full py-5 bg-green-500 text-white font-black rounded-3xl hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-[0_20px_40px_rgba(34,197,94,0.3)]">
            <Zap size={18} /> REGISTER TRAINING
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── 페이지: 라이브러리 (기존 도서 관리 포함) ──
function LibraryPage() {
  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-5xl font-black tracking-tighter">전자책 라이브러리</h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1,2,3,4].map(i => (
          <div key={i} className="group relative">
            <div className="aspect-[3/4] bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden group-hover:border-white/40 transition-all p-8 flex flex-col shadow-2xl">
              <div className="text-[10px] font-black text-white/20 mb-4 tracking-widest uppercase">ID: CM-BOOK-{i}</div>
              <div className="flex-grow flex items-center justify-center">
                <Book className="text-white/10 group-hover:text-white/40 transition-all duration-700" size={80} />
              </div>
              <div className="mt-auto">
                <h4 className="font-black text-lg mb-1">도서 제목 샘플 {i}</h4>
                <div className="text-[10px] font-black text-white/30 uppercase tracking-widest">2026.04.26 · 128P</div>
              </div>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all flex gap-2">
               <button className="p-3 bg-white text-black rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"><Eye size={16} /></button>
               <button className="p-3 bg-red-500 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 페이지: 설정 ──
function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-3xl">
      <header className="mb-12">
        <h2 className="text-5xl font-black tracking-tighter mb-4">시스템 설정</h2>
        <p className="text-white/40 font-medium italic">AI 엔진 및 API 통신 환경을 관리합니다.</p>
      </header>

      <div className="space-y-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-white/30 font-black text-[10px] uppercase tracking-widest mb-2">
            <ShieldCheck size={16} /> API Authentication
          </div>
          <div className="space-y-6 bg-white/[0.03] p-10 rounded-[3rem] border border-white/10">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-white/60 ml-1">Anthropic Claude API Key</label>
              <input type="password" placeholder="sk-ant-..." className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white transition-all font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-white/60 ml-1">OpenAI Whisper Key (Optional)</label>
              <input type="password" placeholder="sk-..." className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-white transition-all font-mono" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-3 text-white/30 font-black text-[10px] uppercase tracking-widest mb-2">
            <Lock size={16} /> Access Security
          </div>
          <div className="space-y-6 bg-white/[0.03] p-10 rounded-[3rem] border border-white/10">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-white/60 ml-1">Admin ID</label>
                <input type="text" defaultValue="selina" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-white/60 ml-1">New Password</label>
                <input type="password" placeholder="********" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 outline-none" />
              </div>
            </div>
          </div>
        </section>

        <button className="w-full py-6 bg-white text-black font-black rounded-3xl shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:scale-[1.01] active:scale-[0.99] transition-all uppercase tracking-widest text-sm italic">
          Update Configuration
        </button>
      </div>
    </motion.div>
  );
}

// ── 유틸리티: CSS 추가 (스크롤바 등) ──
const GlobalStyles = () => (
  <style jsx global>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    ::selection {
      background: white;
      color: black;
    }
    body {
      background: black;
    }
  `}</style>
);

"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, ArrowRight, BrainCircuit } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function UploadPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');

  // 실제 라우팅을 위해 컴포넌트를 사용하지만 search Params 에러 방지 위해 Suspense 등 우회 처리를 최소화합니다
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovered(false);
    if (e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
      simulateAnalysis();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      simulateAnalysis();
    }
  };

  const simulateAnalysis = () => {
    setStep('analyzing');
    setTimeout(() => {
      setStep('result');
    }, 4000); // 4초 후 분석 결과 표시 (모킹)
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white py-24 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black">원고 업로드</h1>
          <p className="text-white/40">작성하신 원고 파일을 여기에 올려주세요. AI 고스트라이터가 즉시 분석을 시작합니다.</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              onDragOver={(e) => { e.preventDefault(); setIsHovered(true); }}
              onDragLeave={() => setIsHovered(false)}
              onDrop={handleDrop}
              className={`border-4 border-dashed rounded-[3rem] p-24 text-center transition-all ${
                isHovered ? 'border-amber-400 bg-amber-500/5' : 'border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              <input type="file" id="file" className="hidden" multiple accept=".hwp,.docx,.txt,.pdf" onChange={handleFileSelect} />
              <label htmlFor="file" className="cursor-pointer flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all ${isHovered ? 'bg-amber-400 text-black scale-110' : 'bg-white/5 text-white/50'}`}>
                  <UploadCloud size={40} />
                </div>
                <h3 className="text-2xl font-black mb-2">클릭하여 파일 선택 또는 드래그 앤 드롭</h3>
                <p className="text-white/30 text-sm font-medium">지원 형식: HWP, DOCX, TXT, PDF</p>
              </label>
            </motion.div>
          )}

          {step === 'analyzing' && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center text-amber-400">
              <BrainCircuit size={64} className="mx-auto mb-8 animate-pulse" />
              <h3 className="text-2xl font-black mb-2 animate-pulse">우주마인드스쿨 AI가 원고를 분석 중입니다...</h3>
              <p className="text-white/40">문맥, 글자 수, 필요한 확장 집필 분량을 계산하고 있습니다.</p>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">AI 원고 분석 완료</h3>
                    <p className="text-white/40">{files.map(f => f.name).join(', ')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                    <p className="text-white/40 text-xs font-bold mb-2">감지된 총 글자 수</p>
                    <div className="text-3xl font-black">28,450<span className="text-base text-white/40 ml-1">자</span></div>
                  </div>
                  <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                    <p className="text-white/40 text-xs font-bold mb-2">현재 예상 페이지 (A5)</p>
                    <div className="text-3xl font-black">약 75<span className="text-base text-white/40 ml-1">p</span></div>
                  </div>
                  <div className="bg-amber-500/10 rounded-2xl p-6 border border-amber-500/30">
                    <p className="text-amber-500/70 text-xs font-bold mb-2">목표 (200페이지 플랜)</p>
                    <div className="text-3xl font-black text-amber-400">+125<span className="text-base text-amber-400/50 ml-1">p 부족</span></div>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 flex gap-4 mb-12">
                  <AlertCircle className="text-orange-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-orange-400 mb-1">AI 확장 집필이 필요합니다</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      업로드된 원고량이 목표치(200p)에 도달하기 부족합니다. 
                      우주마인드스쿨 AI가 각 챕터 사이에 <strong className="text-white">심층 심리학 이론 배경</strong>과 
                      <strong className="text-white">거장(네빌 고다드 등)의 명언 큐레이션</strong>, 그리고 
                      <strong className="text-white">코스믹마스터 워크북 섹션</strong>을 추가하여 완벽한 책으로 확장 구축할 것을 권장합니다.
                    </p>
                  </div>
                </div>

                <Link href="/my-book/editor" className="w-full py-5 flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black text-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg">
                  AI와 함께 에디터에서 편집 시작하기 <ArrowRight />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

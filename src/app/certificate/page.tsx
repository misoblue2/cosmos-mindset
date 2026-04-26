"use client";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Printer, Download, Share2, Star } from 'lucide-react';

function CertificateContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '여행자';
  const program = searchParams.get('program') || '긍정마인드셋 학교 1개월 과정';
  const typing = searchParams.get('typing') || '12,847';
  const streak = searchParams.get('streak') || '30';
  const gratitude = searchParams.get('gratitude') || '150';
  
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth()+1}월 ${today.getDate()}일`;

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#2c1810] flex flex-col items-center py-20 px-4 font-serif print:bg-white print:py-0 print:px-0">
      <header className="mb-12 text-center print:hidden">
         <h1 className="text-2xl font-black mb-2 font-sans tracking-tight">당신의 수료를 축하합니다</h1>
         <p className="text-[#8b7355] text-sm font-sans font-bold uppercase tracking-widest">Certificate of Achievement</p>
      </header>

      {/* 졸업장 카드 */}
      <div className="max-w-[800px] w-full bg-[#fffdf5] border-[3px] border-[#c8a84b] rounded-sm p-12 md:p-20 relative shadow-2xl print:shadow-none print:m-0 print:w-full">
         {/* 내부 테두리 */}
         <div className="absolute inset-2 border border-[#e8d48a] pointer-events-none" />
         
         <div className="relative z-10 flex flex-col items-center text-center">
            <div className="text-[10px] tracking-[0.4em] text-[#8b7355] font-bold uppercase mb-8">✦ Cosmosmindset ✦</div>
            <h2 className="text-5xl font-black mb-2 tracking-tighter">수료증</h2>
            <p className="text-sm font-bold text-[#8b7355] tracking-widest uppercase mb-12">Certificate of Completion</p>
            
            <div className="w-40 h-[2px] bg-gradient-to-r from-transparent via-[#c8a84b] to-transparent mb-12" />

            <div className="space-y-6">
               <p className="text-lg">이 증서는 아래에 기재된 분이</p>
               <div className="text-5xl font-black italic border-b-2 border-[#c8a84b] pb-2 inline-block px-10">
                 {name}
               </div>
               
               <div className="flex justify-center gap-4 py-8">
                  {[1,2,3].map(i => <Star key={i} size={24} className="fill-[#c8a84b] text-[#c8a84b]" />)}
               </div>

               <div className="text-2xl font-bold text-[#c8a84b] tracking-wider mb-6">
                 {program}
               </div>

               <p className="leading-relaxed text-lg max-w-lg mx-auto">
                 을 성실히 이수하였음을 증명합니다.<br/>
                 30일간 매일 20분, 신경 필사와 명상과 감사 훈련을 통해<br/>
                 뇌의 긍정 회로를 새롭게 재배선하였습니다.
               </p>

               <div className="pt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold text-[#c8a84b]">
                  <span>누적 타이핑: {typing}자</span>
                  <span>연속 출석: {streak}일</span>
                  <span>감사 항목: {gratitude}개</span>
               </div>
            </div>

            <div className="w-40 h-[2px] bg-gradient-to-r from-transparent via-[#c8a84b] to-transparent my-12" />

            <div className="w-full flex flex-col md:flex-row items-end justify-between mt-10">
               <div className="w-24 h-24 border-2 border-[#c8a84b] rounded-full flex items-center justify-center text-[10px] font-black text-[#c8a84b] leading-tight flex-col">
                  COSMIC<br/>MIND<br/>★<br/>CERTIFIED
               </div>
               
               <div className="flex flex-col items-center">
                  <div className="w-40 h-[1px] bg-[#2c1810] mb-4" />
                  <span className="text-sm font-bold">정셀리나 | 코스믹마인드 대표</span>
               </div>

               <div className="text-right text-xs font-bold text-[#8b7355] space-y-1">
                  <div>발급일: {dateStr}</div>
                  <div>cosmosmindset.com</div>
               </div>
            </div>
         </div>
      </div>

      <footer className="mt-12 flex gap-4 print:hidden">
         <button 
           onClick={() => window.print()}
           className="flex items-center gap-2 px-8 py-4 bg-[#c8a84b] text-white font-black rounded-xl hover:scale-105 transition-transform"
         >
           <Printer size={18} /> 졸업장 인쇄 / PDF 저장
         </button>
         <button className="flex items-center gap-2 px-8 py-4 bg-white border border-[#c8a84b] text-[#c8a84b] font-black rounded-xl hover:bg-white/50 transition-all">
           <Share2 size={18} /> SNS 공유하기
         </button>
      </footer>
    </div>
  );
}

export default function CertificatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center font-bold">로딩 중...</div>}>
      <CertificateContent />
    </Suspense>
  );
}

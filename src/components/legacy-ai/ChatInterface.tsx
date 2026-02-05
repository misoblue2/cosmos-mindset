"use client";

import { useState } from 'react';
import {
    Sparkles,
    Download,
    BookOpen,
    PenTool,
    RotateCcw,
    Lock
} from 'lucide-react';
import { generateBookPDF } from './BookGenerator';
import { generateScenario } from '@/lib/scenarioGenerator';

export function ChatInterface() {
    const [storyInput, setStoryInput] = useState('');
    const [targetPages, setTargetPages] = useState<number>(50);
    const [generatedBook, setGeneratedBook] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPaid, setIsPaid] = useState(false); // Mock payment status

    const handleGenerate = async () => {
        if (!storyInput.trim()) return;
        setIsGenerating(true);

        // Simulate AI "Thinking" and "Expanding" time
        await new Promise(resolve => setTimeout(resolve, 3000));

        const bookContent = generateScenario(storyInput, targetPages);
        setGeneratedBook(bookContent);
        setIsGenerating(false);
    };

    const handleReset = () => {
        setStoryInput('');
        setGeneratedBook('');
        setIsPaid(false);
    };

    const handleDownload = async () => {
        if (!isPaid) {
            const confirmed = confirm("PDF 다운로드는 입금 확인 후 가능합니다.\n(테스트 모드: '확인'을 누르면 입금 처리된 것으로 간주합니다.)");
            if (confirmed) {
                setIsPaid(true);
                alert("입금이 확인되었습니다! 다운로드를 시작합니다.");
            } else {
                return;
            }
        }
        await generateBookPDF(generatedBook, targetPages, { title: "나의 자서전", coverStyle: "Classic" });
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            {!generatedBook ? (
                // Input Mode
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 p-8 md:p-12 text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-stone-900/20">
                            <BookOpen className="text-white" size={32} />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-stone-800 mb-3">
                            당신의 이야기, 세상 단 하나뿐인 책으로
                        </h2>
                        <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
                            어린 시절의 추억, 삶의 결정적 순간들을 들려주세요.<br />
                            AI가 당신의 이야기를 풍성하게 다듬어 한 권의 자서전으로 완성해드립니다.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto space-y-6">
                        {/* Story Input Field */}
                        <div className="relative">
                            <textarea
                                value={storyInput}
                                onChange={(e) => setStoryInput(e.target.value)}
                                maxLength={1000}
                                placeholder="예: 무더운 여름날, 골목길에서 친구들과 뛰놀던 기억이 납니다. 해가 질 때까지 술래잡기를 하다가..."
                                className="w-full h-48 px-6 py-6 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-all text-base font-medium leading-relaxed resize-none placeholder:text-stone-400"
                            />
                            <div className="absolute bottom-4 right-4 text-xs font-bold text-stone-400">
                                {storyInput.length} / 1000자
                            </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 text-left">
                                <label className="text-xs font-bold text-stone-500 uppercase mb-2 block">목표 분량</label>
                                <select
                                    value={targetPages}
                                    onChange={(e) => setTargetPages(Number(e.target.value))}
                                    className="w-full bg-transparent font-bold text-stone-800 outline-none cursor-pointer"
                                >
                                    <option value={50}>50페이지 (에세이 분량)</option>
                                    <option value={100}>100페이지 (문고본 분량)</option>
                                    <option value={200}>200페이지 (단행본 분량)</option>
                                </select>
                            </div>
                            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100 text-left flex items-center justify-between">
                                <div>
                                    <label className="text-xs font-bold text-stone-500 uppercase mb-1 block">예상 소요 시간</label>
                                    <span className="font-bold text-stone-800">약 30초 ~ 1분</span>
                                </div>
                                <Sparkles size={20} className="text-amber-400" />
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={!storyInput.trim() || isGenerating}
                            className="w-full py-5 bg-stone-900 text-white font-bold rounded-2xl shadow-xl shadow-stone-900/20 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <Sparkles size={20} className="animate-spin text-amber-400" />
                                    <span>AI 작가가 집필 중입니다...</span>
                                </>
                            ) : (
                                <>
                                    <PenTool size={20} />
                                    <span>자서전 완성하기</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                // Output Mode (Book Preview)
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-[#fffbf0] rounded-t-[2rem] p-8 md:p-16 shadow-2xl relative min-h-[600px] border-b-[16px] border-stone-800/5 paper-texture">
                        <div className="max-w-3xl mx-auto font-serif text-stone-800 leading-loose whitespace-pre-wrap text-lg text-justify">
                            {generatedBook}
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="bg-stone-900 text-white p-6 rounded-b-[2.5rem] flex flex-col md:flex-row items-center justify-between shadow-2xl mx-4 -mt-2 relative z-10 gap-4">
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-white/10 text-stone-400 hover:text-white transition-colors font-bold text-sm"
                        >
                            <RotateCcw size={18} />
                            다시 쓰기
                        </button>

                        <div className="flex items-center gap-4">
                            {!isPaid && (
                                <p className="text-xs text-stone-400 hidden md:block">
                                    <Lock size={12} className="inline mr-1" />
                                    다운로드는 입금 확인 후 가능합니다
                                </p>
                            )}
                            <button
                                onClick={handleDownload}
                                className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold transition-all shadow-lg text-stone-900 ${isPaid
                                    ? "bg-amber-400 hover:bg-amber-300 shadow-amber-900/20"
                                    : "bg-white hover:bg-stone-200 shadow-black/20"
                                    }`}
                            >
                                {isPaid ? <Download size={20} /> : <Lock size={20} />}
                                {isPaid ? "PDF 다운로드" : "입금 확인 및 다운로드"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
                .paper-texture {
                    background-image: url('https://www.transparenttextures.com/patterns/cream-paper.png');
                }
            `}</style>
        </div>
    );
}


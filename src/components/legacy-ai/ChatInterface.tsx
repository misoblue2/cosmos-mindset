"use client";

import { useState } from 'react';
import {
    Sparkles,
    Download,
    Film,
    Clapperboard,
    PenTool,
    RotateCcw
} from 'lucide-react';
import { generateBookPDF } from './BookGenerator';
import { generateScenario } from '@/lib/scenarioGenerator'; // Import the new generator

export function ChatInterface() { // Keeping component name strictly as requested for minimal impact, though behavior changed
    const [keywords, setKeywords] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [generatedScript, setGeneratedScript] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Customization logic integrated directly
    const [title, setTitle] = useState('');

    const handleAddKeyword = () => {
        if (input.trim() && keywords.length < 5) {
            setKeywords([...keywords, input.trim()]);
            setInput('');
        }
    };

    const handleGenerate = async () => {
        if (keywords.length === 0) return;
        setIsGenerating(true);

        // Simulate "Creative Process"
        await new Promise(resolve => setTimeout(resolve, 2000));

        const script = generateScenario(keywords);
        setGeneratedScript(script);
        setIsGenerating(false);
    };

    const handleReset = () => {
        setKeywords([]);
        setGeneratedScript('');
        setTitle('');
    };

    const handleDownload = async () => {
        if (!generatedScript) return;
        await generateBookPDF(generatedScript, 10, { title: title || "나의 시나리오", coverStyle: "Classic" });
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            {!generatedScript ? (
                // Input Mode
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 p-8 md:p-12 text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="mb-8">
                        <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-stone-900/20">
                            <Clapperboard className="text-white" size={32} />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-stone-800 mb-3">
                            당신의 인생을 영화처럼
                        </h2>
                        <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
                            기억에 남는 단어들을 들려주세요.<br />
                            AI가 당신의 이야기를 한 편의 영화 시나리오로 각색해드립니다.
                        </p>
                    </div>

                    <div className="max-w-md mx-auto space-y-6">
                        {/* Keyword Chips */}
                        <div className="flex flex-wrap gap-2 justify-center min-h-[40px]">
                            {keywords.map((k, i) => (
                                <span key={i} className="px-4 py-2 bg-stone-100 text-stone-700 rounded-full text-sm font-bold flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                                    #{k}
                                    <button onClick={() => setKeywords(keywords.filter((_, idx) => idx !== i))} className="hover:text-red-500">×</button>
                                </span>
                            ))}
                        </div>

                        {/* Input Field */}
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
                                placeholder={keywords.length >= 5 ? "최대 5개까지 입력 가능합니다" : "키워드 입력 (예: 첫사랑, 자전거)"}
                                disabled={keywords.length >= 5}
                                className="w-full px-6 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-all text-center text-lg font-bold placeholder:font-medium placeholder:text-stone-400"
                            />
                            <button
                                onClick={handleAddKeyword}
                                disabled={!input.trim() || keywords.length >= 5}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-stone-200 text-stone-500 rounded-xl hover:bg-stone-800 hover:text-white disabled:opacity-0 transition-all"
                            >
                                <PenTool size={18} />
                            </button>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={keywords.length === 0 || isGenerating}
                            className="w-full py-5 bg-stone-900 text-white font-bold rounded-2xl shadow-xl shadow-stone-900/20 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <Sparkles size={20} className="animate-spin text-amber-400" />
                                    <span>시나리오 집필 중...</span>
                                </>
                            ) : (
                                <>
                                    <Film size={20} />
                                    <span>시나리오 생성하기</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                // Output Mode (Script View)
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-[#f0f0e0] rounded-t-[2rem] p-8 md:p-12 shadow-2xl relative min-h-[600px] border-b-[16px] border-stone-800/5 paper-texture">
                        {/* Paper Holes imitation */}
                        <div className="absolute left-4 top-0 bottom-0 w-8 flex flex-col justify-evenly opacity-10 pointer-events-none">
                            <div className="w-4 h-4 rounded-full bg-black/50" />
                            <div className="w-4 h-4 rounded-full bg-black/50" />
                            <div className="w-4 h-4 rounded-full bg-black/50" />
                        </div>

                        <div className="max-w-3xl mx-auto pl-8 md:pl-16 font-mono text-stone-800 leading-relaxed whitespace-pre-wrap">
                            {/* Script Header */}
                            <div className="text-center mb-12 border-b-2 border-stone-300 pb-8">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="UNTITLED SCREENPLAY"
                                    className="bg-transparent border-none text-center text-3xl font-black font-courier text-stone-900 placeholder:text-stone-400 focus:outline-none w-full uppercase tracking-widest"
                                />
                                <p className="text-sm font-bold text-stone-500 mt-2 uppercase tracking-widest">Written by You & AI</p>
                            </div>

                            {/* Script Content */}
                            <div className="font-courier text-sm md:text-base">
                                {generatedScript}
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="bg-stone-900 text-white p-6 rounded-b-[2.5rem] flex items-center justify-between shadow-2xl mx-4 -mt-2 relative z-10">
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-white/10 text-stone-400 hover:text-white transition-colors font-bold text-sm"
                        >
                            <RotateCcw size={18} />
                            다시 쓰기
                        </button>

                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-3 px-8 py-3 bg-white text-stone-900 rounded-xl font-bold hover:bg-stone-200 transition-colors shadow-lg shadow-black/20"
                        >
                            <Download size={20} />
                            PDF로 소장하기
                        </button>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
                .font-courier {
                    font-family: 'Courier Prime', 'Courier New', monospace;
                }
            `}</style>
        </div>
    );
}


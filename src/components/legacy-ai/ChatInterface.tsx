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
import { StepIndicator } from './StepIndicator';

export function ChatInterface() {
    // Wizard State
    const [step, setStep] = useState(1);
    const [topic, setTopic] = useState('');
    const [storyInput, setStoryInput] = useState('');
    const [answers, setAnswers] = useState({ q1: '', q2: '' });

    // Generation State
    const [targetPages, setTargetPages] = useState<number>(50);
    const [generatedBook, setGeneratedBook] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const steps = ['주제 선정', '기억 조각', '심층 인터뷰', '에세이 완성'];

    const handleTopicSelect = (selectedTopic: string) => {
        setTopic(selectedTopic);
        setStep(2);
    };

    const handleStorySubmit = () => {
        if (!storyInput.trim()) return;
        setStep(3);
    };

    const handleInterviewSubmit = async () => {
        if (!answers.q1.trim() || !answers.q2.trim()) return;
        setStep(4);
        await generateEssay();
    };

    const generateEssay = async () => {
        setIsGenerating(true);
        // Simulate AI Thinking
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Combine inputs for the generator
        const combinedContext = `[주제: ${topic}]\n${storyInput}\n\n[심층 답변]\nQ1. 그 순간 가장 기억에 남는 감정은?\nA1. ${answers.q1}\n\nQ2. 그 일이 현재의 나에게 미친 영향은?\nA2. ${answers.q2}`;

        const bookContent = generateScenario(combinedContext, targetPages);
        setGeneratedBook(bookContent);
        setIsGenerating(false);
    };

    const handleReset = () => {
        setStep(1);
        setTopic('');
        setStoryInput('');
        setAnswers({ q1: '', q2: '' });
        setGeneratedBook('');
        setIsPaid(false);
    };

    const handleDownload = async () => {
        // Updated Logic: Check for payment (Trust-based / Simulated)
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
            {!generatedBook && isGenerating === false ? (
                // Wizard Mode
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 p-8 md:p-12 text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="mb-10">
                        <StepIndicator currentStep={step} steps={steps} />

                        <h2 className="text-3xl font-serif font-bold text-stone-800 mb-3">
                            {step === 1 && "어떤 이야기를 기록하고 싶으신가요?"}
                            {step === 2 && "당신의 기억 조각을 들려주세요"}
                            {step === 3 && "조금 더 깊이 들어가 볼까요?"}
                        </h2>
                        <p className="text-stone-500 max-w-lg mx-auto leading-relaxed">
                            {step === 1 && "가장 쓰고 싶은 주제를 선택해주세요. AI가 당신의 톤앤매너를 분석합니다."}
                            {step === 2 && "떠오르는 장면, 대화, 냄새, 분위기 등 무엇이든 좋습니다. 자유롭게 적어주세요."}
                            {step === 3 && "당신의 이야기에 깊이를 더하기 위해 AI가 몇 가지 질문을 드립니다."}
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        {/* Step 1: Topic Selection */}
                        {step === 1 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['자서전 / 회고록', '성장 에세이', '여행기', '직무 / 커리어'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => handleTopicSelect(t)}
                                        className="p-6 rounded-2xl border-2 border-stone-100 hover:border-stone-800 hover:bg-stone-50 transition-all text-left group"
                                    >
                                        <span className="block text-lg font-bold text-stone-800 mb-1 group-hover:text-black">{t}</span>
                                        <span className="text-xs text-stone-400 font-medium">나만의 문체로 기록하기</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 2: Story Input */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="relative">
                                    <textarea
                                        value={storyInput}
                                        onChange={(e) => setStoryInput(e.target.value)}
                                        maxLength={1000}
                                        placeholder="예: 무더운 여름날, 골목길에서 친구들과 뛰놀던 기억이 납니다..."
                                        className="w-full h-64 px-6 py-6 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:outline-none focus:border-stone-400 focus:bg-white transition-all text-base font-medium leading-relaxed resize-none placeholder:text-stone-400"
                                    />
                                    <div className="absolute bottom-4 right-4 text-xs font-bold text-stone-400">
                                        {storyInput.length} / 1000자
                                    </div>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <button onClick={() => setStep(1)} className="px-6 py-4 rounded-2xl font-bold text-stone-500 hover:bg-stone-100 transition-colors">이전</button>
                                    <button
                                        onClick={handleStorySubmit}
                                        disabled={!storyInput.trim()}
                                        className="flex-1 py-4 bg-stone-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        다음으로
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Deep Interview */}
                        {step === 3 && (
                            <div className="space-y-6 text-left">
                                <div className="space-y-4">
                                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                        <p className="text-sm font-bold text-amber-800 mb-2">Q1. 그 순간, 당신이 느꼈던 가장 강렬한 감정은 무엇이었나요?</p>
                                        <input
                                            type="text"
                                            value={answers.q1}
                                            onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
                                            className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                                            placeholder="답변을 입력해주세요..."
                                        />
                                    </div>
                                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                        <p className="text-sm font-bold text-amber-800 mb-2">Q2. 그 경험이 지금의 당신에게 어떤 영향을 주었나요?</p>
                                        <input
                                            type="text"
                                            value={answers.q2}
                                            onChange={(e) => setAnswers({ ...answers, q2: e.target.value })}
                                            className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                                            placeholder="답변을 입력해주세요..."
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <button onClick={() => setStep(2)} className="px-6 py-4 rounded-2xl font-bold text-stone-500 hover:bg-stone-100 transition-colors">이전</button>
                                    <button
                                        onClick={handleInterviewSubmit}
                                        disabled={!answers.q1.trim() || !answers.q2.trim()}
                                        className="flex-1 py-4 bg-stone-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <PenTool size={18} />
                                        <span>에세이 생성하기</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : isGenerating ? (
                // Loading View
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 p-12 text-center min-h-[400px] flex flex-col items-center justify-center animate-in fade-in duration-500">
                    <Sparkles size={48} className="animate-spin text-amber-400 mb-6" />
                    <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">AI 작가가 집필 중입니다</h3>
                    <p className="text-stone-500">당신의 이야기를 아름다운 문장으로 다듬고 있습니다.<br />잠시만 기다려주세요.</p>
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
                            처음부터 다시 쓰기
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


"use client";

import { useState, useRef, useEffect } from 'react';
import {
    Send,
    Settings2,
    AlertCircle,
    Download,
    Sparkles,
    CheckCircle2,
    CreditCard,
    ShieldCheck
} from 'lucide-react';
import { CHAT_INITIAL_MESSAGE } from '@/lib/mockData';
import { TableOfContents } from './TableOfContents';
import { generateBookPDF } from './BookGenerator';

import { DonationModal } from '@/components/common/DonationModal';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

// PRICING removed for voluntary donation

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: CHAT_INITIAL_MESSAGE }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [chapters, setChapters] = useState<string[]>([]);
    const [targetPages, setTargetPages] = useState<number>(50);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [showCustomizer, setShowCustomizer] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    // Customization states
    const [selectedTitle, setSelectedTitle] = useState('나의 생애, 그 아름다운 기록');
    const [customTitle, setCustomTitle] = useState('');
    const [selectedCover, setSelectedCover] = useState('Classic');

    const scrollRef = useRef<HTMLDivElement>(null);

    const SUGGESTED_TITLES = [
        '나의 생애, 그 아름다운 기록',
        '시간의 자락을 붙잡다',
        '지적 탐구자의 회상록'
    ];

    const COVERS = [
        { id: 'Classic', name: '클래식 그린', color: 'bg-[#1A3C34]' },
        { id: 'Modern', name: '모던 화이트', color: 'bg-white' },
        { id: 'Artistic', name: '아티스틱 골드', color: 'bg-[#D4AF37]' }
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const responses = [
                "정말 다행이네요. 그때의 감정을 조금 더 깊이 묘사해 보시겠어요?",
                "그 경험이 지금의 대표님을 만든 거군요. 기록으로 남길 가치가 충분합니다.",
                "흥미로운 관점이네요. 만약 다시 그때로 돌아간다면, 같은 선택을 하셨을까요?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const aiMessage = { role: 'assistant' as const, content: randomResponse };

            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);

            if (chapters.length < 10 && Math.random() > 0.3) {
                const newChapter = `Chapter ${chapters.length + 1}: ${userMessage.content.slice(0, 15)}...`;
                setChapters(prev => [...prev, newChapter]);
            }
        }, 1500);
    };

    const handleStartCustomization = () => {
        setShowCustomizer(true);
    };

    const handleStartGeneration = async () => {
        setShowCustomizer(false);
        setIsDonationModalOpen(true); // Show donation suggestion
        await startGeneration();
    };

    const startGeneration = async () => {
        setIsGenerating(true);
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsPaid(true); // Reusing this state to mean "Completed"

        // Start PDF generation with options
        try {
            const finalTitle = customTitle || selectedTitle;
            await generateBookPDF(messages, targetPages, { title: finalTitle, coverStyle: selectedCover });
        } catch (e) {
            console.error(e);
            alert("책 생성 중 오류가 발생했습니다.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">

            {/* Customization Modal */}
            {showCustomizer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowCustomizer(false)} />
                    <div className="relative bg-card border border-border rounded-[2.5rem] p-8 md:p-10 max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh]">
                        <div className="text-center space-y-2 mb-10">
                            <h3 className="text-3xl font-serif font-bold">자서전 커스터마이징</h3>
                            <p className="text-muted-foreground text-sm">세상에 단 하나뿐인 당신의 책을 완성하는 마지막 단계입니다.</p>
                        </div>

                        <div className="space-y-10">
                            {/* Title Selection */}
                            <div className="space-y-4">
                                <label className="text-lg font-bold flex items-center gap-2">
                                    <Sparkles size={20} className="text-accent" />
                                    도서 제목 선택
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {SUGGESTED_TITLES.map(t => (
                                        <button
                                            key={t}
                                            onClick={() => { setSelectedTitle(t); setCustomTitle(''); }}
                                            className={`p-4 rounded-2xl border-2 text-sm text-left transition-all ${selectedTitle === t && !customTitle ? 'border-primary bg-primary/5 font-bold ring-2 ring-primary/20' : 'border-border hover:border-primary/30'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="직접 제목을 입력하시겠습니까?"
                                        value={customTitle}
                                        onChange={(e) => setCustomTitle(e.target.value)}
                                        className="w-full px-6 py-4 bg-background border-2 border-border rounded-2xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    />
                                    {customTitle && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" size={20} />}
                                </div>
                            </div>

                            {/* Cover Selection */}
                            <div className="space-y-4">
                                <label className="text-lg font-bold flex items-center gap-2">
                                    <ShieldCheck size={20} className="text-accent" />
                                    표지 디자인 선택
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {COVERS.map(c => (
                                        <button
                                            key={c.id}
                                            onClick={() => setSelectedCover(c.id)}
                                            className={`flex flex-col gap-3 group transition-all transform active:scale-95`}
                                        >
                                            <div className={`${c.color} aspect-[3/4] w-full rounded-2xl border-4 transition-all shadow-lg ${selectedCover === c.id ? 'border-primary ring-4 ring-primary/20' : 'border-border group-hover:border-primary/30'}`}>
                                                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                                                    <div className="w-full h-[1px] bg-white/20 mb-2" />
                                                    <div className="w-2/3 h-[1px] bg-white/20" />
                                                    <div className="mt-4 text-[10px] text-white/40 font-serif leading-none opacity-0 group-hover:opacity-100">DESIGN PREVIEW</div>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-bold ${selectedCover === c.id ? 'text-primary' : 'text-muted-foreground'}`}>{c.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex gap-4">
                            <button
                                onClick={handleStartGeneration}
                                className="flex-1 py-5 bg-primary text-primary-foreground font-black rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                            >
                                자서전 생성하기 (자율 후원)
                            </button>
                            <button
                                onClick={() => setShowCustomizer(false)}
                                className="px-8 py-5 border-2 border-border text-muted-foreground font-bold rounded-2xl hover:bg-muted transition-all"
                            >
                                돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Donation Modal instead of Payment Sim */}
            <DonationModal
                isOpen={isDonationModalOpen}
                onClose={() => setIsDonationModalOpen(false)}
                title="작가님께 후원하기"
                description={`자서전 생성이 시작되었습니다.\n서비스가 만족스러우셨다면 작은 마음을 표현해주세요.`}
            />

            {/* Main Chat Area */}
            <div className="lg:col-span-3 flex flex-col h-[650px] bg-card border border-border rounded-3xl shadow-sm overflow-hidden animate-in fade-in duration-500">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar" ref={scrollRef}>
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[75%] px-6 py-4 rounded-[1.5rem] text-sm leading-relaxed whitespace-pre-wrap shadow-sm border ${msg.role === 'user'
                                ? 'bg-primary text-primary-foreground border-primary rounded-br-none'
                                : 'bg-background text-secondary-foreground border-border rounded-bl-none'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-muted/30 px-6 py-4 rounded-3xl rounded-bl-none flex gap-1.5 items-center">
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-muted/20 border-t border-border">
                    <div className="relative flex items-center gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="당신의 특별한 일화나 기억을 들려주세요..."
                            className="flex-1 px-6 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-inner"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="p-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/10"
                        >
                            <Send size={22} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar: Control Panel & TOC */}
            <div className="lg:col-span-1 space-y-6 flex flex-col h-full text-left">
                {/* Settings Panel */}
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Settings2 size={60} />
                    </div>

                    <div className="flex items-center gap-2 mb-6 text-primary font-black uppercase tracking-tighter">
                        <Settings2 size={20} />
                        <span>Edition Plan</span>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-col gap-2">
                            {[50, 100, 200].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setTargetPages(p)}
                                    className={`flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${targetPages === p
                                        ? 'bg-primary/5 border-primary text-primary shadow-md'
                                        : 'bg-background border-border text-muted-foreground hover:border-primary/30'
                                        }`}
                                >
                                    <div className="text-left">
                                        <p className="font-black text-lg leading-none">{p}P</p>
                                        <p className="text-[10px] mt-1 uppercase font-bold opacity-60">Standard</p>
                                    </div>
                                    <p className="font-bold text-sm">자율 후원</p>
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-2 p-3 bg-muted/50 rounded-2xl border border-border/50">
                            <AlertCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-muted-foreground leading-tight">
                                분량이 많을수록 더욱 풍성하고 문학적인 표현으로 내용을 확장합니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-grow overflow-hidden flex flex-col">
                    <TableOfContents chapters={chapters} />
                </div>

                {chapters.length > 0 && (
                    <button
                        onClick={handleStartCustomization}
                        disabled={isGenerating}
                        className="w-full py-5 bg-accent text-accent-foreground font-black rounded-3xl hover:bg-accent/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 group"
                    >
                        {isGenerating ? (
                            <>
                                <Sparkles size={20} className="animate-spin" />
                                <span>처리 중...</span>
                            </>
                        ) : (
                            <>
                                <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                                <span>자서전 완성하고 다운로드</span>
                            </>
                        )}
                    </button>
                )}

                {isPaid && (
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2">
                        <CheckCircle2 className="text-emerald-500" size={20} />
                        <span className="text-xs font-bold text-emerald-700">자서전 생성이 완료되었습니다.</span>
                    </div>
                )}
            </div>
        </div>
    );
}

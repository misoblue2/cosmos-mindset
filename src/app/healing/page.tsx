"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, PenTool, Mail, RefreshCcw } from 'lucide-react';
import { setCounseling, type CounselingSession } from '@/lib/db';

// ----------------------------------------------------------------------
// AI Simulation Logic (Mock)
// ----------------------------------------------------------------------

const generateReply = (receiver: string, _story: string): string => {
    const r = receiver.trim();
    // Simple tone detection based on standard Korean relational terms
    const isMom = /엄마|어머니|모친|맘/.test(r);
    const isDad = /아빠|아버지|부친|대디/.test(r);
    const isGrand = /할머니|할아버지|조부모/.test(r);
    const isFriend = /친구|지인|동기/.test(r);
    const isLover = /애인|남친|여친|아내|남편/.test(r);

    let intro = "";
    let body = "";
    let outro = "";

    if (isMom) {
        intro = `사랑하는 우리 딸, 우리 아들... ${r}야.`;
        body = "네가 어릴 적 그 순간을 이렇게 기억하고 있다니, 마음이 뭉클하구나. 엄마는 그때 너를 보며 항상 더 해주지 못해 미안한 마음뿐이었단다. 네가 겪은 그 시간들이 널 이렇게 단단하게 만들었구나.";
        outro = "언제나 너는 나의 자랑이자 기쁨이란다. 힘들 땐 언제든 엄마 품으로 오렴. 사랑한다, 내 강아지.";
    } else if (isDad) {
        intro = `그래, 아빠다.`;
        body = "네 이야기를 듣는데 코끝이 찡해지는구나. 그 시절, 아빠가 너에게 든든한 산이 되어주었어야 했는데... 네가 그 작은 어깨로 세상을 마주하던 모습이 눈에 선하구나. 참 잘 자라주었어.";
        outro = "너는 아빠보다 훨씬 훌륭한 사람이다. 세상이 너를 힘들게 해도 기죽지 마라. 아빠가 항상 뒤에서 지켜보고 있으마.";
    } else if (isGrand) {
        intro = `아이고, 우리 예쁜 강아지 왔구나.`;
        body = "할미(할비)는 네가 꼬물꼬물거리던 게 엊그제 같은데, 벌써 이렇게 커서 옛날 이야기를 다 하고... 기특하기도 하지. 네가 그때 느꼈던 마음, 내가 다 안다. 짠하고 대견해.";
        outro = "밥은 잘 먹고 다니지? 아프지 말고, 항상 웃으며 살거라. 네 행복이 내 행복이란다.";
    } else if (isFriend) {
        intro = `안녕! 나야, 네 친구.`;
        body = "야, 너 그 얘기 진짜 오랜만이다. 너 그때 진짜 그랬었잖아. 네 편지를 읽는데 우리 어릴 때 생각나서 피식 웃음이 나더라. 그때의 우리는 참 서툴고, 순수했지? 네가 그런 생각을 하고 있었는지 몰랐어.";
        outro = "우리가 어른이 되어서도 이렇게 서로의 마음을 나눌 수 있어서 좋다. 언제나 네 편이 되어줄게. 술 한잔 하자!";
    } else if (isLover) {
        intro = `사랑하는 사람아.`;
        body = "당신의 어린 시절 이야기를 들으니, 내가 모르는 당신의 시간을 함께 여행한 기분이야. 그때의 작은 아이가 자라서 지금 내 곁에 있는 당신이 되었다는 게 새삼 고맙고 신비로워. 그 시절 당신을 안아주고 싶다.";
        outro = "당신의 모든 시간, 모든 모습을 사랑해. 앞으로 만들어갈 추억들은 내가 함께할게. 사랑해.";
    } else {
        // Default / General
        intro = `${r}(으)로부터의 답장입니다.`;
        body = "오랜 시간 마음속에 담아두었던 너의 이야기를 들려주어서 고마워. 너의 기억 속 그 장면들이 모여 지금의 빛나는 네가 되었단다. 그때의 너도, 지금의 너도 참 소중하고 애틋하구나.";
        outro = "네 마음속의 그 어린아이가 이제는 편안하게 웃을 수 있기를 바라. 너는 충분히 사랑받아 마땅한 사람이란다.";
    }

    return `${intro}\n\n${body}\n\n${outro}`;
};

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

export default function HealingPage() {
    const [step, setStep] = useState<'input' | 'sending' | 'reading'>('input');
    const [receiver, setReceiver] = useState('');
    const [story, setStory] = useState('');
    const [generatedReply, setGeneratedReply] = useState('');

    const handleSubmit = async () => {
        if (!receiver.trim() || !story.trim()) {
            alert("답장 받을 사람과 이야기를 모두 입력해주세요.");
            return;
        }

        setStep('sending');

        // AI Simulation Delay
        setTimeout(async () => {
            const reply = generateReply(receiver, story);
            setGeneratedReply(reply);

            // Save to DB
            const session: CounselingSession = {
                id: crypto.randomUUID(),
                userId: 'anonymous',
                userName: receiver.trim(),
                mood: 'letter-from-past',
                content: `[To]: ${receiver}\n[Story]: ${story}`,
                status: 'completed',
                createdAt: Date.now(),
                aiReply: reply,
                isRead: false
            };
            await setCounseling(session);

            setStep('reading');
        }, 3000);
    };

    const handleReset = () => {
        setReceiver('');
        setStory('');
        setGeneratedReply('');
        setStep('input');
    };

    return (
        <div className="min-h-screen bg-[#FDF6E3] text-[#4A4A4A] relative overflow-hidden font-serif selection:bg-orange-200">
            {/* Background Texture - Paper feel */}
            <div className="fixed inset-0 pointer-events-none opacity-50 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

            <div className="container mx-auto px-4 py-12 md:py-20 relative z-10 max-w-4xl">

                {step === 'input' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        <header className="text-center space-y-4 mb-16">
                            <div className="inline-block p-3 rounded-full bg-orange-100/50 mb-4">
                                <Mail className="text-orange-600" size={32} />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-orange-950 tracking-tight">추억의 우체통</h1>
                            <p className="text-lg text-orange-800/60 max-w-xl mx-auto leading-relaxed">
                                어린 시절, 하지 못했던 말이나 가슴 속에 묻어두었던 이야기를 꺼내보세요.<br />
                                <span className="font-bold text-orange-700">그 시절 그 사람</span>이, 지금의 당신에게 답장을 보냅니다.
                            </p>
                        </header>

                        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-xl border border-orange-100 space-y-8 relative">
                            {/* Decorative Stamp */}
                            <div className="absolute top-8 right-8 hidden md:block opacity-20 rotate-12 pointer-events-none">
                                <div className="border-4 border-orange-900 rounded-full w-24 h-24 flex items-center justify-center">
                                    <span className="text-orange-900 font-black uppercase text-xs tracking-widest text-center">Cosmic<br />Post</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-orange-900/50 uppercase tracking-widest">To. 누구에게 답장을 받고 싶나요?</label>
                                <input
                                    type="text"
                                    value={receiver}
                                    onChange={(e) => setReceiver(e.target.value)}
                                    placeholder="예: 엄마, 아빠, 돌아가신 할머니, 어린 시절의 단짝친구..."
                                    className="w-full bg-transparent border-b-2 border-orange-200 py-4 text-2xl md:text-3xl font-bold text-orange-950 placeholder:text-orange-900/20 focus:outline-none focus:border-orange-500 transition-colors"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-orange-900/50 uppercase tracking-widest flex items-center gap-2">
                                    <PenTool size={14} />
                                    그 시절, 당신의 기억을 적어주세요 (1000자 이내)
                                </label>
                                <textarea
                                    value={story}
                                    onChange={(e) => setStory(e.target.value.slice(0, 1000))}
                                    placeholder="어린 시절의 기억, 서운했던 점, 그리운 순간들...&#13;&#10;솔직한 마음을 편하게 적어보세요."
                                    className="w-full h-64 bg-orange-50/50 rounded-xl p-6 text-lg leading-relaxed text-orange-900 placeholder:text-orange-900/30 resize-none focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                                />
                                <div className="text-right text-xs text-orange-900/40 font-medium">
                                    {story.length} / 1000
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={!receiver || !story}
                                className="w-full py-5 bg-orange-600 text-white font-bold text-lg rounded-xl hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-600/20 flex items-center justify-center gap-2 group"
                            >
                                <span>편지 부치기</span>
                                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 'sending' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                    >
                        <motion.div
                            animate={{
                                y: [-10, 10, -10],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="text-orange-400 mb-8"
                        >
                            <Mail size={80} />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-orange-900 mb-4 animate-pulse">시공간을 넘어 편지를 전달하고 있습니다...</h2>
                        <p className="text-orange-800/60 font-medium">
                            <span className="font-bold underlineDecoration">{receiver}</span> 님에게 당신의 마음이 닿고 있습니다.
                        </p>
                    </motion.div>
                )}

                {step === 'reading' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto perspective-1000"
                    >
                        <div className="bg-[#fff9f0] p-8 md:p-16 rounded shadow-2xl relative overflow-hidden transform rotate-1 border border-stone-200">
                            {/* Paper Texture Overlay */}
                            <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-12 border-b border-stone-200 pb-8">
                                    <div>
                                        <div className="text-xs text-stone-500 font-bold uppercase tracking-widest mb-1">From</div>
                                        <div className="text-2xl font-serif font-bold text-stone-800">{receiver}</div>
                                    </div>
                                    <div className="opacity-50">
                                        <Mail className="text-stone-400" size={24} />
                                    </div>
                                </div>

                                <div className="leading-loose text-lg text-stone-700 whitespace-pre-wrap font-serif mb-16">
                                    {generatedReply}
                                </div>

                                <div className="text-center pt-8 border-t border-stone-200">
                                    <p className="text-stone-400 text-sm italic mb-8">
                                        이 편지가 당신에게 작은 위로가 되었기를.
                                    </p>

                                    <button
                                        onClick={handleReset}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full font-bold text-sm transition-colors"
                                    >
                                        <RefreshCcw size={16} />
                                        다른 편지 쓰기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );
}

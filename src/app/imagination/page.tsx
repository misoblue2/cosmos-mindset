"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play, Sparkles } from 'lucide-react';
import { DonationModal } from '@/components/common/DonationModal';
import { addIdea, getIdeas, type Idea } from '@/lib/db';

export default function ImaginationPage() {
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [newName, setNewName] = useState('');
    const [newContent, setNewContent] = useState('');

    useEffect(() => {
        const loadIdeas = async () => {
            const storedIdeas = await getIdeas();
            setIdeas(storedIdeas);
        };
        loadIdeas();
    }, []);

    const handleSubmit = async () => {
        if (!newContent.trim()) {
            alert("내용을 입력해주세요!");
            return;
        }

        const idea: Idea = {
            id: `idea-${Date.now()}`,
            author: newName.trim() || "익명의 상상가",
            content: newContent,
            createdAt: Date.now()
        };

        // UI Update (Optimistic)
        setIdeas(prev => [idea, ...prev]);
        setNewName('');
        setNewContent('');

        // Save to DB
        await addIdea(idea);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <DonationModal
                isOpen={isDonationModalOpen}
                onClose={() => setIsDonationModalOpen(false)}
                title="상상학교 후원하기"
                description="아이들의 꿈이 자라는 학교를 위해 마음을 모아주세요."
            />

            {/* Hero Video Section */}
            <div className="relative w-full h-[600px] bg-black overflow-hidden group">
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.1 }}
                    transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0 bg-[url('/images/imagination_hero.png')] bg-cover bg-center opacity-60"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-8 border border-white/50 cursor-pointer hover:bg-white/30 transition-colors group-hover:scale-110"
                    >
                        <Play size={32} className="fill-white text-white ml-2" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white font-serif mb-4 drop-shadow-lg"
                    >
                        아이들의 상상이 현실이 되는 곳
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-white/90 font-light max-w-2xl leading-relaxed drop-shadow-md"
                    >
                        우리가 모은 작은 정성이 아이들에게는<br />
                        세상을 바꾸는 커다란 학교가 됩니다.
                    </motion.p>
                </div>

                <div className="absolute bottom-10 left-10 flex gap-2">
                    <div className="px-3 py-1 bg-black/50 backdrop-blur rounded text-xs font-mono text-white/70">
                        AI Generated Visual
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl py-20">

                {/* Purpose & Donation Section */}
                <div className="text-center mb-20">
                    <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 fade-in duration-700">
                        <Heart className="mx-auto text-pink-500 fill-pink-500 animate-pulse" size={48} />

                        <h2 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight">
                            기적을 만드는 힘, <br />
                            여러분의 마음입니다.
                        </h2>

                        <p className="text-lg text-stone-600 leading-relaxed font-light">
                            상상학교는 아이들이 마음껏 꿈꾸고, 그 꿈을 현실로 만드는 공간입니다.<br />
                            단순한 건물이 아닌, 아이들의 미래를 담는 그릇이 되겠습니다.<br />
                            투명하고 정직하게, 오직 아이들을 위해 쓰겠습니다.
                        </p>

                        <div className="pt-4 flex flex-col md:flex-row gap-3 justify-center">
                            <button
                                onClick={() => setIsDonationModalOpen(true)}
                                className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-stone-900/20 active:scale-95 text-lg flex items-center justify-center gap-2"
                            >
                                <Heart size={20} className="text-pink-400 fill-pink-400" />
                                계좌이체로 후원
                            </button>
                            <button
                                onClick={() => setIsDonationModalOpen(true)}
                                className="px-8 py-4 bg-[#FAE100] text-[#371D1E] rounded-2xl font-bold hover:bg-[#FADB00] transition-all shadow-xl shadow-yellow-400/20 active:scale-95 text-lg flex items-center justify-center gap-2"
                            >
                                <Sparkles size={20} />
                                카카오페이로 후원
                            </button>
                        </div>
                        <p className="text-sm text-stone-400 mt-4">* 마음이 가는 방식으로 자유롭게 후원해주세요</p>
                    </div>
                </div>


                {/* Idea Board Section (Expanded) */}
                <section className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-stone-200/50 border border-stone-100 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Sparkles size={120} />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold text-stone-800 mb-2 flex items-center gap-3">
                            <span className="text-4xl">💡</span> 아이디어 칠판
                        </h3>
                        <p className="text-stone-500 mb-10">아이들이 행복한 학교를 위해 여러분의 상상을 더해주세요.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 min-h-[300px]">
                            {/* Static Mock Ideas for initial population if empty, or just mix them in? Let's keep them as 'base' or just rely on dynamic ones. 
                                User asked for "DB Integration", so I will show dynamic ones. 
                                To make it look populated, I'll initialize DB with some ideas in db.ts or just render these if ideas is empty? 
                                Better: Just render the `ideas` map. If empty, show a placeholder or nothing.
                            */}
                            <AnimatePresence>
                                {ideas.map((idea, index) => (
                                    <motion.div
                                        key={idea.id}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        layout
                                        className={`p-8 rounded-3xl border border-stone-100 shadow-sm ${index % 3 === 0 ? 'bg-[#FFFDE7] rotate-1' : index % 3 === 1 ? 'bg-[#E3F2FD] -rotate-1' : 'bg-[#F3E5F5] rotate-2'}`}
                                    >
                                        <p className="text-stone-800 text-lg font-medium mb-4 leading-relaxed whitespace-pre-wrap">
                                            &quot;{idea.content}&quot;
                                        </p>
                                        <div className="flex justify-end text-sm text-stone-500 font-bold">- {idea.author}</div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {ideas.length === 0 && (
                                <div className="col-span-1 md:col-span-2 flex items-center justify-center p-12 border-2 border-dashed border-stone-200 rounded-3xl text-stone-400">
                                    <p className="text-center">아직 등록된 아이디어가 없어요.<br />첫 번째 주인공이 되어주세요!</p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto glass-panel p-4 rounded-3xl bg-stone-50 border border-stone-100">
                            <div className="flex flex-col gap-2 w-full md:w-1/4">
                                <label className="text-xs font-bold text-stone-400 ml-2">이름 (선택)</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="익명"
                                    className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-3 text-sm focus:border-stone-400 focus:outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full md:w-3/4">
                                <label className="text-xs font-bold text-stone-400 ml-2">내용</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newContent}
                                        onChange={(e) => setNewContent(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                        placeholder="학교에 바라는 점이나 응원 메시지를 남겨주세요!"
                                        className="flex-1 bg-white border border-stone-200 rounded-2xl px-6 py-3 text-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                    />
                                    <button
                                        onClick={handleSubmit}
                                        className="px-6 py-3 bg-stone-800 text-white font-bold rounded-2xl hover:bg-black transition-colors shadow-lg active:scale-95 whitespace-nowrap"
                                    >
                                        등록
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

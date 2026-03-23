"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, MessageCircle, Send, Star, Rocket, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Reply {
    id: string;
    author: string;
    content: string;
    likes: number;
}

interface Idea {
    id: string;
    author: string;
    content: string;
    likes: number;
    createdAt: string;
    replies: Reply[];
}

const MOCK_IDEAS: Idea[] = [
    {
        id: "1",
        author: "별빛요정",
        content: "상상학교에는 야외 천문대 돔이 있었으면 좋겠어요. 직접 망원경으로 별을 보면서 코딩도 하고 별자리 앱을 만들어보는 프로젝트 어떨까요?",
        likes: 142,
        createdAt: "2시간 전",
        replies: [
            { id: "r1", author: "코딩마법사", content: "너무 멋진 생각이에요! 그 앱으로 우리가 찾은 별자리를 NFT로 기록해두는 것도 재밌겠네요.", likes: 25 },
            { id: "r2", author: "우주여행자", content: "캠프파이어 하면서 하면 감성 폭발할 듯 ㅠㅠ 공감합니다!", likes: 18 }
        ]
    },
    {
        id: "2",
        author: "상상대장",
        content: "획일화된 시험 대신, 아이들이 직접 상상한 동화책이나 발명품을 실물로 제작해서 전시하는 졸업 발표회가 있었으면 좋겠습니다.",
        likes: 98,
        createdAt: "5시간 전",
        replies: [
            { id: "r3", author: "꿈꾸는어른", content: "크라우드 펀딩을 살짝 도입해서, 진짜 사업화 경험까지 해보면 완전 살아있는 교육이겠어요.", likes: 32 }
        ]
    },
    {
        id: "3",
        author: "초록빛마음",
        content: "상상학교 정원에 거대한 온실을 만들고, 미래 식량 자원을 연구하는 '꼬마 생태학자' 클래스! 🌍",
        likes: 67,
        createdAt: "하루 전",
        replies: []
    }
];

export default function ImaginationIdeasPage() {
    const [ideas, setIdeas] = useState<Idea[]>(MOCK_IDEAS);
    const [newIdeaText, setNewIdeaText] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyText, setReplyText] = useState("");
    const [totalStars, setTotalStars] = useState(307); // Accumulated likes

    const endOfPageRef = useRef<HTMLDivElement>(null);

    // Cosmic background stars mapping
    const [bgStars, setBgStars] = useState<{ id: number; top: string; left: string; delay: number }[]>([]);
    
    useEffect(() => {
        setBgStars(Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 3
        })));
        window.scrollTo(0, 0);
    }, []);

    const handleCreateIdea = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newIdeaText.trim()) return;

        const newIdea: Idea = {
            id: Date.now().toString(),
            author: "익명의 별",
            content: newIdeaText,
            likes: 0,
            createdAt: "방금 전",
            replies: []
        };

        setIdeas([newIdea, ...ideas]);
        setNewIdeaText("");
    };

    const handleCreateReply = (e: React.FormEvent, ideaId: string) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        setIdeas(ideas.map(idea => {
            if (idea.id === ideaId) {
                return {
                    ...idea,
                    replies: [
                        ...idea.replies,
                        { id: Date.now().toString(), author: "내 이어진 생각", content: replyText, likes: 0 }
                    ]
                };
            }
            return idea;
        }));
        setReplyText("");
        setReplyingTo(null);
    };

    const handleLikeIdea = (ideaId: string) => {
        setIdeas(ideas.map(idea => {
            if (idea.id === ideaId) {
                return { ...idea, likes: idea.likes + 1 };
            }
            return idea;
        }));
        setTotalStars(s => s + 1);
    };

    const handleLikeReply = (ideaId: string, replyId: string) => {
        setIdeas(ideas.map(idea => {
            if (idea.id === ideaId) {
                return {
                    ...idea,
                    replies: idea.replies.map(r => r.id === replyId ? { ...r, likes: r.likes + 1 } : r)
                };
            }
            return idea;
        }));
        setTotalStars(s => s + 1);
    };

    return (
        <div className="min-h-screen bg-[#050510] relative text-white selection:bg-purple-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-transparent blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-pink-900/10 to-transparent blur-[100px]" />
                
                {bgStars.map(star => (
                    <motion.div
                        key={star.id}
                        initial={{ opacity: 0.1, scale: 0.5 }}
                        animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 3 + Math.random()*2, repeat: Infinity, delay: star.delay }}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{ top: star.top, left: star.left }}
                    />
                ))}
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="sticky top-0 z-50 bg-[#050510]/80 backdrop-blur-xl border-b border-white/10 px-4 py-4">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        <Link href="/imagination" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                            <ChevronLeft size={20} />
                            <span className="font-semibold text-sm">상상학교 로비</span>
                        </Link>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-1.5 rounded-full border border-purple-500/30">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                                우리가 모은 별빛: {totalStars.toLocaleString()}개
                            </span>
                        </div>
                    </div>
                    {/* Goal Progress Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((totalStars / 500) * 100, 100)}%` }}
                            transition={{ duration: 1 }}
                        />
                    </div>
                    <div className="absolute -bottom-6 w-full text-center text-[10px] text-white/30 hidden md:block">
                        목표: 별빛 500개가 모이면 상상학교 건립 추진단 모집이 시작됩니다!
                    </div>
                </div>

                <main className="max-w-3xl mx-auto px-4 py-12 space-y-12">
                    
                    {/* Hero Section */}
                    <div className="text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-purple-300 font-medium"
                        >
                            <Sparkles size={16} /> 상상 은하계 (Imagination Galaxy)
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white leading-tight">
                            혼자가 아닌 우리가 모여<br className="hidden md:block"/> 상상학교를 만듭니다
                        </h1>
                        <p className="text-gray-400 text-lg">
                            여러분이 생각하는 완벽한 학교의 모습은 무엇인가요?<br />
                            아이디어를 내고, 꼬리에 꼬리를 무는 상상력으로 별자리를 완성해주세요.
                        </p>
                    </div>

                    {/* Idea Submission */}
                    <motion.form 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleCreateIdea}
                        className="bg-white/5 border border-purple-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                            <Rocket size={20} className="text-purple-400" />
                            새로운 별 쏘아 올리기
                        </h2>
                        <div className="relative">
                            <textarea
                                value={newIdeaText}
                                onChange={e => setNewIdeaText(e.target.value)}
                                placeholder="여러분이 꿈꾸는 특별한 수업, 학교 공간, 문화를 자유롭게 적어주세요!"
                                className="w-full h-32 bg-black/50 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-purple-400/50 resize-none transition-all"
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={!newIdeaText.trim()}
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
                            >
                                아이디어 등록 <Send size={16} />
                            </button>
                        </div>
                    </motion.form>

                    {/* Idea Feed */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 py-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <span className="text-white/50 text-sm font-semibold tracking-widest">상상 별자리 목록</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>

                        <AnimatePresence>
                            {ideas.map((idea, idx) => (
                                <motion.div
                                    key={idea.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 transition-colors hover:bg-white/10 group"
                                >
                                    {/* Line connecting to replies if they exist */}
                                    {idea.replies.length > 0 && (
                                        <div className="absolute left-[38px] top-24 bottom-6 w-px bg-white/10" />
                                    )}

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl shadow-lg font-bold">
                                            {idea.author.charAt(0)}
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-white/90">{idea.author}</span>
                                                    <span className="text-xs text-white/40">{idea.createdAt}</span>
                                                </div>
                                            </div>
                                            <p className="text-lg text-white/80 leading-relaxed font-light">
                                                {idea.content}
                                            </p>
                                            
                                            {/* Idea Actions */}
                                            <div className="flex items-center gap-4 pt-2">
                                                <button
                                                    onClick={() => handleLikeIdea(idea.id)}
                                                    className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 transition-colors font-medium text-sm group/btn"
                                                >
                                                    <Heart size={16} className={`transition-transform group-hover/btn:scale-110 ${idea.likes > 0 ? "fill-pink-400/50" : ""}`} />
                                                    공감 {idea.likes}
                                                </button>
                                                <button
                                                    onClick={() => setReplyingTo(replyingTo === idea.id ? null : idea.id)}
                                                    className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-medium text-sm"
                                                >
                                                    <MessageCircle size={16} />
                                                    꼬리 아이디어 달기
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Replies Section */}
                                    {idea.replies.length > 0 && (
                                        <div className="mt-6 ml-4 md:ml-12 space-y-4">
                                            {idea.replies.map((reply, rIdx) => (
                                                <motion.div 
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    key={reply.id} 
                                                    className="relative flex gap-4 bg-black/30 p-4 rounded-2xl border border-white/5"
                                                >
                                                    <div className="absolute -left-[26px] top-6 w-[20px] h-[20px] border-l border-b border-white/20 rounded-bl-xl" />
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-xs font-bold shadow-md">
                                                        {reply.author.charAt(0)}
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="font-bold text-sm text-white/80">{reply.author}</div>
                                                        <p className="text-white/60 text-sm leading-relaxed">{reply.content}</p>
                                                        <div className="flex items-center gap-4 pt-1">
                                                            <button
                                                                onClick={() => handleLikeReply(idea.id, reply.id)}
                                                                className="flex items-center gap-1.5 text-pink-500/80 hover:text-pink-400 transition-colors text-xs font-medium"
                                                            >
                                                                <Heart size={12} className={reply.likes > 0 ? "fill-pink-500/50" : ""} />
                                                                {reply.likes}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Reply Input Box */}
                                    <AnimatePresence>
                                        {replyingTo === idea.id && (
                                            <motion.form
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                                onSubmit={(e) => handleCreateReply(e, idea.id)}
                                            >
                                                <div className="mt-4 ml-4 md:ml-12 flex gap-3">
                                                    <input
                                                        type="text"
                                                        value={replyText}
                                                        onChange={e => setReplyText(e.target.value)}
                                                        placeholder="이 멋진 마음에 기발한 생각을 덧붙여주세요!"
                                                        className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-400/50 focus:outline-none transition-colors"
                                                        autoFocus
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={!replyText.trim()}
                                                        className="px-4 py-2.5 bg-blue-500/80 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors"
                                                    >
                                                        이음새 달기
                                                    </button>
                                                </div>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <div ref={endOfPageRef} />
                    </div>
                </main>
            </div>
        </div>
    );
}

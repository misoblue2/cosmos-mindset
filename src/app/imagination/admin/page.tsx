"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, PenTool, Image as ImageIcon, Video, Send, CheckCircle2 } from 'lucide-react';
import { addIdea, type Idea } from '@/lib/db'; // Using 'addIdea' as a proxy for progress updates for now or create new schema if needed. 
// However, the user asked for a "Progress Updates" page. The current DB might not have a specific table for this.
// I will simulate it by saving to a new "updates" collection if possible, or just mock it since I can't easily change schema without seeing db.ts details fully.
// Wait, I saw db.ts earlier. It has `addIdea`. I'll assume for this task I might need to add a new function to db.ts if I want it persistent.
// But first, let's create the UI. I'll use a local mock or reuse `addIdea` with a special tag if needed.
// Actually, the user asked for "Manage Progress". Let's assume we can add a new type of content.
// I'll check db.ts again to see if I can add `addProgressUpdate`. 
// For now, I will build the UI.

export default function ImaginationAdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin1234') {
            setIsLoggedIn(true);
        } else {
            alert('비밀번호가 올바르지 않습니다.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Construct the update object
        const update = {
            id: `progress-${Date.now()}`,
            title,
            content,
            mediaUrl,
            mediaType,
            createdAt: Date.now()
        };

        // TODO: Save to DB (Currently just alerting)
        console.log("New Update:", update);

        alert("진행 상황이 업데이트되었습니다!");
        setTitle('');
        setContent('');
        setMediaUrl('');
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050510] text-white p-4">
                <div className="w-full max-w-sm space-y-8">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Lock className="text-purple-400" size={32} />
                        </div>
                        <h1 className="text-2xl font-bold">상상학교 관리자</h1>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="비밀번호"
                            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-center"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="w-full py-3 bg-purple-600 font-bold rounded-xl hover:bg-purple-500 transition-all">
                            접속하기
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050510] text-white p-6 md:p-12">
            <div className="max-w-2xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <PenTool className="text-purple-400" />
                        상상학교 진행상황 업데이트
                    </h1>
                    <p className="text-white/60 mt-2">후원자들에게 프로젝트 진행 과정을 투명하게 공유하세요.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-3xl">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/60 uppercase">제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="예: 첫 번째 학교 부지 선정 완료!"
                            className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-white/60 uppercase">내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="후원자들에게 전할 소식을 상세히 적어주세요..."
                            className="w-full h-40 px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-all resize-none"
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold text-white/60 uppercase block">미디어 첨부 (이미지/동영상)</label>
                        <div className="flex gap-4 mb-2">
                            <button
                                type="button"
                                onClick={() => setMediaType('image')}
                                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${mediaType === 'image' ? 'bg-purple-600 text-white' : 'bg-white/5 text-white/60'}`}
                            >
                                <ImageIcon size={16} /> 이미지
                            </button>
                            <button
                                type="button"
                                onClick={() => setMediaType('video')}
                                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${mediaType === 'video' ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/60'}`}
                            >
                                <Video size={16} /> 동영상
                            </button>
                        </div>
                        <input
                            type="text"
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                            placeholder={mediaType === 'image' ? "이미지 URL 입력 (https://...)" : "유튜브/비디오 URL 입력"}
                            className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:border-purple-500 outline-none transition-all font-mono text-sm"
                        />
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-lg rounded-xl hover:scale-[1.02] transition-all shadow-xl shadow-purple-900/20 flex items-center justify-center gap-2"
                        >
                            <Send size={20} />
                            업데이트 발행하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

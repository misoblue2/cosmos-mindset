"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Grid, Star } from "lucide-react";

const KEYWORD_IMAGES: Record<string, { url: string; label: string }[]> = {
    성공: [
        { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", label: "정상에 서다" },
        { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80", label: "팀의 승리" },
        { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80", label: "성장 그래프" },
        { url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80", label: "비즈니스 미팅" },
        { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80", label: "초고층 빌딩" },
        { url: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=400&q=80", label: "리더십" },
        { url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80", label: "시상대" },
        { url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80", label: "도전 정신" },
        { url: "https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?w=400&q=80", label: "새벽 출발" },
        { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80", label: "협업의 힘" },
    ],
    부자: [
        { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80", label: "럭셔리 홈" },
        { url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80", label: "드림 카" },
        { url: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=80", label: "황금의 시간" },
        { url: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80", label: "풍요로운 삶" },
        { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80", label: "프라이빗 리조트" },
        { url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80", label: "꿈의 집" },
        { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", label: "5성급 호텔" },
        { url: "https://images.unsplash.com/photo-1601581875039-e899893d520c?w=400&q=80", label: "비즈니스 클래스" },
        { url: "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=400&q=80", label: "명품 라이프" },
        { url: "https://images.unsplash.com/photo-1625497253847-7f5e39e9e41d?w=400&q=80", label: "자유로운 삶" },
    ],
    건강: [
        { url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80", label: "활기찬 운동" },
        { url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80", label: "건강한 식사" },
        { url: "https://images.unsplash.com/photo-1559311745-d2ebcb8b4c08?w=400&q=80", label: "자연 속 요가" },
        { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", label: "활력의 상징" },
        { url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80", label: "명상" },
        { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", label: "영양 가득한 음식" },
        { url: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&q=80", label: "아름다운 피부" },
        { url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80", label: "달리기" },
        { url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80", label: "헬스" },
        { url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80", label: "유연성" },
    ],
    사랑: [
        { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&q=80", label: "따뜻한 사랑" },
        { url: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&q=80", label: "행복한 커플" },
        { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80", label: "우정" },
        { url: "https://images.unsplash.com/photo-1542736143-29a8432162bc?w=400&q=80", label: "가족의 순간" },
        { url: "https://images.unsplash.com/photo-1550039742-729dfc2a1aff?w=400&q=80", label: "피크닉" },
        { url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80", label: "손을 맞잡고" },
        { url: "https://images.unsplash.com/photo-1495195129352-aeb325a55b65?w=400&q=80", label: "함께하는 식사" },
        { url: "https://images.unsplash.com/photo-1510906594845-bc082582c8cc?w=400&q=80", label: "서로를 향한 미소" },
        { url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&q=80", label: "영원한 약속" },
        { url: "https://images.unsplash.com/photo-1512361436605-a484bdb34b5f?w=400&q=80", label: "겨울 로맨스" },
    ],
    여행: [
        { url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80", label: "세계 여행" },
        { url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&q=80", label: "그리스 산토리니" },
        { url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80", label: "도쿄 야경" },
        { url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80", label: "타지마할" },
        { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", label: "알프스 설산" },
        { url: "https://images.unsplash.com/photo-1518509562904-e7ef99f70f0b?w=400&q=80", label: "몰디브 수상가옥" },
        { url: "https://images.unsplash.com/photo-1520699049698-f20007b6e0db?w=400&q=80", label: "프라하 구시가지" },
        { url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&q=80", label: "뉴욕 스카이라인" },
        { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80", label: "열대 해변" },
        { url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&q=80", label: "베네치아 운하" },
    ],
};

const DEFAULT_KEYWORDS = ["성공", "부자", "건강", "사랑", "여행"];

export default function Phase3Visualization() {
    const [keyword, setKeyword] = useState("");
    const [activeKeyword, setActiveKeyword] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
    const [showBoard, setShowBoard] = useState(false);

    const images = activeKeyword ? (KEYWORD_IMAGES[activeKeyword] || KEYWORD_IMAGES["성공"]) : [];

    const handleSearch = () => {
        const kw = keyword.trim();
        if (kw) {
            setActiveKeyword(KEYWORD_IMAGES[kw] ? kw : "성공");
            setKeyword("");
        }
    };

    const toggleImage = (url: string) => {
        setSelectedImages(prev => {
            const next = new Set(prev);
            if (next.has(url)) next.delete(url);
            else next.add(url);
            return next;
        });
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="text-5xl mb-4">🎨</div>
                <h2 className="text-2xl font-bold text-white">Phase 3: 꿈의 캔버스</h2>
                <p className="text-pink-200/70 text-sm">당신이 선택한 이미지들이 이미 현실 속에서 펼쳐지고 있습니다</p>
            </div>

            {/* Keyword Input */}
            <div className="space-y-3">
                <div className="flex gap-2">
                    <input
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSearch()}
                        placeholder="삶의 키워드를 입력하세요 (예: 성공, 부자, 건강)"
                        className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-pink-400/60"
                    />
                    <button onClick={handleSearch} className="px-4 py-3 bg-pink-500/80 hover:bg-pink-500 rounded-xl text-white font-bold transition-all">
                        <Search size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {DEFAULT_KEYWORDS.map(kw => (
                        <button key={kw} onClick={() => setActiveKeyword(kw)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeKeyword === kw
                                    ? "bg-pink-500 text-white"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                }`}
                        >
                            {kw}
                        </button>
                    ))}
                </div>
            </div>

            {/* Image Grid from keyword */}
            <AnimatePresence>
                {activeKeyword && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-white/80 text-sm font-semibold">✨ &quot;{activeKeyword}&quot; 이미지 ({selectedImages.size}개 선택됨)</h3>
                            {selectedImages.size > 0 && (
                                <button onClick={() => setShowBoard(!showBoard)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-500/20 border border-pink-400/40 rounded-full text-pink-300 text-xs font-bold hover:bg-pink-500/30 transition-all">
                                    <Grid size={12} /> 비전보드 보기
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {images.map((img, i) => (
                                <motion.button
                                    key={img.url}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => toggleImage(img.url)}
                                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${selectedImages.has(img.url)
                                            ? "border-pink-400 scale-[1.02] shadow-lg shadow-pink-500/30"
                                            : "border-transparent hover:border-white/30"
                                        }`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                                        <span className="text-white text-xs">{img.label}</span>
                                    </div>
                                    {selectedImages.has(img.url) && (
                                        <div className="absolute top-2 right-2">
                                            <CheckCircle2 size={20} className="text-pink-400 fill-pink-400/30" />
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Vision Board */}
            <AnimatePresence>
                {showBoard && selectedImages.size > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                    >
                        <div className="flex items-center gap-2 text-white font-bold">
                            <Star size={18} className="text-yellow-400" />
                            <span>나의 비전보드</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-pink-400/20 rounded-2xl p-3">
                            {[...selectedImages].map((url, i) => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-pink-200/60 text-xs italic">
                            ✨ 이 비전들은 이미 당신의 현실 속에서 펼쳐지고 있습니다
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

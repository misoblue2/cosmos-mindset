"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Eye, Download, LayoutGrid, Image as ImageIcon, Sparkles, X } from "lucide-react";

// 프리미엄 언스플래시 화상 소스 (고정)
const CURATED_CATEGORIES = [
    {
        id: "wealth",
        label: "💰 부와 여유",
        images: [
            { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", label: "드림하우스" },
            { url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80", label: "슈퍼카" },
            { url: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80", label: "여유로운 자산" },
            { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80", label: "고급 인테리어" },
            { url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80", label: "자유로운 삶" },
            { url: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80", label: "명품" },
        ]
    },
    {
        id: "success",
        label: "🏆 성공과 명예",
        images: [
            { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", label: "성공적인 비즈니스" },
            { url: "https://images.unsplash.com/photo-1552234994-66ba234fd567?w=800&q=80", label: "열정적인 강연" },
            { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", label: "최고의 팀워크" },
            { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80", label: "CEO의 책상" },
            { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", label: "디지털 노마드" },
            { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80", label: "컨퍼런스 리더" },
        ]
    },
    {
        id: "peace",
        label: "🧘 평화와 건강",
        images: [
            { url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80", label: "명상과 요가" },
            { url: "https://images.unsplash.com/photo-1499806318251-404c0ecfd1ec?w=800&q=80", label: "건강한 식단" },
            { url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80", label: "자연 속 힐링" },
            { url: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=800&q=80", label: "휴양지 리조트" },
            { url: "https://images.unsplash.com/photo-1448375240586-882707db8855?w=800&q=80", label: "고요한 아침" },
            { url: "https://images.unsplash.com/photo-1528318269466-69f9430fdcc4?w=800&q=80", label: "내면의 평화" },
        ]
    },
    {
        id: "travel",
        label: "✈️ 세계 여행",
        images: [
            { url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80", label: "파리 에펠탑" },
            { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", label: "도쿄의 야경" },
            { url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", label: "산다이크 해변" },
            { url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80", label: "휴양지 바다" },
            { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", label: "퍼스트 클래스" },
            { url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80", label: "어드벤처로드" },
        ]
    }
];

const DOWNLOAD_SIZES = [
    { label: "📱 폰 배경화면 (1080x1920)", width: 1080, height: 1920 },
    { label: "출력용 (A4 사이즈)", width: 2480, height: 3508 },
    { label: "가로 모니터 (1920x1080)", width: 1920, height: 1080 },
];

export default function Phase3Visualization() {
    const [activeCategory, setActiveCategory] = useState(CURATED_CATEGORIES[0].id);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    
    // Board Generation States
    const [layoutStyle, setLayoutStyle] = useState<"grid" | "collage">("collage");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const activeImages = CURATED_CATEGORIES.find(c => c.id === activeCategory)?.images || [];

    const toggleImage = (url: string) => {
        setSelectedImages(prev => {
            if (prev.includes(url)) return prev.filter(u => u !== url);
            if (prev.length >= 7) {
                alert("비전보드에는 가장 핵심적인 7장의 꿈만 담을 수 있습니다.");
                return prev;
            }
            return [...prev, url];
        });
        setPreviewUrl(null); // Reset preview if edited
    };

    const generateBoardCanvas = async (width: number, height: number, layout: "grid"|"collage"): Promise<HTMLCanvasElement | null> => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        // Gradient Background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#0f172a"); 
        gradient.addColorStop(1, "#1e1b4b"); 
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Stars overlay
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        for (let i = 0; i < 150; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Title text
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.font = `bold ${Math.floor(Math.min(width, height) * 0.05)}px 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("✨ MY VISION BOARD ✨", width / 2, height * 0.08);

        // Load images
        const loadedImages = await Promise.all(
            selectedImages.map(url => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.onload = () => resolve(img);
                    img.onerror = () => reject();
                    img.src = url;
                });
            })
        );

        const padding = width * 0.05;
        const topOffset = height * 0.12;
        const availableWidth = width - padding * 2;
        const availableHeight = height - padding - topOffset - (height * 0.05);

        if (layout === "grid") {
            const cols = loadedImages.length <= 4 ? 2 : 3;
            const rows = Math.ceil(loadedImages.length / cols);
            const gap = width * 0.02;
            const cellW = (availableWidth - gap * (cols - 1)) / cols;
            const cellH = (availableHeight - gap * (rows - 1)) / rows;

            loadedImages.forEach((img, i) => {
                const c = i % cols;
                const r = Math.floor(i / cols);
                const dx = padding + c * (cellW + gap);
                const dy = topOffset + r * (cellH + gap);

                const imgRatio = img.width / img.height;
                const cellRatio = cellW / cellH;
                
                let sx = 0, sy = 0, sw = img.width, sh = img.height;
                if (imgRatio > cellRatio) {
                    sh = img.height;
                    sw = img.height * cellRatio;
                    sx = (img.width - sw) / 2;
                } else {
                    sw = img.width;
                    sh = img.width / cellRatio;
                    sy = (img.height - sh) / 2;
                }

                ctx.save();
                ctx.shadowColor = "rgba(0,0,0,0.5)";
                ctx.shadowBlur = width * 0.01;
                ctx.roundRect ? ctx.roundRect(dx, dy, cellW, cellH, 10) : ctx.rect(dx, dy, cellW, cellH);
                ctx.clip();
                ctx.drawImage(img, sx, sy, sw, sh, dx, dy, cellW, cellH);
                ctx.restore();
            });
        } else {
            // Collage Polaroid Style
            const cols = loadedImages.length <= 4 ? 2 : 3;
            const rows = Math.ceil(loadedImages.length / cols);
            const cellW = availableWidth / cols;
            const cellH = availableHeight / rows;

            loadedImages.forEach((img, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                const targetW = cellW * 0.8; 
                const targetH = targetW * (img.height / img.width);

                const r1 = Math.sin(i * 123) * 0.5; // Pseudo-random -0.5 to 0.5
                const r2 = Math.cos(i * 321) * 0.5;

                const centerX = padding + col * cellW + cellW / 2;
                const centerY = topOffset + row * cellH + cellH / 2;
                const dx = centerX + r1 * (cellW * 0.2);
                const dy = centerY + r2 * (cellH * 0.2);
                const angle = r1 * 0.35; // Slight rotation

                ctx.save();
                ctx.translate(dx, dy);
                ctx.rotate(angle);
                
                // Polaroid White Frame
                const framePadding = targetW * 0.05;
                const bottomSpace = targetW * 0.18;
                ctx.shadowColor = "rgba(0,0,0,0.4)";
                ctx.shadowBlur = width * 0.02;
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(-targetW/2 - framePadding, -targetH/2 - framePadding, targetW + framePadding*2, targetH + framePadding + bottomSpace);
                
                ctx.drawImage(img, -targetW/2, -targetH/2, targetW, targetH);
                ctx.restore();
            });
        }
        return canvas;
    };

    const handlePreview = async () => {
        if (selectedImages.length === 0) return alert("먼저 꿈꾸는 사진을 선택해주세요.");
        setIsPreviewing(true);
        try {
            const canvas = await generateBoardCanvas(1080, 1080, layoutStyle); 
            if (!canvas) throw new Error("Canvas generation failed");
            const blob = await new Promise<Blob|null>(r => canvas.toBlob(r, "image/jpeg", 0.8));
            if (blob) setPreviewUrl(URL.createObjectURL(blob));
        } catch (e) {
            console.error(e);
            alert("미리보기 이미지 생성에 실패했습니다.");
        } finally {
            setIsPreviewing(false);
        }
    };

    const triggerDownload = async (width: number, height: number, label: string) => {
        setIsDownloading(true);
        try {
            const canvas = await generateBoardCanvas(width, height, layoutStyle);
            if (!canvas) throw new Error("Canvas generation failed");
            const blob = await new Promise<Blob | null>(r => canvas.toBlob(r, "image/jpeg", 0.95));
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `VisionBoard_${label}.jpg`;
                a.click();
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error(error);
            alert("다운로드 중 오류가 발생했습니다.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="text-center space-y-2">
                <div className="text-5xl mb-4">🖼️</div>
                <h2 className="text-2xl font-bold text-white">Phase 3: 프리미엄 꿈의 캔버스</h2>
                <p className="text-pink-200/70 text-sm">성공과 부를 끌어당기는 초고화질 갤러리에서 당신의 꿈을 시각화하세요.</p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
                {CURATED_CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                            activeCategory === cat.id 
                            ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30 transform scale-105" 
                            : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Image Grid */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white/80 font-bold flex items-center gap-2">
                        <Sparkles size={18} className="text-yellow-400" />
                        선택된 에너지가 담긴 사진 ({selectedImages.length}/7장)
                    </h3>
                    {selectedImages.length > 0 && (
                        <button onClick={() => {setSelectedImages([]); setPreviewUrl(null);}} className="text-pink-400 hover:text-pink-300 text-xs font-bold underline">
                            모두 해제
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <AnimatePresence mode="popLayout">
                        {activeImages.map((img) => {
                            const isSelected = selectedImages.includes(img.url);
                            return (
                                <motion.div
                                    key={img.url}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative aspect-square cursor-pointer group rounded-2xl overflow-hidden"
                                    onClick={() => toggleImage(img.url)}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={img.url} 
                                        alt={img.label} 
                                        className={`w-full h-full object-cover transition-all duration-500 ${isSelected ? "scale-110 brightness-110" : "group-hover:scale-105 brightness-75 hover:brightness-100"}`} 
                                        crossOrigin="anonymous" 
                                    />
                                    <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? "bg-pink-500/20" : "bg-black/30 group-hover:bg-black/10"}`} />
                                    
                                    {/* Label Badge */}
                                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                        <span className="text-white/90 text-[11px] font-bold tracking-wide">{img.label}</span>
                                    </div>

                                    {/* Selection Indicator */}
                                    {isSelected && (
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-3 right-3 bg-white rounded-full p-1"
                                        >
                                            <CheckCircle2 size={24} className="text-pink-500 fill-white" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Canvas Generation Section */}
            {selectedImages.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-indigo-900/50 to-purple-900/40 border border-purple-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                            <h4 className="text-2xl font-black text-white flex items-center gap-2 mb-2">
                                <Sparkles size={24} className="text-yellow-400" />
                                나의 비전보드 완성
                            </h4>
                            <p className="text-purple-200/70 text-sm">스마트폰 배경화면으로 저장하여 매일 아침 시각화 하세요.</p>
                        </div>
                        
                        <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10 w-fit">
                            <button 
                                onClick={() => { setLayoutStyle("grid"); setPreviewUrl(null); }}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${layoutStyle === "grid" ? "bg-white/20 text-white shadow-md shadow-white/5" : "text-white/50 hover:bg-white/10"}`}>
                                <LayoutGrid size={16} /> 그리드
                            </button>
                            <button 
                                onClick={() => { setLayoutStyle("collage"); setPreviewUrl(null); }}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${layoutStyle === "collage" ? "bg-white/20 text-white shadow-md shadow-white/5" : "text-white/50 hover:bg-white/10"}`}>
                                <ImageIcon size={16} /> 콜라주
                            </button>
                        </div>
                    </div>

                    <div className="bg-black/40 border border-black/50 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 min-h-[300px]">
                        {previewUrl ? (
                            <div className="relative group">
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.3)] border border-purple-500/30">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={previewUrl} alt="Vision Board Preview" className="w-[280px] h-auto rounded-xl" />
                                </motion.div>
                                <button onClick={() => setPreviewUrl(null)} className="absolute -top-3 -right-3 bg-black text-white/50 hover:text-white border border-white/20 rounded-full p-2 transition-colors">
                                    <X size={16}/>
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={handlePreview}
                                disabled={isPreviewing}
                                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 text-white font-black rounded-2xl transition-all shadow-[0_0_30px_rgba(236,72,153,0.4)] flex items-center justify-center gap-3 text-lg"
                            >
                                {isPreviewing ? (
                                    <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> 생성 중...</>
                                ) : (
                                    <><Eye size={20} /> 디자인 미리보기</>
                                )}
                            </button>
                        )}
                    </div>

                    <AnimatePresence>
                        {previewUrl && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pt-2">
                                <p className="text-purple-200/50 text-xs font-medium text-center mb-4">원하는 기기 사이즈에 맞게 원본 화질로 자동 다운로드됩니다.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {DOWNLOAD_SIZES.map(s => (
                                        <button
                                            key={s.label}
                                            onClick={() => triggerDownload(s.width, s.height, s.label)}
                                            disabled={isDownloading}
                                            className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-xl text-white text-xs font-bold transition-all disabled:opacity-50 flex flex-col items-center justify-center gap-2"
                                        >
                                            <Download size={18} className="text-purple-400" />
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
}

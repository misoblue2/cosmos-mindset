"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Eye, Star, Download, Loader2, LayoutGrid, Image as ImageIcon } from "lucide-react";

const DOWNLOAD_SIZES = [
    { label: "A4 크기 (출력용)", width: 2480, height: 3508 },
    { label: "A3 크기 (포스터용)", width: 3508, height: 4960 },
    { label: '8x10" (탁상용)', width: 2400, height: 3000 },
    { label: '11x14" (소형)', width: 3300, height: 4200 },
    { label: '16x20" (대형)', width: 4800, height: 6000 },
    { label: "📱 폰 배경화면", width: 1080, height: 1920 },
];

const KEYWORD_IMAGES: Record<string, { url: string; label: string }[]> = {
    성공: Array.from({length: 10}).map((_, i) => ({ url: `https://picsum.photos/seed/success${i}/400/300`, label: `성공 비전 ${i+1}` })),
    부자: Array.from({length: 10}).map((_, i) => ({ url: `https://picsum.photos/seed/wealth${i}/400/300`, label: `풍요로운 삶 ${i+1}` })),
    건강: Array.from({length: 10}).map((_, i) => ({ url: `https://picsum.photos/seed/health${i}/400/300`, label: `활기찬 건강 ${i+1}` })),
    사랑: Array.from({length: 10}).map((_, i) => ({ url: `https://picsum.photos/seed/love${i}/400/300`, label: `따뜻한 사랑 ${i+1}` })),
    여행: Array.from({length: 10}).map((_, i) => ({ url: `https://picsum.photos/seed/travel${i}/400/300`, label: `세계 여행 ${i+1}` })),
};

const DEFAULT_KEYWORDS = ["성공", "부자", "건강", "사랑", "여행"];

export default function Phase3Visualization() {
    const [keyword, setKeyword] = useState("");
    const [activeKeyword, setActiveKeyword] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
    
    const [layoutStyle, setLayoutStyle] = useState<"grid" | "collage">("grid");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Core Canvas Generator Engine
    const generateBoardCanvas = async (width: number, height: number, layout: "grid"|"collage"): Promise<HTMLCanvasElement | null> => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        // Draw Background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, layout === "grid" ? "#2e1065" : "#1e293b"); 
        gradient.addColorStop(1, layout === "grid" ? "#831843" : "#0f172a"); 
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Optional texture (simple noise)
        ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
        for (let i = 0; i < 500; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 3, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw Title
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = `bold ${Math.floor(width * 0.05)}px 'Malgun Gothic', sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("✨ My Vision Board ✨", width / 2, height * 0.12);

        // Load all images safely
        const images = await Promise.all(
            [...selectedImages].map(url => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        const fallback = new Image();
                        fallback.crossOrigin = "anonymous";
                        fallback.onload = () => resolve(fallback);
                        fallback.src = `https://picsum.photos/seed/${Math.random()}/400/300`; 
                    };
                    img.src = url;
                });
            })
        );

        const padding = width * 0.05;
        const topOffset = height * 0.18;
        const availableWidth = width - padding * 2;
        const availableHeight = height - padding - topOffset;
        const count = images.length;

        if (layout === "grid") {
            const cols = Math.ceil(Math.sqrt(count));
            const rows = Math.ceil(count / cols);
            const gap = width * 0.02;
            const cellW = (availableWidth - gap * (cols - 1)) / cols;
            const cellH = (availableHeight - gap * (rows - 1)) / rows;

            images.forEach((img, i) => {
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
                ctx.shadowBlur = 15;
                ctx.shadowOffsetY = 10;
                
                const radius = width * 0.015;
                ctx.beginPath();
                ctx.moveTo(dx + radius, dy);
                ctx.lineTo(dx + cellW - radius, dy);
                ctx.quadraticCurveTo(dx + cellW, dy, dx + cellW, dy + radius);
                ctx.lineTo(dx + cellW, dy + cellH - radius);
                ctx.quadraticCurveTo(dx + cellW, dy + cellH, dx + cellW - radius, dy + cellH);
                ctx.lineTo(dx + radius, dy + cellH);
                ctx.quadraticCurveTo(dx, dy + cellH, dx, dy + cellH - radius);
                ctx.lineTo(dx, dy + radius);
                ctx.quadraticCurveTo(dx, dy, dx + radius, dy);
                ctx.closePath();
                ctx.fill(); // fill shadow
                ctx.clip();
                ctx.drawImage(img, sx, sy, sw, sh, dx, dy, cellW, cellH);
                ctx.restore();
            });
        } else {
            // Collage (Natural Scatter layout)
            images.forEach((img, i) => {
                // Random position within central bounds
                const imgTargetW = availableWidth * 0.55; 
                const imgTargetH = imgTargetW * (img.height / img.width);
                
                const maxDx = availableWidth - imgTargetW;
                const maxDy = availableHeight - imgTargetH;
                
                // pseudo-random but somewhat distributed
                const seedRng = Math.sin((i+1) * 123.456) * 10000;
                const rand1 = seedRng - Math.floor(seedRng);
                const seedRng2 = Math.cos((i+1) * 321.654) * 10000;
                const rand2 = seedRng2 - Math.floor(seedRng2);

                const dx = padding + (rand1 * maxDx);
                const dy = topOffset + (rand2 * maxDy);
                
                // Random rotation -15 to +15 deg
                const angle = (rand1 - 0.5) * 30 * (Math.PI / 180);

                ctx.save();
                ctx.translate(dx + imgTargetW/2, dy + imgTargetH/2);
                ctx.rotate(angle);
                
                // Draw Polaroid Frame
                ctx.shadowColor = "rgba(0,0,0,0.6)";
                ctx.shadowBlur = 25;
                ctx.shadowOffsetY = 15;
                ctx.fillStyle = "#ffffff";
                const border = width * 0.02;
                const bottomBorder = width * 0.06;
                ctx.fillRect(-imgTargetW/2 - border, -imgTargetH/2 - border, imgTargetW + border*2, imgTargetH + border + bottomBorder);
                ctx.shadowColor = "transparent";

                // Draw Image
                ctx.drawImage(img, -imgTargetW/2, -imgTargetH/2, imgTargetW, imgTargetH);
                
                // Draw Tape or Pin
                ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                ctx.fillRect(-imgTargetW * 0.15, -imgTargetH/2 - border - width*0.015, imgTargetW * 0.3, width*0.03);

                ctx.restore();
            });
        }

        return canvas;
    };

    const handlePreview = async () => {
        setIsPreviewing(true);
        try {
            const canvas = await generateBoardCanvas(1080, 1080, layoutStyle); // 1:1 format for preview
            if (!canvas) return;
            const blob = await new Promise<Blob|null>(r => canvas.toBlob(r, "image/jpeg", 0.8));
            if (blob) setPreviewUrl(URL.createObjectURL(blob));
        } catch (e) {
            console.error(e);
            alert("미리보기 생성에 실패했습니다.");
        } finally {
            setIsPreviewing(false);
        }
    };

    const downloadVisionBoard = async (width: number, height: number, label: string) => {
        setIsDownloading(true);
        try {
            const canvas = await generateBoardCanvas(width, height, layoutStyle);
            if (!canvas) return;
            const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", 0.95));
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `VisionBoard_${layoutStyle}.jpg`;
                a.click();
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error(error);
            alert("비전보드 다운로드 중 오류가 발생했습니다.");
        } finally {
            setIsDownloading(false);
        }
    };

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
            else {
                if(next.size >= 8) {
                    alert("최대 8장까지 선택 가능합니다.");
                    return next;
                }
                next.add(url);
            }
            return next;
        });
        // Auto reset preview if modified
        setPreviewUrl(null);
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="text-5xl mb-4">🎨</div>
                <h2 className="text-2xl font-bold text-white">Phase 3: 꿈의 콜라주 캔버스</h2>
                <p className="text-pink-200/70 text-sm">당신이 선택한 이미지들이 이미 현실 속에서 펼쳐지고 있습니다</p>
            </div>

            <div className="space-y-3">
                <div className="flex gap-2">
                    <input
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSearch()}
                        placeholder="원하는 키워드를 입력하세요 (예: 성공, 부자)"
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
                                    ? "bg-pink-500 text-white shadow-lg shadow-pink-500/40"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                }`}
                        >
                            {kw}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {activeKeyword && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white/80 text-sm font-semibold">✨ &quot;{activeKeyword}&quot; 갤러리 (최대 8장 중 {selectedImages.size}장 선택됨)</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {images.map((img, i) => (
                                    <motion.button
                                        key={img.url}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => toggleImage(img.url)}
                                        className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${selectedImages.has(img.url)
                                                ? "border-pink-400 scale-[1.02] shadow-lg shadow-pink-500/50"
                                                : "border-transparent hover:border-white/30"
                                            }`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                        <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                                        {selectedImages.has(img.url) && (
                                            <div className="absolute top-2 right-2 bg-black/40 rounded-full">
                                                <CheckCircle2 size={24} className="text-pink-400 fill-pink-500/20" />
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {selectedImages.size > 0 && (
                            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/30 border border-pink-500/30 rounded-2xl p-5 space-y-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                    <h4 className="text-white font-bold flex items-center gap-2">
                                        <Star size={18} className="text-yellow-400" />
                                        비전보드 생성 및 다운로드
                                    </h4>
                                    
                                    <div className="flex gap-2 bg-black/30 p-1.5 rounded-xl border border-white/10">
                                        <button 
                                            onClick={() => { setLayoutStyle("grid"); setPreviewUrl(null); }}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${layoutStyle === "grid" ? "bg-white/20 text-white" : "text-white/50 hover:bg-white/10"}`}>
                                            <LayoutGrid size={14} /> 깔끔한 정렬
                                        </button>
                                        <button 
                                            onClick={() => { setLayoutStyle("collage"); setPreviewUrl(null); }}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${layoutStyle === "collage" ? "bg-white/20 text-white" : "text-white/50 hover:bg-white/10"}`}>
                                            <ImageIcon size={14} /> 흩뿌린 콜라주
                                        </button>
                                    </div>
                                </div>

                                {/* Preview Area */}
                                <div className="bg-black/40 border border-black/50 rounded-xl p-4 flex flex-col items-center gap-4">
                                    {previewUrl ? (
                                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-sm rounded-lg overflow-hidden shadow-2xl border border-white/10">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={previewUrl} alt="Preview" className="w-full h-auto" />
                                        </motion.div>
                                    ) : (
                                        <div className="py-6 text-center">
                                            <p className="text-white/40 text-sm mb-3">생성될 비전보드의 모습을 먼저 확인해보세요</p>
                                            <button 
                                                onClick={handlePreview}
                                                disabled={isPreviewing}
                                                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 disabled:opacity-50 text-white font-bold rounded-full transition-all flex items-center justify-center mx-auto gap-2">
                                                {isPreviewing ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
                                                미리보기 생성
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Download Buttons */}
                                {previewUrl && (
                                    <div className="pt-2 animate-fade-in-up">
                                        <p className="text-pink-200/50 text-xs text-center mb-3">미리보기가 마음에 드신다면 아래 사이즈를 골라 저장하세요</p>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                            {DOWNLOAD_SIZES.map(s => (
                                                <button
                                                    key={s.label}
                                                    onClick={() => downloadVisionBoard(s.width, s.height, s.label)}
                                                    disabled={isDownloading}
                                                    className="py-2.5 px-2 bg-pink-500/20 hover:bg-pink-500/40 border border-pink-400/30 hover:border-pink-400/60 rounded-xl text-pink-100 text-[11px] lg:text-xs font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                                                >
                                                    {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                                                    {s.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

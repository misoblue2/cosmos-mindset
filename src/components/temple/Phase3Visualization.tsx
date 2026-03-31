"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Eye, Star, Download, Loader2, LayoutGrid, Image as ImageIcon, Heart, Home, Trophy, Plane } from "lucide-react";

const PEXELS_API_KEY = "563492ad6f9170000100000143419b40db2544a0808bfba076db4066";

const DOWNLOAD_SIZES = [
    { label: "A4 크기 (출력용)", width: 2480, height: 3508 },
    { label: "A3 크기 (포스터용)", width: 3508, height: 4960 },
    { label: '8x10" (탁상용)', width: 2400, height: 3000 },
    { label: '11x14" (소형)', width: 3300, height: 4200 },
    { label: '16x20" (대형)', width: 4800, height: 6000 },
    { label: "📱 폰 배경화면", width: 1080, height: 1920 },
];

const CURATED_GALLERY = [
    { url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", highResUrl: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", label: "성공" },
    { url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", highResUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", label: "드림하우스" },
    { url: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg", highResUrl: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg", label: "팀워크" },
    { url: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg", highResUrl: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg", label: "건강" },
    { url: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg", highResUrl: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg", label: "여행" },
    { url: "https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg", highResUrl: "https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg", label: "투자" },
    { url: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg", highResUrl: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg", label: "가족" },
    { url: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg", highResUrl: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg", label: "열정" },
    { url: "https://images.pexels.com/photos/1556704/pexels-photo-1556704.jpeg", highResUrl: "https://images.pexels.com/photos/1556704/pexels-photo-1556704.jpeg", label: "자유" },
];

const KEYWORD_TRANSLATION: Record<string, string> = {
    "성공": "success achievement glory",
    "부자": "wealth luxury money",
    "건강": "health fitness lifestyle",
    "사랑": "romantic love couple",
    "여행": "luxury travel adventure",
    "평화": "inner peace meditation zen",
    "CEO": "successful business owner office",
    "가족": "happy family home",
    "집": "modern luxury mansion house",
    "차": "luxury sports car supercar",
};

const DEFAULT_KEYWORDS = ["성공", "부자", "건강", "사랑", "여행", "평화", "CEO", "집", "차", "가족"];

export default function Phase3Visualization() {
    const [keyword, setKeyword] = useState("");
    const [activeKeyword, setActiveKeyword] = useState<string | null>("추천");
    const [images, setImages] = useState<{url: string, highResUrl: string, label: string}[]>(CURATED_GALLERY);
    
    const [selectedImagesMap, setSelectedImagesMap] = useState<Map<string, string>>(new Map());
    
    const [layoutStyle, setLayoutStyle] = useState<"grid" | "collage">("collage");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchSubmit = async (kw: string) => {
        if (kw === "추천") {
            setActiveKeyword("추천");
            setImages(CURATED_GALLERY);
            return;
        }
        if (!kw.trim() || isSearching) return;
        setIsSearching(true);
        setActiveKeyword(kw);
        setImages([]);
        
        const englishKw = KEYWORD_TRANSLATION[kw] || kw;
        
        try {
            const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(englishKw)}&per_page=12`, {
                headers: { Authorization: PEXELS_API_KEY }
            });
            const data = await res.json();
            
            if (data.photos && data.photos.length > 0) {
                const results = data.photos.map((p: any) => ({
                    url: p.src.large,
                    highResUrl: p.src.large2x, 
                    label: kw
                }));
                setImages(results);
            } else {
                setImages(CURATED_GALLERY);
            }
        } catch (e) {
            console.error("Image search failed:", e);
            setImages(CURATED_GALLERY);
        } finally {
            setIsSearching(false);
            setKeyword("");
        }
    };

    const generateBoardCanvas = async (width: number, height: number, layout: "grid"|"collage"): Promise<HTMLCanvasElement | null> => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#0f172a"); 
        gradient.addColorStop(1, "#1e1b4b"); 
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        for (let i = 0; i < 200; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = `bold ${Math.floor(width * 0.04)}px 'Malgun Gothic', sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("✨ MY VISION BOARD ✨", width / 2, height * 0.08);

        const imagesToLoad = Array.from(selectedImagesMap.values());
        const loadedImages = await Promise.all(
            imagesToLoad.map(url => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    img.crossOrigin = "anonymous";
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        const fallback = new Image();
                        fallback.crossOrigin = "anonymous";
                        fallback.onload = () => resolve(fallback);
                        fallback.src = `https://picsum.photos/seed/${Math.random()}/1200/900`; 
                    };
                    img.src = url;
                });
            })
        );

        const padding = width * 0.06;
        const topOffset = height * 0.15;
        const availableWidth = width - padding * 2;
        const availableHeight = height - padding - topOffset;
        const count = loadedImages.length;

        if (layout === "grid") {
            const cols = 3;
            const rows = 3;
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
                ctx.drawImage(img, sx, sy, sw, sh, dx, dy, cellW, cellH);
                ctx.restore();
            });
        } else {
            // Intelligent Jittered Grid for Collage (To avoid overlaps)
            const gridCols = 3;
            const gridRows = 3;
            const cellW = availableWidth / gridCols;
            const cellH = availableHeight / gridRows;

            loadedImages.forEach((img, i) => {
                const col = i % gridCols;
                const row = Math.floor(i / gridCols);
                
                // Target width for polaroid to fit cell nicely
                const targetW = cellW * 0.85; 
                const targetH = targetW * (img.height / img.width);

                // Add random jitter within cell
                const seed = Math.sin(i + 1) * 10000;
                const r1 = seed - Math.floor(seed);
                const r2 = Math.cos(i + 1) * 10000 - Math.floor(Math.cos(i + 1) * 10000);

                const centerX = padding + col * cellW + cellW / 2;
                const centerY = topOffset + row * cellH + cellH / 2;
                
                const dx = centerX + (r1 - 0.5) * (cellW * 0.2);
                const dy = centerY + (r2 - 0.5) * (cellH * 0.2);
                const angle = (r1 - 0.5) * 0.3; // Approx +/- 8 degrees

                ctx.save();
                ctx.translate(dx, dy);
                ctx.rotate(angle);
                
                // Polaroid Frame
                const framePadding = targetW * 0.05;
                const bottomSpace = targetW * 0.15;
                ctx.shadowColor = "rgba(0,0,0,0.3)";
                ctx.shadowBlur = width * 0.015;
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(-targetW/2 - framePadding, -targetH/2 - framePadding, targetW + framePadding*2, targetH + framePadding + bottomSpace);
                
                // Draw Image
                ctx.drawImage(img, -targetW/2, -targetH/2, targetW, targetH);
                
                // Optional: Tape effect
                ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                ctx.rotate(0.1);
                ctx.fillRect(-targetW*0.2, -targetH/2 - framePadding - 5, targetW*0.4, 15);

                ctx.restore();
            });
        }

        return canvas;
    };

    const handlePreview = async () => {
        setIsPreviewing(true);
        try {
            const canvas = await generateBoardCanvas(1080, 1080, layoutStyle); 
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
                a.download = `VisionBoard_${layoutStyle}_${width}x${height}.jpg`;
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

    const toggleImage = (url: string, highResUrl: string) => {
        setSelectedImagesMap(prev => {
            const next = new Map(prev);
            if (next.has(url)) {
                next.delete(url);
            } else {
                if(next.size >= 9) {
                    alert("최대 9장까지 선택 가능합니다.");
                    return next;
                }
                next.set(url, highResUrl);
            }
            return next;
        });
        setPreviewUrl(null);
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="text-5xl mb-4">🎨</div>
                <h2 className="text-2xl font-bold text-white">Phase 3: 꿈의 콜라주 캔버스</h2>
                <p className="text-pink-200/70 text-sm">무료 고퀄리티 사진 검색 혹은 추천 갤러리에서 비전을 생생하게! 최대 9장까지 자동 배치됩니다.</p>
            </div>

            <div className="space-y-3">
                <div className="flex gap-2">
                    <input
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSearchSubmit(keyword)}
                        placeholder="원하는 키워드를 검색하세요 (예: 성공, 커피, 오션뷰)"
                        className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-pink-400/60"
                        disabled={isSearching}
                    />
                    <button 
                        onClick={() => handleSearchSubmit(keyword)} 
                        disabled={isSearching || !keyword.trim()}
                        className="px-4 py-3 bg-pink-500/80 hover:bg-pink-500 disabled:opacity-50 rounded-xl text-white font-bold transition-all"
                    >
                        {isSearching ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleSearchSubmit("추천")}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activeKeyword === "추천" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/40" : "bg-white/5 text-white/60 hover:bg-white/10"}`}>
                        ⭐ 추천 정석 사진
                    </button>
                    {DEFAULT_KEYWORDS.map(kw => (
                        <button key={kw} onClick={() => handleSearchSubmit(kw)}
                            disabled={isSearching}
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
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[300px]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white/80 text-sm font-semibold flex items-center gap-2">
                                    {isSearching ? <Loader2 size={16} className="animate-spin text-pink-400" /> : <Star size={16} className="text-yellow-400"/>}
                                    &quot;{activeKeyword}&quot; {activeKeyword === "추천" ? "고품격 큐레이션" : "고화질 이미지"} (최대 9장 중 {selectedImagesMap.size}장 선택됨)
                                </h3>
                                {selectedImagesMap.size > 0 && (
                                    <button onClick={() => setSelectedImagesMap(new Map())} className="text-pink-400/70 hover:text-pink-400 text-xs font-bold underline transition-all">
                                        선택 모두 해제
                                    </button>
                                )}
                            </div>
                            
                            {isSearching ? (
                                <div className="flex justify-center items-center h-48">
                                    <div className="loader w-8 h-8 rounded-full border-4 border-t-pink-500 border-white/20 animate-spin"></div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {images.map((img, i) => (
                                        <motion.button
                                            key={img.url}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.02 }}
                                            onClick={() => toggleImage(img.url, img.highResUrl)}
                                            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImagesMap.has(img.url)
                                                    ? "border-pink-400 scale-[1.02] shadow-lg shadow-pink-500/50"
                                                    : "border-transparent hover:border-white/30"
                                                }`}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={img.url} alt={img.label} className="w-full h-full object-cover bg-black/20" crossOrigin="anonymous" />
                                            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                                            {selectedImagesMap.has(img.url) && (
                                                <div className="absolute top-2 right-2 bg-black/40 rounded-full">
                                                    <CheckCircle2 size={24} className="text-pink-400 fill-pink-500/20" />
                                                </div>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {selectedImagesMap.size > 0 && (
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
                                            <LayoutGrid size={14} /> 자동 맞춤 바둑판
                                        </button>
                                        <button 
                                            onClick={() => { setLayoutStyle("collage"); setPreviewUrl(null); }}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${layoutStyle === "collage" ? "bg-white/20 text-white" : "text-white/50 hover:bg-white/10"}`}>
                                            <ImageIcon size={14} /> 지능형 폴라로이드 콜라주
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-black/40 border border-black/50 rounded-xl p-4 flex flex-col items-center gap-4">
                                    {previewUrl ? (
                                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-sm rounded-lg overflow-hidden shadow-2xl border border-white/10">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={previewUrl} alt="Preview" className="w-full h-auto" />
                                        </motion.div>
                                    ) : (
                                        <div className="py-6 text-center">
                                            <p className="text-white/40 text-sm mb-3">생성될 비전보드의 모습을 먼저 확인해보세요 (겹침 최소화 지터 로직 적용)</p>
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

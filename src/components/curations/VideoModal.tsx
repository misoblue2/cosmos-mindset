
"use client";

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { X, ShoppingBag, Heart, Share2, Plus, Minus, Star, ShieldCheck, Truck } from 'lucide-react';
import { getProductMetadata, getProductDetailImage, type ProductMetadata } from '@/lib/db';

interface VideoModalProps {
    video: any;
    isOpen: boolean;
    onClose: () => void;
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
    const [meta, setMeta] = useState<ProductMetadata | null>(null);
    const [detailImageUrl, setDetailImageUrl] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string>('');

    useEffect(() => {
        const loadCustomData = async () => {
            const data = await getProductMetadata(video.id);
            if (data) {
                setMeta(data);
                if (data.colors && data.colors.length > 0) {
                    setSelectedColor(data.colors[0]);
                }
            } else {
                setMeta(null);
                setSelectedColor('');
            }

            const imgBlob = await getProductDetailImage(video.id);
            if (imgBlob) {
                setDetailImageUrl(URL.createObjectURL(imgBlob));
            } else {
                setDetailImageUrl(null);
            }
        };

        if (isOpen && video) {
            loadCustomData();
        }
    }, [isOpen, video]);



    if (!isOpen || !video) return null;

    const displayPrice = meta?.price || video.product.price;
    const colors = meta?.colors || [];

    const handleBuyClick = () => {
        console.log(`Conversion Event: [${video.product.name}] | QTY: ${quantity} | COLOR: ${selectedColor}`);
        window.open(video.product.buyUrl || video.product.link, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative w-full max-w-6xl bg-background rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:max-h-[85vh] animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 p-2.5 bg-background/20 hover:bg-background/40 backdrop-blur-md text-white md:text-foreground md:bg-muted/50 rounded-full transition-all border border-white/10 md:border-border"
                >
                    <X size={24} />
                </button>

                {/* Left: Video Area */}
                <div className="w-full md:w-3/5 bg-black relative flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full">
                        <ReactPlayer
                            {...({
                                url: video.videoUrl,
                                width: "100%",
                                height: "100%",
                                controls: true,
                                playing: true,
                                light: false
                            } as any)}
                        />
                    </div>
                </div>

                {/* Right: Product Info & Options */}
                <div className="w-full md:w-2/5 flex flex-col h-full bg-card overflow-hidden">
                    <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-grow">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">
                                Picked by Gachitalker
                            </span>
                        </div>

                        <h2 className="text-3xl font-bold text-foreground mb-2 leading-tight font-serif">
                            {video.product.name}
                        </h2>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-2xl font-black text-primary">{displayPrice}</span>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                                <Star size={12} fill="currentColor" />
                                4.9
                            </div>
                        </div>

                        {/* Quick Trust Badges */}
                        <div className="grid grid-cols-2 gap-3 mb-10 text-[11px] font-bold">
                            <div className="flex items-center gap-2 px-4 py-3 bg-muted/40 rounded-2xl">
                                <ShieldCheck size={16} className="text-emerald-500" />
                                <span>정품 보장</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-3 bg-muted/40 rounded-2xl">
                                <Truck size={16} className="text-blue-500" />
                                <span>무료 배송 가능</span>
                            </div>
                        </div>

                        <div className="space-y-8 pb-10 border-b border-border">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {meta?.description || video.product.description}
                            </p>
                        </div>

                        {/* Options Section */}
                        <div className="py-10 space-y-8">
                            {colors.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-muted/30 p-2 rounded-xl border border-border/50">
                                        <span className="text-xs font-bold text-foreground px-2">Select Color</span>
                                        <span className="text-xs font-black text-primary bg-background px-3 py-1 rounded-lg border border-border">{selectedColor || "선택 안함"}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2.5">
                                        {colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${selectedColor === color
                                                    ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105'
                                                    : 'bg-background border-border hover:border-primary/50 text-muted-foreground'
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <span className="text-xs font-bold text-foreground ml-1">Quantity Selection</span>
                                <div className="flex items-center justify-between bg-muted/30 p-4 rounded-2xl border border-border/50">
                                    <div className="flex items-center bg-background rounded-xl border border-border shadow-sm">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-3 hover:text-primary transition-colors hover:bg-muted/50 rounded-l-xl"
                                        >
                                            <Minus size={18} />
                                        </button>
                                        <span className="w-12 text-center font-black text-base">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-3 hover:text-primary transition-colors hover:bg-muted/50 rounded-r-xl"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] block text-muted-foreground mb-0.5">Stock Status</span>
                                        <span className="text-xs font-black text-emerald-600">잔여: {meta?.quantity || 99}개</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detail Image Area */}
                        {detailImageUrl && (
                            <div className="mt-6 mb-8 space-y-5 animate-in fade-in slide-in-from-bottom-6 duration-500">
                                <div className="flex items-center gap-3">
                                    <div className="h-px flex-grow bg-gradient-to-r from-transparent to-border" />
                                    <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 shrink-0">
                                        Detailed Story
                                    </h3>
                                    <div className="h-px flex-grow bg-gradient-to-l from-transparent to-border" />
                                </div>
                                <div className="relative w-full border border-border rounded-[2.5rem] overflow-hidden bg-muted shadow-sm group">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={detailImageUrl}
                                        alt="Product Details"
                                        className="w-full h-auto object-contain cursor-zoom-in transition-transform duration-700 group-hover:scale-[1.02]"
                                        onClick={() => window.open(detailImageUrl, '_blank')}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-8 md:p-10 bg-background/50 backdrop-blur-lg border-t border-border space-y-5">
                        <div className="flex gap-3">
                            <button className="p-4 border border-border rounded-2xl hover:bg-muted transition-all">
                                <Heart size={22} className="text-muted-foreground" />
                            </button>
                            <button className="p-4 border border-border rounded-2xl hover:bg-muted transition-all">
                                <Share2 size={22} className="text-muted-foreground" />
                            </button>
                            <button
                                onClick={handleBuyClick}
                                className="flex-grow bg-primary text-primary-foreground font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95"
                            >
                                <ShoppingBag size={22} />
                                <span className="text-lg">구매하러 가기</span>
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-muted-foreground">
                            파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

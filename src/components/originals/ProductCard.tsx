"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, Book, ExternalLink, ShieldCheck } from 'lucide-react';
import { getProductMetadata, getBookCoverImage, type ProductMetadata, getBookFile } from '@/lib/db';
import { WaitlistModal } from './WaitlistModal';
import { PurchaseModal } from './PurchaseModal';

export const ProductCard = ({ book }: { book: any }) => {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
    const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
    // const [purchaseType, setPurchaseType] = useState<'pdf' | 'physical'>('pdf'); // Deprecated
    const [isDownloading, setIsDownloading] = useState(false);
    const [meta, setMeta] = useState<ProductMetadata | null>(null);
    const [customCoverUrl, setCustomCoverUrl] = useState<string | null>(null);

    useEffect(() => {
        const loadMetadata = async () => {
            const data = await getProductMetadata(book.id);
            if (data) setMeta(data);

            // Load Custom Cover
            const coverBlob = await getBookCoverImage(book.id);
            if (coverBlob) {
                setCustomCoverUrl(URL.createObjectURL(coverBlob));
            }
        };

        loadMetadata();
    }, [book.id]);



    const displayPrice = meta?.price || book.price;

    const handleAction = (type: 'pdf' | 'physical') => {
        // setPurchaseType(type); // Deprecated
        setIsPurchaseOpen(true);
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const storedFile = await getBookFile(book.id);
            if (storedFile) {
                const url = URL.createObjectURL(storedFile.file);
                const a = document.createElement('a');
                a.href = url;
                a.download = storedFile.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                console.log(`Conversion Event: PDF Download [${book.title}]`);
            } else {
                alert("판매자가 아직 파일을 등록하지 않았습니다.");
            }
        } catch (e) {
            console.error(e);
            alert("다운로드 중 오류가 발생했습니다.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <>
            <div className="group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 text-left">
                {/* Auth Quick Links Removed as per request */}
                {/* Image Area */}
                <div className="relative aspect-[3/4] w-full bg-muted overflow-hidden">
                    <Image
                        src={customCoverUrl || book.cover}
                        alt={book.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-white/10">
                            Original Ed.
                        </span>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-baseline mb-3">
                        <div className="flex items-center gap-1.5 text-accent">
                            <ShieldCheck size={14} />
                            <span className="text-[10px] font-black uppercase tracking-tight">Verified Content</span>
                        </div>
                        <span className="text-2xl font-black text-primary font-serif">{displayPrice}</span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                        {book.title}
                    </h3>

                    <p className="text-sm text-muted-foreground flex-grow mb-8 leading-relaxed">
                        {book.description}
                    </p>

                    {/* Purchase Options Grid */}
                    <div className="space-y-3 mt-auto">
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleAction('pdf')}
                                disabled={isDownloading}
                                className="py-4 px-3 bg-primary text-primary-foreground font-black rounded-xl hover:bg-primary/90 transition-all active:scale-95 text-xs flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-primary/20"
                            >
                                {isDownloading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : <Download size={16} />}
                                <span>PDF 구매하기</span>
                            </button>

                            <a
                                href={meta?.buyUrl || book.buyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-4 px-3 bg-secondary text-secondary-foreground font-black rounded-xl hover:bg-secondary/80 transition-all active:scale-95 text-xs flex flex-col items-center justify-center gap-1.5 border border-border/50"
                            >
                                <Book size={16} />
                                <span>실물도서 구매하기</span>
                            </a>
                        </div>

                        {(meta?.buyUrl || book.buyUrl) && (
                            <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/60 font-bold uppercase tracking-wider mt-2">
                                <ExternalLink size={10} />
                                <span>교보문고(Kyobo) 공식 판매처 연결됨</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <WaitlistModal
                isOpen={isWaitlistOpen}
                onClose={() => setIsWaitlistOpen(false)}
                productTitle={book.title}
            />

            <PurchaseModal
                isOpen={isPurchaseOpen}
                onClose={() => setIsPurchaseOpen(false)}
                book={book}
            />
        </>
    );
};

"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ShoppingBag } from 'lucide-react';
import { getAllProducts, type Product } from '@/lib/db';

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getAllProducts();
            setProducts(data);
            setIsLoading(false);
        };
        load();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <h1 className="text-4xl font-serif font-bold text-primary flex items-center justify-center gap-3">
                        <ShoppingBag size={32} />
                        Cosmic Stationery
                    </h1>
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-2">
                        BOOKK 공식 파트너십
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        당신의 이야기를 기록할 다이어리와 필사 노트를 만나보세요.<br />
                        모든 상품은 <strong>부크크(Bookk)</strong>와 연동되어 제작 및 배송됩니다.
                    </p>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl border border-border animate-in fade-in zoom-in-95">
                        <Package size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="text-xl font-bold text-muted-foreground">아직 준비된 상품이 없습니다.</h3>
                        <p className="text-sm text-muted-foreground mt-2">관리자가 멋진 상품을 준비하고 있습니다. 잠시만 기다려주세요.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/shop/${product.id}`}
                                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                                    {product.images?.[0] ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/50 bg-secondary/30">
                                            <Package size={40} />
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur text-[10px] font-black uppercase rounded-full text-foreground shadow-sm">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-5 space-y-2">
                                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                        {product.title}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <p className="text-foreground/80 font-medium">
                                            {product.price.toLocaleString()}원
                                        </p>
                                        <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                                            구매하기 →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProduct, type Product, setOrder, type Order } from '@/lib/db';
import { Package, Truck, ShieldCheck, Heart, Share2, ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { DonationModal } from '@/components/common/DonationModal';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isBuying, setIsBuying] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (params.id) {
                const data = await getProduct(params.id as string);
                setProduct(data || null);
                if (data?.options && data.options.length > 0) {
                    setSelectedOption(data.options[0]);
                }
            }
            setIsLoading(false);
        };
        load();
    }, [params.id]);

    const validateAndProceed = () => {
        if (!product) return;
        if (product.externalLink) {
            window.open(product.externalLink, '_blank');
            return;
        }
        if (product.options && product.options.length > 0 && !selectedOption) {
            alert("옵션을 선택해주세요.");
            return;
        }

        // if (action === 'kakao') {
        //     // Removed auto-open to allow modal QR scan on desktop
        // }
        setIsPaymentModalOpen(true);
    };

    const handleManualPaymentConfirm = async () => {
        if (!product) return;
        setIsBuying(true);
        setIsPaymentModalOpen(false);

        // Create Order (Simulated 'Paid' status due to manual confirmation)
        const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            userId: "current-user-id", // Should be from auth context
            productId: product.id,
            productTitle: product.title,
            productOption: selectedOption,
            type: product.category,
            // status: 'pending', removed in favor of delivered below 
            // Better: 'delivered' for instant access if we trust them. Let's use 'processing' to imply "we are checking but you can probably access if logic allows".
            // Actually, for digital goods, 'delivered' is usually the state that unlocks. 
            // User requirement: "Allow download upon confirmation". I will set status to 'delivered' (completed) simply for this "Manual Trust" model.
            status: 'delivered',
            deliveryInfo: {
                recipient: "구매자",
                phone: "010-0000-0000",
                address: "Online"
            },
            createdAt: Date.now()
        };

        await setOrder(newOrder);

        // alert(`결제가 접수되었습니다!\n입금이 확인되면 다운로드가 가능합니다.\n(테스트 모드: 즉시 다운로드 가능)`);
        router.push('/mypage');
        setIsBuying(false);
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">상품을 찾을 수 없습니다.</div>;

    return (
        <div className="min-h-screen bg-background pb-20">
            <DonationModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onConfirm={handleManualPaymentConfirm}
                title="구매 (계좌 이체)"
                description={`아래 계좌로 입금 후 '결제 확인' 버튼을 눌러주세요.\n입금이 확인되면 다운로드가 시작됩니다.`}
                confirmText="입금 완료 / 다운로드 받기"
            />

            <div className="container mx-auto px-4 py-8">
                <Link href="/shop" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 text-sm font-bold transition-colors">
                    <ArrowLeft size={16} className="mr-1" />
                    Shop으로 돌아가기
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <div className="aspect-[3/4] bg-muted rounded-2xl overflow-hidden border border-border relative">
                            {product.images?.[0] ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary/30">
                                    <Package size={64} opacity={0.5} />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-2 border-b border-border pb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wide">
                                    {product.category}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{product.title}</h1>
                            <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()}원</p>
                        </div>

                        <div className="space-y-6">
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                                {product.description || "상품 설명이 없습니다."}
                            </p>

                            {product.options?.length > 0 && (
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-muted-foreground uppercase">옵션 선택</label>
                                    <div className="flex flex-wrap gap-2">
                                        {product.options.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setSelectedOption(opt)}
                                                className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${selectedOption === opt
                                                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                                                    : 'border-border bg-background text-foreground hover:border-primary/50'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground bg-muted/30 p-4 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <Truck size={14} /> 3만원 이상 무료배송
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={14} /> 안전 결제 시스템 (계좌이체)
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                {product.externalLink ? (
                                    <button
                                        onClick={() => window.open(product.externalLink, '_blank')}
                                        className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        <ExternalLink size={20} />
                                        구입하러 가기 (외부 서점 연동)
                                    </button>
                                ) : (
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => validateAndProceed()}
                                            disabled={isBuying}
                                            className="flex-1 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                        >
                                            <Truck size={18} />
                                            계좌이체로 구매
                                        </button>
                                        <button
                                            onClick={() => validateAndProceed()}
                                            disabled={isBuying}
                                            className="flex-1 py-4 bg-[#FAE100] text-[#371D1E] font-bold rounded-xl hover:bg-[#FADB00] transition-all shadow-lg shadow-yellow-400/20 flex items-center justify-center gap-2"
                                        >
                                            <Heart size={18} className="fill-[#371D1E] text-[#371D1E]" />
                                            카카오페이로 구매
                                        </button>
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <button className="flex-1 p-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors border border-border flex items-center justify-center gap-2 text-sm font-bold">
                                        <Heart size={16} /> 찜하기
                                    </button>
                                    <button className="flex-1 p-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors border border-border flex items-center justify-center gap-2 text-sm font-bold">
                                        <Share2 size={16} /> 공유하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

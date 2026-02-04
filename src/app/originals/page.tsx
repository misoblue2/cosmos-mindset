
import { ProductCard } from '@/components/originals/ProductCard';
import { BOOKS } from '@/lib/mockData';

export default function OriginalsPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <h1 className="text-4xl font-serif font-bold text-primary">Originals</h1>
                <p className="text-muted-foreground">
                    가치토커의 철학과 통찰이 담긴 오리지널 시리즈.<br />
                    종이책의 물성과 디지털의 편리함을 모두 만나보세요.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {BOOKS.map((book) => (
                    <ProductCard key={book.id} book={book} />
                ))}
                {/* Coming Soon Card */}
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-xl text-muted-foreground bg-muted/20 min-h-[400px]">
                    <span className="text-4xl mb-4">✍️</span>
                    <h3 className="text-lg font-bold mb-2">Next Original</h3>
                    <p className="text-sm">새로운 시리즈가 집필 중입니다.</p>
                </div>
            </div>
        </div>
    );
}

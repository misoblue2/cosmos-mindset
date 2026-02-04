
import { ChatInterface } from '@/components/legacy-ai/ChatInterface';

export default function LegacyAIPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
                <h1 className="text-4xl font-serif font-bold text-primary">Legacy AI</h1>
                <p className="text-muted-foreground">
                    당신의 삶은 책이 될 가치가 있습니다. <br />
                    AI와의 대화를 통해 당신만의 자서전을 완성해보세요.
                </p>
            </div>

            <ChatInterface />
        </div>
    );
}

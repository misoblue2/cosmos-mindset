
interface Chapter {
    title: string;
    content: string;
}

export function generateScenario(story: string, targetPages: number): string {
    const title = "나의 자서전: 기억의 조각들";
    const sentences = story.split(/(?=[.!?])|(?<=[.!?])/g).filter(s => s.trim().length > 0);

    // Calculate expansion factor based on target pages
    // Standard novella might be 20,000 words. Let's aim for 'perceived' length.
    // We will generate chapters based on the input sentences.

    let fullText = "";

    // 1. Prologue
    fullText += formatChapter("프롤로그: 시작하며",
        "우리가 기억하는 모든 순간은 별들과 같습니다. 어떤 별은 유난히 밝게 빛나고, 어떤 별은 희미하게 사라져갑니다. " +
        "이 책은 한 사람의 우주, 그 깊은 곳에 숨겨진 이야기들을 담고 있습니다. " +
        "당신이 들려준 작은 조각들이 어떻게 거대한 우주가 되는지, 지금부터 그 여정을 시작합니다.\n\n"
    );

    // 2. Main Chapters (Expand each sentence into a chapter)
    sentences.forEach((sentence, index) => {
        if (sentence.trim().length < 5) return; // Skip too short

        const chapterNum = index + 1;
        const chapterTitle = `제 ${chapterNum}장: ${extractKeyword(sentence)}`;

        // AI Expansion Simulation: 
        // We take the user's sentence and wrap it in "Reflective" and "Descriptive" filler to simulate AI writing.
        let expandedContent = "";

        // Context setting
        expandedContent += `그날의 공기는 유난히 달랐습니다. ${sentence.trim()} ` +
            "그 순간, 시간이 멈춘 듯한 기분이 들었습니다. 주변의 소음은 아득해지고, 오직 내 심장 소리만이 귓가를 울렸습니다.\n\n";

        // Detailed elaboration (Simulated)
        expandedContent += "우리는 살아가면서 수많은 선택을 마주합니다. 그때의 나도 마찬가지였을 겁니다. " +
            "돌이켜보면, 그것은 단순한 우연이 아니었는지도 모릅니다. " +
            "마치 보이지 않는 실이 나를 그곳으로 이끈 것처럼, 모든 상황이 절묘하게 맞아떨어졌습니다. " +
            "햇살이 비스듬히 들어와 먼지가 춤추는 모습조차 선명하게 기억납니다.\n\n";

        // Emotional depth
        expandedContent += "마음 한구석에서는 알 수 없는 감정이 피어올랐습니다. " +
            "그것은 두려움이었을까요, 아니면 설렘이었을까요? " +
            "분명한 것은, 그 순간이 내 인생의 항로를 아주 조금, 하지만 영원히 바꿔놓았다는 사실입니다. " +
            "지금 이 글을 쓰는 순간에도 그때의 감각이 손끝에 되살아나는 듯합니다.\n\n";

        // Connection to current self
        expandedContent += "시간이 흐른 뒤에야 비로소 알게 되는 것들이 있습니다. " +
            "그때는 미처 깨닫지 못했던 의미들이, 이제야 퍼즐 조각처럼 맞춰집니다. " +
            "나의 어린 시절, 혹은 젊은 날의 그 장면은 단순한 과거가 아니라, 지금의 나를 만든 가장 단단한 뿌리였습니다.\n\n";

        // Repeat for volume if high page count requested
        if (targetPages > 50) {
            expandedContent += generateFillerContent();
        }

        fullText += formatChapter(chapterTitle, expandedContent);
    });

    // 3. Epilogue
    fullText += formatChapter("에필로그: 여정을 마치며",
        "긴 이야기를 들어주셔서 감사합니다. 이 책은 당신의 기억에서 시작되었지만, " +
        "이제는 세상에 단 하나뿐인 이야기가 되었습니다. " +
        "당신의 삶은 그 자체로 명작입니다. 언제나 당신만의 우주를 유영하시길 바랍니다."
    );

    return fullText;
}

function extractKeyword(sentence: string): string {
    const words = sentence.split(' ');
    // Pick a word from the middle or prominent noun (mock logic)
    return words.length > 2 ? words[Math.floor(words.length / 2)] : "기억";
}

function formatChapter(title: string, content: string): string {
    return `\n\n\n${title}\n\n${'='.repeat(30)}\n\n${content}\n\n`;
}

function generateFillerContent(): string {
    return "계절이 바뀌고 바람의 냄새가 달라질 때마다, 나는 그 기억을 떠올립니다. " +
        "인생이라는 긴 여행에서 우리는 수많은 사람을 만나고 헤어지지만, " +
        "결국 끝까지 함께하는 것은 나 자신, 그리고 내가 품은 이야기들뿐입니다. " +
        "소중한 기억들은 낡지 않습니다. 오히려 시간이 지날수록 더 깊은 빛을 냅니다.\n\n";
}

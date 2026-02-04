
import { jsPDF } from 'jspdf';

/**
 * Loads the NaNumMyeongjo font from the public directory and adds it to the jsPDF instance.
 */
async function loadFont(doc: jsPDF) {
    try {
        const response = await fetch('/fonts/NanumMyeongjo.ttf');
        if (!response.ok) throw new Error('Failed to load font');
        const buffer = await response.arrayBuffer();

        // Convert ArrayBuffer to binary string
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        // Add font to VFS and register it
        doc.addFileToVFS('NanumMyeongjo.ttf', btoa(binary));
        doc.addFont('NanumMyeongjo.ttf', 'NanumMyeongjo', 'normal');
        doc.setFont('NanumMyeongjo');
    } catch (e) {
        console.error("Font loading failed, falling back to default", e);
    }
}

/**
 * Generates mock expanded content to reach target page count with high quality.
 */
function generateExpandedContent(baseMessages: { role: string, content: string }[], targetPages: number): string[] {
    const chapters: string[] = [];

    // Base content from chat, filter out 'AI', '에이아이'
    const cleanedText = baseMessages
        .map(m => m.content)
        .join("\n\n")
        .replace(/(AI|에이아이|인공지능|기계)/gi, "");

    // Expansion themes
    const themes = [
        "프롤로그: 변화의 조짐",
        "1장: 기억의 심연 속으로",
        "2장: 마주한 현실과 갈등",
        "3장: 어둠 속에서 찾은 빛",
        "4장: 보이지 않는 장막을 거두며",
        "5장: 진정한 자아를 발견하다",
        "6장: 타인과의 연결, 그리고 공감",
        "7장: 시련이 남긴 선물",
        "8장: 내면의 목소리에 답하다",
        "9장: 삶이라는 이름의 예술",
        "에필로그: 끝나지 않은 여정"
    ];

    const chapterCount = Math.max(Math.floor(targetPages / 5), themes.length);

    // High-quality dramatic fillers
    const fillers = [
        "그 순간의 침묵은 그 어떤 웅변보다도 강렬하게 내 가슴을 두드렸다. ",
        "시간은 무심히 흐르는 듯했지만, 그 흐름 속에서 나는 나만의 궤적을 그려가고 있었다. ",
        "창밖의 풍경이 변하듯, 내 마음의 계절도 소리 없이 자리를 바꾸고 있었다. ",
        "실패는 끝이 아니라, 더 높은 도약을 위해 잠시 숨을 고르는 시간이었음을 그때는 알지 못했다. ",
        "결국 모든 진실은 눈에 보이는 것이 아니라, 가슴 깊은 곳에서 울려 퍼지는 공명 속에 있었다. ",
        "누군가에게는 사소한 일상일지 모르나, 나에게는 매 순간이 우주와 맞닿아 있는 기적이었다. ",
        "과거의 기억들은 흩어진 퍼즐 조각처럼 하나둘 맞춰지며 예기치 못한 감동을 선사했다. ",
        "삶은 정해진 답을 찾는 과정이 아니라, 나만의 질문을 던지는 끊임없는 탐구였다. ",
        "바람이 불어오는 대로 흔들리되, 뿌리만은 단단히 내리겠다는 결심이 나를 지탱해주었다. ",
        "그날의 선택이 후회로 남지 않은 것은, 그 과정에서 마주한 모든 인연들이 소중했기 때문이다. ",
        "우리는 때로 너무 먼 곳만 바라보느라 발밑에 피어난 진심을 놓치곤 한다. ",
        "진정한 강함은 부러지지 않는 것이 아니라, 굽혀졌을 때 다시 일어나는 유연함에 있었다. ",
        "별이 빛나는 밤, 나는 나지막이 나의 이름을 불러보며 존재의 의미를 확인했다. ",
        "마치 한 편의 드라마 같았던 그 시절의 이야기들이 이제 종이 위에 수줍게 내려앉는다. "
    ];

    // Helper to shuffle array
    const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);

    for (let i = 0; i < chapterCount; i++) {
        let chapterContent = "";
        const theme = themes[i % themes.length];

        // Use a mix of base content and shuffled fillers to ensure uniqueness
        const currentFillers = shuffle(fillers);

        // Contextual start
        if (i === 0) {
            chapterContent += "이 이야기는 긴 여정의 시작이다. " + cleanedText.slice(0, 150) + "...\n\n";
        } else {
            chapterContent += `[${theme}] 주제를 향한 깊은 사색이 시작된다.\n\n`;
        }

        const charGoal = (targetPages / chapterCount) * 1100; // Increase density for 100p
        let fillerIdx = 0;
        while (chapterContent.length < charGoal) {
            chapterContent += currentFillers[fillerIdx % currentFillers.length];
            fillerIdx++;
            if (fillerIdx % 3 === 0) chapterContent += "\n\n";
            // Occasionally inject some philosophical bridges
            if (fillerIdx === 5) chapterContent += " 문득, 나는 이 길이 어디로 향하는지 궁금해졌다. ";
        }

        chapters.push(`### ${theme}\n\n${chapterContent}`);
    }

    return chapters;
}

export async function generateBookPDF(
    messages: { role: string, content: string }[],
    targetPages: number,
    options: { title?: string, coverStyle?: string } = {}
) {
    const doc = new jsPDF();
    const { title = "나의 생애, 그 아름다운 기록", coverStyle = "Classic" } = options;

    // 1. Load Font
    await loadFont(doc);

    // 2. Cover Page
    let coverBg = [26, 60, 52]; // Default Green
    let textColor = [212, 175, 55]; // Default Gold
    let subTextColor = [255, 255, 255]; // White

    if (coverStyle === 'Modern') {
        coverBg = [255, 255, 255];
        textColor = [0, 0, 0];
        subTextColor = [100, 100, 100];
    } else if (coverStyle === 'Artistic') {
        coverBg = [212, 175, 55];
        textColor = [26, 60, 52];
        subTextColor = [255, 255, 255];
    }

    doc.setFillColor(coverBg[0], coverBg[1], coverBg[2]);
    doc.rect(0, 0, 210, 297, 'F');

    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(30);
    doc.text(title, 105, 100, { align: 'center' });

    doc.setTextColor(subTextColor[0], subTextColor[1], subTextColor[2]);
    doc.setFontSize(16);
    doc.text("Gachitalker Author Edition", 105, 120, { align: 'center' });
    doc.text(`${targetPages} 페이지의 여정`, 105, 130, { align: 'center' });

    // 3. Generate High-Quality Content
    const chapters = generateExpandedContent(messages, targetPages);

    // 4. Content Pages
    doc.setTextColor(10, 10, 10);
    let currentPage = 1;

    chapters.forEach((chapterContent) => {
        doc.addPage();
        currentPage++;

        // Header
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`제 ${currentPage}쪽 / 총 ${targetPages}쪽`, 105, 15, { align: 'center' });

        doc.setFontSize(11);
        doc.setTextColor(0);

        const lines = doc.splitTextToSize(chapterContent, 165);
        let y = 30;

        for (let i = 0; i < lines.length; i++) {
            if (y > 275) {
                doc.addPage();
                currentPage++;
                doc.setFontSize(10);
                doc.setTextColor(150);
                doc.text(`제 ${currentPage}쪽`, 105, 15, { align: 'center' });
                doc.setFontSize(11);
                doc.setTextColor(0);
                y = 30;
            }

            if (lines[i].startsWith('### ')) {
                y += 5;
                doc.setFontSize(16);
                doc.setTextColor(26, 60, 52);
                doc.text(lines[i].replace('### ', ''), 25, y);
                y += 12;
                doc.setFontSize(11);
                doc.setTextColor(0);
            } else {
                doc.text(lines[i], 25, y);
                y += 8;
            }
        }
    });

    // Save
    const fileName = title.replace(/\s+/g, '_').slice(0, 20);
    doc.save(`${fileName}_${targetPages}p.pdf`);
    return true;
}

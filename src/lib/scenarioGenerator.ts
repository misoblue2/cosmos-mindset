
interface Scene {
    slugline: string;
    action: string;
    dialogues: { character: string; text: string; parenthetical?: string }[];
}

export function generateScenario(keywords: string[]): string {
    const title = keywords.length > 0 ? keywords[0] : "무제";

    // Simple template-based generation for now
    // In a real AI scenario, this would call an LLM.
    // Here we simulate "intelligent" connection of keywords.

    const scenes: Scene[] = [
        {
            slugline: "EXT. CITY STREET - DAY",
            action: `The bustling city noise fades as our protagonist walks down the street. Something about the air feels differnet today. It reminds them of ${keywords[0] || "something forgotten"}.`,
            dialogues: [
                { character: "PROTAGONIST", text: "It's been a long time...", parenthetical: "whispering" },
                { character: "STRANGER", text: "Did you say something?" },
                { character: "PROTAGONIST", text: `I was just thinking about ${keywords[1] || "the past"}.` }
            ]
        },
        {
            slugline: "INT. COFFEE SHOP - CONTINUOUS",
            action: `The aroma of roasted beans fills the air. On the table lies a ${keywords[2] || "mysterious object"}.`,
            dialogues: [
                { character: "BARISTA", text: "Here's your usual." },
                { character: "PROTAGONIST", text: "Thanks. Do you ever feel like life is just a movie?" },
                { character: "BARISTA", text: "Only when the camera is rolling.", parenthetical: "laughing" }
            ]
        },
        {
            slugline: "EXT. ROOFTOP - SUNSET",
            action: `The sun dips below the horizon, painting the sky in hues of orange and purple. The wind carries the scent of ${keywords[3] || "freedom"}.`,
            dialogues: [
                { character: "PROTAGONIST", text: "This is it. The end of one chapter and the start of another." },
                { character: "PROTAGONIST", text: `I'm finally ready to let go of ${keywords[0] || "it all"}.`, parenthetical: "smiling" }
            ]
        }
    ];

    return formatAsScript(scenes);
}

function formatAsScript(scenes: Scene[]): string {
    let script = "";

    scenes.forEach(scene => {
        script += `\n${scene.slugline}\n\n`;
        script += `${scene.action}\n\n`;
        scene.dialogues.forEach(d => {
            script += `\t\t\t\t\t${d.character}\n`;
            if (d.parenthetical) {
                script += `\t\t\t\t(${d.parenthetical})\n`;
            }
            script += `\t\t${d.text}\n\n`;
        });
        script += "\n";
    });

    return script;
}

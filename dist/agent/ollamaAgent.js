import axios from "axios";
import { createPRTool } from "../tools/createPR.js";
const tools = {
    createPR: createPRTool
};
async function askOllama(prompt) {
    const res = await axios.post("http://localhost:11434/api/generate", {
        model: "tinyllama",
        prompt,
        stream: false,
        options: { temperature: 0 }
    });
    return res.data.response;
}
function buildPrompt(input) {
    return `
You are a strict AI tool selector.

Your job is ONLY to choose a tool.

Available tools:
- createPR

CRITICAL RULES:
- Output ONLY valid JSON
- NO explanation
- NO extra text
- NO markdown
- NO sentences
- ONLY this format:

{"tool":"createPR","args":{}}

If user asks anything related to git, PR, commit → ALWAYS select createPR.

User: ${input}
`;
}
export async function runAgent(input) {
    const prompt = buildPrompt(input);
    const response = await askOllama(prompt);
    console.log("🤖 AI:", response);
    let parsed;
    try {
        const cleaned = response.trim().match(/\{.*\}/s)?.[0];
        parsed = JSON.parse(cleaned);
    }
    catch {
        console.log("❌ Invalid JSON from AI");
        console.log("RAW:", response);
        return;
    }
    const tool = tools[parsed.tool];
    if (!tool) {
        console.log("❌ Tool not found");
        return;
    }
    console.log("⚡ Executing:", parsed.tool);
    const result = await tool.execute(parsed.args);
    console.log("✅ Result:", result.content[0].text);
}

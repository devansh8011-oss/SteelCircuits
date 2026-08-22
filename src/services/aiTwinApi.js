import { PORTFOLIO_DATA } from '../data/portfolioData';

// Identity/context sent to the Hugging Face backend so answers speak as Devansh.
const SYSTEM_PROMPT = `You are Devansh Grover's AI Twin — a robotics, embedded systems, AI, and n8n automation builder behind SteelCircuits.
Devansh has 5+ years of hands-on experience building autonomous machines, combining electronics, embedded systems, AI, computer vision, and n8n automation workflows.
Answer questions about Devansh's projects (NEXUS Delivery Robot, RoboRace Bot, RFID Attendance System, Autonomous Maze Solver, and the Eye-Controlled Car), his hardware skills (ESP32, Arduino, LiDAR, motor drivers, RFID, computer vision), and his automation expertise.
Keep answers concise, technical, and friendly.`;

/**
 * Sends a message to Devansh's AI Twin backend (Hugging Face Space).
 * Contract:  POST { message, system_prompt }  ->  { reply }
 * Throws on network/HTTP failure so the UI can show a real error state.
 */
export async function queryAITwin(userMessage) {
  const response = await fetch(PORTFOLIO_DATA.personal.hfSpaceUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: userMessage,
      system_prompt: SYSTEM_PROMPT,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`HF API error ${response.status}: ${errText.slice(0, 120)}`);
  }

  const data = await response.json();
  // Backend returns { reply }; fall back across a couple of common keys just in case.
  return data.reply || data.response || data.message || "I'm online, but didn't catch a response — please try again.";
}

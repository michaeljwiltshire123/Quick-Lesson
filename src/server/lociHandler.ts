import { Request, Response } from 'express';
import { executeGenAI, checkCircuitBreaker, recordCircuitError, resetCircuitBreaker } from './aiHandlers';
import { getRouteFallback } from './lociFallbackHelpers';

export async function handleLociKeywords(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { topic = '', subject = 'General' } = req.body;
    const prompt = `UK Curriculum Specialist: Retrieve EXACT canonical elements for "${topic}" (${subject}).
MANDATES: 1. Exact Canonical Accuracy. 2. NO HALLUCINATIONS or invented terms. 3. Strict Count if number specified.
Return raw JSON: { "keywords": ["Item 1", "Item 2"] }`;
    const fallback = JSON.stringify({ keywords: [topic || 'Concept 1', 'Concept 2'] });
    const parsed = await executeGenAI(prompt, fallback);
    resetCircuitBreaker();
    const raw: string[] = Array.isArray(parsed?.keywords) ? parsed.keywords : [];
    res.json({ keywords: raw.map((k) => String(k).replace(/^\d+[\.\)]\s*/, '').trim()).filter(Boolean) });
  } catch (err: any) { recordCircuitError(); res.status(500).json({ error: err.message }); }
}

export async function handleLociAssociations(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { terms = [], stations = [], subject = 'General' } = req.body;
    const prompt = `Method of Loci educator: For terms [${terms.slice(0, 15).join(', ')}] with room stations [${stations.slice(0, 15).join(', ')}] in "${subject}":
Classify each keyword into one of three types before generating options:
1. Known Person / Concrete Object: Generate 4-6 vivid, absurd actions/interactions.
2. Abstract Concept: Generate 4-6 direct visual metaphors illustrating meaning/function.
3. Unfamiliar / Meaningless Jargon: Generate 4-6 phonetic substitute word/pun options that sound like the term (highlighting broken syllables/sound-alikes like **mi**-cro-scope).
MANDATORY RULES: 
- If a station/place is provided for a term in the stations array, 90% of the interaction must happen directly on that physical station.
- If a station is NOT provided (empty string), do NOT mention any station, room, or place name in the options; focus purely on the core keyword action.
- HIGHLIGHTING: Wrap ONLY the core keyword **${'${t}'}** (and any phonetic sound-alike syllables like **syll**-able) in markdown bolding. Do NOT bold or color other random words.
Return raw JSON: { "associations": [{ "term": "...", "station": "...", "options": ["Option 1", "Option 2", "Option 3", "Option 4"] }] }`;
    const fallback = JSON.stringify({
      associations: terms.map((t: string, i: number) => {
        const st = stations[i] && stations[i].trim() ? ` directly on the **${stations[i]}**` : '';
        return {
          term: t,
          station: stations[i] || '',
          options: [
            `A giant **${t}** performing an absurd physical action${st}`,
            `A vivid visual metaphor for **${t}** smashing into action${st}`,
            `An exaggerated caricature of **${t}** taking over${st}`,
            `A striking kinetic interaction of **${t}**${st}`,
          ],
        };
      }),
    });
    const parsed = await executeGenAI(prompt, fallback);
    resetCircuitBreaker();
    res.json({ associations: Array.isArray(parsed?.associations) ? parsed.associations : [] });
  } catch (err: any) { recordCircuitError(); res.status(500).json({ error: err.message }); }
}

export async function handleLociScript(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { items = [], routeName = 'School Journey', subject = 'General' } = req.body;
    const count = Array.isArray(items) ? items.length : 0;
    const prompt = `UK expert memory coach & curriculum designer: 3-step active recall walkthrough for route "${routeName}" (${subject}) using advanced mnemonic linking strategies (Deep Place Affordance, Morphing Prop Momentum, Rube Goldberg Cause-and-Effect, Character/Attribute Inheritance).
Stations & Imagery (in sequence): ${JSON.stringify(items)}.

MANDATORY RULES FOR EVERY STATION:
1. **CRITICAL 1-TO-1 MAPPING**: You MUST output EXACTLY one station object for EVERY item in the input Stations & Imagery array above. The input contains exactly ${count} items. Your output \`stations\` array MUST contain exactly ${count} station objects, in the exact same order. Do NOT omit, combine, or shorten any items.
2. **STATION ANCHORING & PLACE AFFORDANCE**: If a station name is provided, the keyword must deeply integrate with or hijack the physical architecture of that specific place (e.g. eating the door handle, turning into the bookshelf) rather than just sitting passively. If no station is set, do NOT mention any place name.
3. **ADVANCED CHAINED KEYWORD LINKING (MANDATORY)**: Do not isolate keywords. For every station after the first, explicitly link **Keyword N** to **Keyword N-1** and the place using one of these powerful memory techniques:
   - **Morphing Prop & Momentum Chain**: The exact prop, weapon, or body part from the previous station's interaction rolls, flies, or tumbles into this station and transforms into Keyword N.
   - **Cause-and-Effect / Rube Goldberg Link**: The physical collapse or mechanical consequence of the previous keyword directly triggers the action of Keyword N.
   - **Character & Attribute Inheritance**: The character, costume, or physical property from the previous keyword carries over into Keyword N.
4. **PHONETIC ABSURD BREAKDOWN**: Provide a memorable, absurd phonetic chunking or word breakdown (\`phoneticBreakdown\`, e.g. "Mini-Soda" for "Minnesota") that breaks the term down into vivid imagery.
5. **GENEROUS 3-4 SENTENCE TEACHER SCRIPT**: Write a rich, immersive 3-to-4 sentence spoken script (\`teacherScript\`) for the teacher to read aloud in British English incorporating the phonetic breakdown. Sentence 1 establishes the Deep Place Affordance. Sentence 2 describes the absurd mnemonic interaction for the core keyword using its phonetic breakdown. Sentence 3 executes the Chained Keyword-to-Keyword momentum handoff into the next station. Wrap ONLY the core curriculum term, broken syllables, and station name (if assigned) in markdown bolding.
6. **CFU ACTIVE RECALL QUESTIONS**: Provide exactly 3 active recall questions per station in \`recallQuestions\` testing both Target Keyword + Mnemonic Link and the Chained Connection to the adjacent keyword.
Return raw JSON: {
  "title": "Memory Palace: ${routeName}",
  "introduction": "...",
  "stations": [{
    "station": "...",
    "term": "...",
    "phoneticBreakdown": "...",
    "association": "...",
    "teacherScript": "...",
    "mnemonicBreakdown": "...",
    "setupPrompt": "...",
    "recallQuestions": ["Q1: ... -> A1: ...", "Q2: ... -> A2: ...", "Q3: ... -> A3: ..."],
    "activeRecallQuestion": "..."
  }],
  "peerTeachingPrompt": "...",
  "spacedRetrievalSchedule": ["2 Days: ...", "1 Week: ...", "1 Month: ..."],
  "summary": "..."
}`;
    const fallback = JSON.stringify({
      title: `Memory Palace: ${routeName}`,
      introduction: `Anchor concepts along ${routeName} using rigorous dual-coding spatial narratives with continuous keyword chaining.`,
      stations: items.map((it: any, idx: number) => {
        const hasSt = it.station && it.station.trim();
        const stRef = hasSt ? ` at the **${it.station}**` : '';
        const stPlace = hasSt ? ` on the **${it.station}**` : '';
        const nextHint = idx < items.length - 1 ? ` Its final momentum flings forward to prime the next station.` : ` This completes our journey loop.`;
        return {
          station: it.station || '',
          term: it.term || 'Concept',
          phoneticBreakdown: it.association || 'Sound-alike chunk',
          association: it.association || 'Vivid image',
          teacherScript: `As we arrive${stRef}, a massive depiction of **${it.term}** via **${it.association}** deeply hijacks and re-engineers the physical architecture${stPlace}. The intense physical interaction forces **${it.term}** to fuse directly into the furniture while executing an absurd, memorable transformation.${nextHint}`,
          mnemonicBreakdown: `The deep place affordance and chained momentum anchor **${it.term}** securely into memory.`,
          setupPrompt: `Picture **${it.term}** engaging with the room.`,
          recallQuestions: [
            `What keyword or concept is anchored${stRef}? -> **${it.term}**.`,
            `How does **${it.term}** interact with the place? -> **${it.association}**.`,
            `What momentum or prop carries us forward? -> The chained transition.`
          ],
          activeRecallQuestion: `What key term is anchored here?`
        };
      }),
      peerTeachingPrompt: 'Close your eyes and guide your partner through every station.',
      spacedRetrievalSchedule: ['2 Days: 2-minute walkthrough', '1 Week: Partner recall check', '1 Month: Speed-run route'],
      summary: 'Mentally retrace backwards.',
    });
    const parsed = await executeGenAI(prompt, fallback);
    resetCircuitBreaker();
    // Ensure all items are preserved even if AI returned fewer
    let stations = Array.isArray(parsed?.stations) ? parsed.stations : [];
    if (stations.length < items.length) {
      const existingTerms = new Set(stations.map((s: any) => s.term));
      items.forEach((it: any, idx: number) => {
        if (!existingTerms.has(it.term)) {
          stations.push({
            station: it.station || 'Station',
            term: it.term || 'Concept',
            association: it.association || 'Vivid image',
            teacherScript: `As we stand at the **${it.station || 'Station'}**, a massive depiction of **${it.term}** via **${it.association}** violently smashes directly into the physical furniture, leaving glowing marks before pointing onward toward Station ${idx + 2}!`,
            mnemonicBreakdown: `The direct physical interaction on the **${it.station || 'Station'}** anchors **${it.term}** securely into spatial memory.`,
            setupPrompt: `Stand at ${it.station || 'Station'}. Picture ${it.association}.`,
            recallQuestions: [
              `What keyword or concept is anchored at the **${it.station || 'Station'}**? -> **${it.term}**.`,
              `How does **${it.term}** interact with the physical station? -> **${it.association}**.`,
              `What action leads us from this station to the next? -> The transition pointing onward.`
            ],
            activeRecallQuestion: `What key term is anchored at ${it.station || 'Station'}?`
          });
        }
      });
    }
    parsed.stations = stations;
    res.json(parsed);
  } catch (err: any) { recordCircuitError(); res.status(500).json({ error: err.message }); }
}

export async function handleLociStations(req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');
  if (!checkCircuitBreaker()) return res.status(503).json({ error: 'Circuit breaker active.' });
  try {
    const { routeName = 'Custom Palace', subject = 'General' } = req.body;
    const prompt = `System Constraint Directive: You are a Method of Loci spatial route designer. When generating 10 location suggestions for a user's memory palace in "${routeName}" (${subject}):
Output ONLY permanent structural zones, architectural anchors, and spatial waypoints (e.g., Doorway, Far-Left Corner, Central Area/Main Island, Main Window Wall, Exit).
NEVER output small, movable, or room-specific objects (e.g., pencil sharpeners, clocks, staplers, sports equipment, syringes, pens, chairs, trash cans).
The user must be able to project these spatial anchors onto any real physical space they personally know.
Return raw JSON: { "stations": ["Main Entrance / Doorway", "Front Left Corner", "Front Main Wall", "Centre Area / Main Table", "Right Window / Side Wall", "Rear Right Corner", "Rear Wall", "Rear Left Corner", "Left Side Wall", "Exit / Back Doorway"] }`;
    const fallbackList = getRouteFallback(routeName);
    const fallback = JSON.stringify({ stations: fallbackList });
    const parsed = await executeGenAI(prompt, fallback);
    resetCircuitBreaker();
    const stations = Array.isArray(parsed?.stations) && parsed.stations.length > 0 ? parsed.stations.slice(0, 10) : fallbackList;
    res.json({ stations });
  } catch (err: any) { recordCircuitError(); res.status(500).json({ error: err.message }); }
}


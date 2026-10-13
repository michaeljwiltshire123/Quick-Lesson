export interface StarterItem {
  formatType: string;
  promptText: string;
  misconceptionWarning: string;
  teacherDeliveryLine: string;
  isTrue?: boolean;
}

export function getStartersBatch1(chunkTitle: string, subject: string): StarterItem[] {
  return [
    {
      formatType: 'true_false',
      promptText: `True or False: Using small fragments of copyrighted material in "${chunkTitle}" without permission is legally protected as long as no financial profit is made.`,
      misconceptionWarning: 'Believing lack of profit equals fair use immunity.',
      teacherDeliveryLine: 'Absolute silence. Thumbs up or down on 3.',
      isTrue: false
    },
    {
      formatType: 'true_false',
      promptText: `True or False: In ${subject}, copyright automatically protects original creative work the moment it is recorded or fixed in tangible form, without requiring registration.`,
      misconceptionWarning: 'Assuming copyright requires formal registration to exist.',
      teacherDeliveryLine: 'Show thumbs on chests in 3, 2, 1.',
      isTrue: true
    },
    {
      formatType: 'true_false',
      promptText: `True or False: Crediting the original author of an asset in "${chunkTitle}" waives all copyright infringement liability.`,
      misconceptionWarning: 'Confusing academic attribution with legal copyright licensing.',
      teacherDeliveryLine: 'Thumbs up for true, thumbs down for false.',
      isTrue: false
    },
    {
      formatType: 'true_false',
      promptText: `True or False: Creative work generated 100% by autonomous AI tools without human input can hold statutory copyright protection in the UK and US.`,
      misconceptionWarning: 'Assuming AI-generated outputs have human copyright authorship.',
      teacherDeliveryLine: 'Thumbs up or down in 3, 2, 1.',
      isTrue: false
    },
    {
      formatType: 'true_false',
      promptText: `True or False: Once a work enters the Public Domain, anyone can adapt, remix, and commercially exploit it without paying royalties or seeking approval.`,
      misconceptionWarning: 'Failing to understand the unconditional freedom of public domain.',
      teacherDeliveryLine: 'Thumbs up or down on 3.',
      isTrue: true
    },
    {
      formatType: 'true_false',
      promptText: `True or False: Purchasing a digital copy of a track or image in "${chunkTitle}" gives you legal ownership of the underlying intellectual property.`,
      misconceptionWarning: 'Confusing purchasing a personal playback license with owning IP rights.',
      teacherDeliveryLine: 'Thumbs up or down in 3, 2, 1.',
      isTrue: false
    },
    {
      formatType: 'forced_dichotomy',
      promptText: `In "${chunkTitle}": Do you prioritise strict copyright lockdown to protect independent creators' livelihoods, or open-access remix culture that accelerates collaborative artistic evolution?`,
      misconceptionWarning: 'Treating intellectual property and creative freedom as absolute enemies.',
      teacherDeliveryLine: 'Left side defends protection, right side defends remix culture.'
    },
    {
      formatType: 'forced_dichotomy',
      promptText: `When commissioning work for "${chunkTitle}": Do you hire a master technician who delivers sterile perfection, or an unpredictable visionary who risks total failure for raw originality?`,
      misconceptionWarning: 'Believing reliability and artistic genius are always co-located.',
      teacherDeliveryLine: 'Choose one: no fence-sitting permitted.'
    },
    {
      formatType: 'forced_dichotomy',
      promptText: `You uncover a critical IP loophole in "${chunkTitle}". Do you exploit it immediately to secure an unbeatable market advantage, or close it publicly to safeguard industry ethics?`,
      misconceptionWarning: 'Ignoring long-term industry blowback when exploiting loopholes.',
      teacherDeliveryLine: 'Stand for exploitation, stay seated for ethical disclosure.'
    },
    {
      formatType: 'forced_dichotomy',
      promptText: `In "${chunkTitle}": Is it better to publish a controversial masterpiece that alienates 50% of your audience, or an uncontroversial solid project that delights everyone briefly?`,
      misconceptionWarning: 'Underestimating the enduring cultural value of polarizing art.',
      teacherDeliveryLine: 'Left wall for controversy, right wall for consensus.'
    },
    {
      formatType: 'forced_dichotomy',
      promptText: `For "${chunkTitle}": Should algorithmic recommendation models prioritise challenging user preconceptions, or giving users exactly what comforts them?`,
      misconceptionWarning: 'Assuming user satisfaction equals educational growth.',
      teacherDeliveryLine: 'Show thumbs up for discomfort, down for comfort.'
    },
    {
      formatType: 'forced_dichotomy',
      promptText: `When an apprentice copies your breakthrough in "${chunkTitle}": Do you litigate to defend your precedent, or let them copy and invent something even better?`,
      misconceptionWarning: 'Treating ideas as finite property versus infinite generative capacity.',
      teacherDeliveryLine: 'Litigate or out-innovate? 30 seconds to caucus.'
    },
    {
      formatType: 'paradox',
      promptText: `Ship of Theseus Paradox in "${chunkTitle}": If every single original component of your creative project is gradually replaced over time, is it still the same work? What if someone reassembles the discarded parts?`,
      misconceptionWarning: 'Assuming identity is tied to physical matter rather than structural form.',
      teacherDeliveryLine: 'Summarise your answer to your partner in 20 seconds.'
    },
    {
      formatType: 'paradox',
      promptText: `The Copyright Paradox: To legally protect a style in "${chunkTitle}", you must define it precisely; but once defined precisely, competitors can easily circumvent it by changing one detail. Can style ever truly be owned?`,
      misconceptionWarning: 'Confusing copyright of expression with copyright of ideas.',
      teacherDeliveryLine: 'Debate with your neighbour: can a genre be owned?'
    },
    {
      formatType: 'paradox',
      promptText: `The Innovation Paradox in "${chunkTitle}": The more strictly you defend intellectual property to incentivise creators, the more you strangle the raw materials the next generation needs to innovate. How can both survive?`,
      misconceptionWarning: 'Believing incentive structures have no unintended friction costs.',
      teacherDeliveryLine: 'Who loses more: the original creator or the next generation?'
    },
    {
      formatType: 'paradox',
      promptText: `The Grandfather Paradox in "${chunkTitle}": If you could travel back and prevent your rival from inventing their idea, would you have ever had the inspiration to build your version?`,
      misconceptionWarning: 'Ignoring causal dependencies in creative influence.',
      teacherDeliveryLine: 'Explain the causal loop to your partner.'
    },
    {
      formatType: 'paradox',
      promptText: `The Value Paradox: In "${chunkTitle}", why do digital assets with zero marginal replication cost command astronomical market prices, while infinitely scarce raw ideas often command zero?`,
      misconceptionWarning: 'Equating production difficulty with economic utility.',
      teacherDeliveryLine: 'Where does digital value actually originate?'
    },
    {
      formatType: 'paradox',
      promptText: `The Authenticity Paradox: If a forgery in "${chunkTitle}" evokes greater emotional resonance than the genuine original, which one possesses higher artistic truth?`,
      misconceptionWarning: 'Conflating provenance with aesthetic resonance.',
      teacherDeliveryLine: 'Vote: original provenance or audience emotion?'
    }
  ];
}

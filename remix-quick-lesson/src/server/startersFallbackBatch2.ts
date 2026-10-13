import { StarterItem } from './startersFallbackBatch1';

export function getStartersBatch2(chunkTitle: string, subject: string): StarterItem[] {
  return [
    {
      formatType: 'would_you_rather',
      promptText: `Would you rather have your breakthrough work in "${chunkTitle}" copied by a rival corporation that earns millions from it, or keep it totally locked away so nobody ever sees it?`,
      misconceptionWarning: 'Valuing hoarding over cultural dissemination.',
      teacherDeliveryLine: 'Stand for corporate theft, sit for absolute obscurity.'
    },
    {
      formatType: 'would_you_rather',
      promptText: `Would you rather win a prestigious award for a project in "${chunkTitle}" knowing you covertly copied the core idea, or finish dead last with a purely original creation?`,
      misconceptionWarning: 'Sacrificing creative integrity for superficial validation.',
      teacherDeliveryLine: 'Thumbs up for tainted gold, thumbs down for pure last place.'
    },
    {
      formatType: 'would_you_rather',
      promptText: `Would you rather license your work in "${chunkTitle}" for £50,000 to an unethical corporation, or publish it freely open-source while struggling to pay rent?`,
      misconceptionWarning: 'Assuming moral purity has zero real-world cost.',
      teacherDeliveryLine: 'Left wall for the cash, right wall for ethical poverty.'
    },
    {
      formatType: 'would_you_rather',
      promptText: `Would you rather have all your work in "${chunkTitle}" protected by unbreakable copyright but forgotten in 5 years, or enter the public domain and be remixed forever without your name attached?`,
      misconceptionWarning: 'Conflating attribution with immortality.',
      teacherDeliveryLine: 'Name on grave or immortal anonymous remix?'
    },
    {
      formatType: 'would_you_rather',
      promptText: `Would you rather work under a micromanaging client who pays quadruple your rate, or complete creative freedom on a project that pays minimum wage?`,
      misconceptionWarning: 'Ignoring the mental toll of compromised agency.',
      teacherDeliveryLine: 'Show fingers: 1 for wealth, 2 for autonomy.'
    },
    {
      formatType: 'would_you_rather',
      promptText: `Would you rather accidentally infringe a copyright and face a crippling legal lawsuit, or falsely accuse an innocent competitor and destroy your professional reputation?`,
      misconceptionWarning: 'Failing to weigh institutional legal risk against social capital.',
      teacherDeliveryLine: 'Stand for the lawsuit, sit for reputation loss.'
    },
    {
      formatType: 'predict_disaster',
      promptText: `You find an uncredited instrumental on an obscure blog and use it as the theme for your commercial client's launch video in "${chunkTitle}". Two weeks later the video hits 2M views. What catastrophic disaster strikes next?`,
      misconceptionWarning: 'Assuming uncredited media online is royalty-free.',
      teacherDeliveryLine: 'Write your prediction on your whiteboard in under 30 seconds.'
    },
    {
      formatType: 'predict_disaster',
      promptText: `To meet a strict deadline in "${chunkTitle}", you purchase a standard personal-use stock license instead of an extended commercial broadcast license, hoping no one notices. What unravels your campaign?`,
      misconceptionWarning: 'Failing to distinguish personal from commercial licensing tiers.',
      teacherDeliveryLine: 'Predict the audit consequence before revealing.'
    },
    {
      formatType: 'predict_disaster',
      promptText: `Your lead artist signs a work-for-hire contract for "${chunkTitle}" but informally promises verbal royalty shares to their freelance collaborators on WhatsApp. What happens when the project gets acquired?`,
      misconceptionWarning: 'Relying on informal verbal agreements over formal assignments of rights.',
      teacherDeliveryLine: 'Who actually owns the asset? Predict the courtroom outcome.'
    },
    {
      formatType: 'predict_disaster',
      promptText: `You download a 'free for non-commercial use' font and incorporate it into the logo of your startup project in "${chunkTitle}". Your brand becomes an overnight sensation. What is the fatal flaw?`,
      misconceptionWarning: 'Ignoring restrictive license clauses embedded in free fonts.',
      teacherDeliveryLine: 'Identify the legal time-bomb.'
    },
    {
      formatType: 'predict_disaster',
      promptText: `You record an interview in a bustling public café for "${chunkTitle}". A popular chart song plays faintly on the café radio in the background of your audio track. Why does YouTube demonetise and block your entire documentary?`,
      misconceptionWarning: 'Overlooking incidental background audio capture in copyright filters.',
      teacherDeliveryLine: 'How do automated Content ID algorithms react?'
    },
    {
      formatType: 'predict_disaster',
      promptText: `You use AI to generate the brand mascots for "${chunkTitle}". A competitor clones your exact characters and uses them in their advertising. Why can't your legal team stop them?`,
      misconceptionWarning: 'Believing pure AI generations can be legally copyrighted against copiers.',
      teacherDeliveryLine: 'Why does your trademark claim collapse?'
    },
    {
      formatType: 'finger_scale',
      promptText: `On a scale of 1 (Innocent fair use) to 10 (Gross illegal infringement), rate a student using 12 seconds of a chart track for background atmosphere in a non-monetised classroom project in "${chunkTitle}". Show fingers on chests in 3, 2, 1.`,
      misconceptionWarning: 'Believing student or non-profit status gives universal copyright exemption.',
      teacherDeliveryLine: 'Show fingers on chests on 3. Call on a 2 and an 8 to justify.'
    },
    {
      formatType: 'finger_scale',
      promptText: `On a scale of 1 (Transformative fair use) to 10 (Blatant mass piracy), where does training an AI model on 10,000 copyrighted artworks in "${chunkTitle}" without artist consent sit? Show fingers on chests in 3, 2, 1.`,
      misconceptionWarning: 'Viewing model training as simple consumption versus derivative exploitation.',
      teacherDeliveryLine: 'Fingers on chests on 3: compare lowest and highest scores.'
    },
    {
      formatType: 'finger_scale',
      promptText: `On a scale of 1 (Trivial background detail) to 10 (Severe invasion of personality rights), how legally risky is using an actor's likeness for 3 seconds in a crowd scene in "${chunkTitle}" without a release? Show fingers on chests in 3, 2, 1.`,
      misconceptionWarning: 'Overlooking personality rights and crowd release requirements.',
      teacherDeliveryLine: 'Show fingers on 3: would you sign off on this release?'
    },
    {
      formatType: 'finger_scale',
      promptText: `On a scale of 1 (Valid commentary) to 10 (Lazy parasitic theft), rate an editor taking another channel's 10-minute video in "${chunkTitle}", adding a 30-second reaction face, and re-uploading it. Show fingers on chests in 3, 2, 1.`,
      misconceptionWarning: 'Confusing minimal reaction framing with substantial transformative commentary.',
      teacherDeliveryLine: 'Fingers on chests on 3: does the commentary justify the re-upload?'
    },
    {
      formatType: 'finger_scale',
      promptText: `On a scale of 1 (Legitimate competitive inspiration) to 10 (Unethical clone piracy), rate cloning the exact game mechanics and UI of a viral app in "${chunkTitle}" with fresh code. Show fingers on chests in 3, 2, 1.`,
      misconceptionWarning: 'Assuming game mechanics and ideas can be copyrighted like code.',
      teacherDeliveryLine: 'Show fingers: where is the line between genre and clone?'
    },
    {
      formatType: 'finger_scale',
      promptText: `On a scale of 1 (Noble public interest) to 10 (Disgraceful breach of trust), rate secretly recording a whistleblower meeting in "${chunkTitle}" without their explicit knowledge to prevent retraction. Show fingers on chests in 3, 2, 1.`,
      misconceptionWarning: 'Ignoring legal wiretapping and journalistic ethics boundaries.',
      teacherDeliveryLine: 'Fingers on chests: does the public interest justify deceit?'
    },
    {
      formatType: 'socratic_tension',
      promptText: `Purist: 'Creative work is sacred property; using without license is theft, regardless of duration.'
Remixer: 'All culture is built on borrowing and reimagining past art; copyright protects monopolies, not creators.'
Which principle survives when tested?`,
      misconceptionWarning: 'Viewing copyright purely as protection rather than a regulatory balance.',
      teacherDeliveryLine: '30 seconds: choose your side and prepare your knockout blow.'
    },
    {
      formatType: 'socratic_tension',
      promptText: `The Moralist: 'Content creators have an inescapable ethical duty to avoid harmful stereotypes in "${chunkTitle}".'
The Realist: 'Art must depict the world as it genuinely exists—ugly and raw—or it degenerates into sterilized propaganda.'
Who do you defend?`,
      misconceptionWarning: 'Treating social responsibility and artistic truth as mutually exclusive.',
      teacherDeliveryLine: 'Caucus with your partner: whose argument has the fatal blindspot?'
    },
    {
      formatType: 'socratic_tension',
      promptText: `The Auteur: 'A creator must exercise absolute, uncompromised control over every frame in "${chunkTitle}".'
The Democrat: 'Art belongs to the audience the moment it is released; their interpretation supersedes the creator's intent.'
Whose authority holds?`,
      misconceptionWarning: 'Conflating authorial intent with audience reception.',
      teacherDeliveryLine: 'Stand for the author, sit for the audience.'
    },
    {
      formatType: 'socratic_tension',
      promptText: `The Capitalist: 'If a project in "${chunkTitle}" cannot generate commercial profit, its cultural value is negligible.'
The Bohemian: 'Commercial appeal forces compromise and sanitisation; true artistic breakthroughs are always market failures initially.'
Who gets funded?`,
      misconceptionWarning: 'Equating commercial viability with artistic significance.',
      teacherDeliveryLine: 'Who deserves the funding: profit or uncompromising vision?'
    },
    {
      formatType: 'socratic_tension',
      promptText: `The Innovator: 'Automated AI tools democratise production in "${chunkTitle}", allowing anyone to express their vision.'
The Traditionalist: 'Automation hollows out genuine human craft, flooding the world with derivative slop and devaluing skill.'
Which future will we accept?`,
      misconceptionWarning: 'Failing to evaluate the trade-off between accessibility and craft preservation.',
      teacherDeliveryLine: 'Left wall for democratisation, right wall for human craft.'
    },
    {
      formatType: 'socratic_tension',
      promptText: `The Libertarian: 'Audiences are rational agents fully responsible for evaluating what they consume in "${chunkTitle}".'
The Regulator: 'Subconscious media manipulation bypasses rationality; state regulation is essential to prevent public harm.'
Where does responsibility lie?`,
      misconceptionWarning: 'Assuming complete audience immunity to manipulative design.',
      teacherDeliveryLine: 'Who holds ultimate responsibility: viewer or regulator?'
    }
  ];
}

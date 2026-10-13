const formats = ['true_false', 'forced_dichotomy', 'paradox', 'would_you_rather', 'predict_disaster', 'finger_scale', 'socratic_tension'];
const pairs: Record<string, string[]> = {
  true_false: ['A reliable explanation of {topic} should use evidence, not just opinion.', 'One example is enough to prove that a rule about {topic} always applies.', 'Checking a result against the task can reveal an error in {topic}.', 'The context of a problem can change how {topic} should be applied.', 'A key term in {topic} can be used accurately without knowing its meaning.', 'Comparing two cases can help identify when {topic} applies.'],
  forced_dichotomy: ['Prioritise speed when applying {topic}, or pause to verify every step?', 'Use a familiar method for {topic}, or test a new approach with uncertain results?', 'Keep the process simple, or add checks that take more time?', 'Focus on a strong result, or make every decision easy to explain?', 'Follow a consistent rule, or adapt to each new context?', 'Work independently, or seek critique before finalising {topic}?'],
  paradox: ['If every step in {topic} changes, at what point does the process become a different method?', 'Can a method for {topic} be both reliable and flexible when the context keeps changing?', 'If a correct result comes from flawed reasoning about {topic}, should it count as success?', 'Can simplifying {topic} make it easier to learn but less accurate to use?', 'If two different methods reach the same result, does that prove both are sound?', 'When does improving {topic} introduce new problems that outweigh the improvement?'],
  would_you_rather: ['Use a quick method for {topic} that may miss a detail, or a slower method that checks each stage?', 'Explain {topic} using a clear simple example, or a complex example with more detail?', 'Receive feedback early, or finish your own approach before comparing it?', 'Use a known technique, or test a less familiar one?', 'Make one strong claim about {topic}, or several cautious claims backed by evidence?', 'Present a polished result, or show the steps that led to it?'],
  predict_disaster: ['A learner applies {topic} without checking the conditions. What is the first likely failure?', 'A team copies a previous solution to {topic} into a new context. What could go wrong?', 'An important step in {topic} is skipped to save time. What evidence might expose it?', 'A result about {topic} is accepted without checking its source. What risk follows?', 'A group chooses a method for {topic} before defining the problem. What might they miss?', 'A learner treats one example of {topic} as a universal rule. Where could that fail?'],
  finger_scale: ['not confident yet', 'exploring the idea', 'building a method', 'checking evidence', 'applying with support', 'ready to explain'],
  socratic_tension: ['One learner says {topic} needs a consistent rule; another says context must decide. Which view is stronger?', 'One learner values speed in {topic}; another values verification. What evidence should decide?', 'One learner trusts an established method; another challenges it. How could both test their claims?', 'One learner says a clear result matters most; another says sound reasoning matters most. Which is essential?', 'One learner argues for independent work on {topic}; another argues for critique. When is each right?', 'One learner says simplify {topic}; another says preserve every detail. How do you choose?'],
};

export function buildTopicStarterFallback(format: string, topic: string, subject: string, index: number) {
  const phrase = (pairs[format] || pairs.true_false)[(index - 1) % 6].replace(/\{topic\}/g, topic || subject || 'this lesson topic');
  const isTrue = format === 'true_false' ? [true, false, true, true, false, true][(index - 1) % 6] : undefined;
  const promptText = format === 'finger_scale'
    ? `On a scale of 1 (${phrase}) to 10 (fully confident), how ready are you to apply ${topic}?`
    : format === 'socratic_tension' ? phrase : format === 'true_false' ? `True or False: ${phrase}` : phrase;
  return { formatType: format, promptText, isTrue, misconceptionWarning: `Check your reasoning about ${topic}.`, teacherDeliveryLine: 'Think, pair, share for 30 seconds.' };
}

export function getTopicStarterFallbacks(topic: string, subject: string) {
  return formats.flatMap((format) => Array.from({ length: 6 }, (_, index) => buildTopicStarterFallback(format, topic, subject, index + 1)));
}

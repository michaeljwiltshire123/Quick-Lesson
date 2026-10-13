export interface AvatarOption {
  id: string;
  name: string;
  emoji: string;
}

export interface AvatarColourScheme {
  id: string;
  name: string;
  bgClass: string;
  borderClass: string;
  dotClass: string;
  ringClass: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: 'av-owl', name: 'Wise Owl', emoji: '🦉' },
  { id: 'av-fox', name: 'Swift Fox', emoji: '🦊' },
  { id: 'av-badger', name: 'Sturdy Badger', emoji: '🦡' },
  { id: 'av-otter', name: 'Clever Otter', emoji: '🦦' },
  { id: 'av-falcon', name: 'Keen Falcon', emoji: '🦅' },
  { id: 'av-robin', name: 'Alert Robin', emoji: '🐦' },
  { id: 'av-cat', name: 'Curious Cat', emoji: '🐱' },
  { id: 'av-hound', name: 'Loyal Hound', emoji: '🐶' },
  { id: 'av-bee', name: 'Busy Bee', emoji: '🐝' },
  { id: 'av-lion', name: 'Brave Lion', emoji: '🦁' },
  { id: 'av-deer', name: 'Gentle Deer', emoji: '🦌' },
  { id: 'av-squirrel', name: 'Quick Squirrel', emoji: '🐿️' },
  { id: 'av-dolphin', name: 'Bright Dolphin', emoji: '🐬' },
  { id: 'av-whale', name: 'Deep Whale', emoji: '🐋' },
  { id: 'av-hedgehog', name: 'Spiky Hedgehog', emoji: '🦔' },
  { id: 'av-peacock', name: 'Regal Peacock', emoji: '🦚' },
];

export const AVATAR_COLOURS: AvatarColourScheme[] = [
  { id: 'emerald', name: 'Forest Green', bgClass: 'bg-emerald-100 text-emerald-900', borderClass: 'border-emerald-300', dotClass: 'bg-emerald-600', ringClass: 'ring-emerald-500' },
  { id: 'amber', name: 'Honey Amber', bgClass: 'bg-amber-100 text-amber-900', borderClass: 'border-amber-300', dotClass: 'bg-amber-500', ringClass: 'ring-amber-500' },
  { id: 'sky', name: 'Coast Sky', bgClass: 'bg-sky-100 text-sky-900', borderClass: 'border-sky-300', dotClass: 'bg-sky-500', ringClass: 'ring-sky-500' },
  { id: 'rose', name: 'Heather Rose', bgClass: 'bg-rose-100 text-rose-900', borderClass: 'border-rose-300', dotClass: 'bg-rose-500', ringClass: 'ring-rose-500' },
  { id: 'violet', name: 'Royal Violet', bgClass: 'bg-violet-100 text-violet-900', borderClass: 'border-violet-300', dotClass: 'bg-violet-500', ringClass: 'ring-violet-500' },
  { id: 'coral', name: 'Sunset Coral', bgClass: 'bg-orange-100 text-orange-900', borderClass: 'border-orange-300', dotClass: 'bg-orange-500', ringClass: 'ring-orange-500' },
  { id: 'teal', name: 'Tidal Teal', bgClass: 'bg-teal-100 text-teal-900', borderClass: 'border-teal-300', dotClass: 'bg-teal-500', ringClass: 'ring-teal-500' },
  { id: 'slate', name: 'Granite Slate', bgClass: 'bg-stone-200 text-stone-900', borderClass: 'border-stone-400', dotClass: 'bg-stone-600', ringClass: 'ring-stone-500' },
];

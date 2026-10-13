import { LociAssociationOption } from './types';

export async function fetchLociAssociationsApi(
  terms: string[],
  existing: LociAssociationOption[] = [],
  subject?: string
): Promise<LociAssociationOption[]> {
  try {
    const stations = existing.map((e) => e.station || '');
    const res = await fetch('/api/generate-loci-associations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ terms, stations, subject }),
    });
    const data = await res.json();
    const list = Array.isArray(data?.associations) ? data.associations : [];
    return terms.map((t) => {
      const found = list.find((it: any) => it.term?.toLowerCase() === t.toLowerCase());
      const default4 = [
        `A surging visual anchor of **${t}**`,
        `A glowing animated symbol of **${t}**`,
        `A phonetic pun rhyme for **${t}**`,
        `A kinetic mechanical motion of **${t}**`,
      ];
      const opts = (found?.options && found.options.length >= 4)
        ? found.options.slice(0, 4)
        : (found?.options ? [...found.options, ...default4].slice(0, 4) : default4);
      const prev = existing.find((a) => a.term === t);
      return {
        term: t,
        station: prev?.station || '',
        options: opts,
        selected: opts[0] || t,
        customText: prev?.customText || '',
        sensoryAnchor: prev?.sensoryAnchor,
      };
    });
  } catch {
    return terms.map((t) => ({
      term: t,
      station: '',
      options: [
        `A surging visual anchor of **${t}**`,
        `A glowing animated symbol of **${t}**`,
        `A phonetic pun rhyme for **${t}**`,
        `A kinetic mechanical motion of **${t}**`,
      ],
      selected: `A surging visual anchor of **${t}**`,
      customText: '',
    }));
  }
}

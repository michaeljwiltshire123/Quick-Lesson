import React from 'react';
import { LociAssociationOption } from './types';
import { LociAssociationItemCard } from './LociAssociationItemCard';

interface Props {
  associations: LociAssociationOption[];
  stationSuggestions?: string[];
  onUpdate: (term: string, patch: Partial<LociAssociationOption>) => void;
  onMoveItem: (from: number, to: number) => void;
}

export const LociAssociationsList: React.FC<Props> = ({
  associations, stationSuggestions = [], onUpdate, onMoveItem,
}) => (
  <div className="space-y-2.5">
    {associations.map((item, idx) => (
      <LociAssociationItemCard
        key={item.term}
        item={item}
        index={idx}
        total={associations.length}
        stationSuggestions={stationSuggestions}
        onSelect={(t, v) => onUpdate(t, { selected: v, customText: '' })}
        onCustom={(t, v) => onUpdate(t, { customText: v, selected: v })}
        onChangeStation={(t, v) => onUpdate(t, { station: v })}
        onToggleAnchor={(t, a) => onUpdate(t, { sensoryAnchor: item.sensoryAnchor === a ? undefined : a })}
        onMoveUp={(i) => onMoveItem(i, i - 1)}
        onMoveDown={(i) => onMoveItem(i, i + 1)}
      />
    ))}
  </div>
);

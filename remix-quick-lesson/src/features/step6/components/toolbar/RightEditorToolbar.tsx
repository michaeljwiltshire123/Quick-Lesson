import React, { useState } from 'react';
import { SlideItem, SlideElement, CanvasTheme } from '../../types/slideTypes';
import { EditTab } from './tabs/EditTab';
import { MediaTab } from './tabs/MediaTab';
import { AnimationsTab } from './tabs/AnimationsTab';
import { DiagramsTab } from './tabs/DiagramsTab';
import { AiMediaVaultDrawer, VaultMediaItem } from './AiMediaVaultDrawer';
import { Wand2, ImagePlus, Edit3, Sliders, PlayCircle, Network } from 'lucide-react';

interface RightEditorToolbarProps {
  slides?: SlideItem[];
  activeSlide: SlideItem;
  selectedElement?: SlideElement;
  selectedElementId?: string | null;
  selectedElementIds?: string[];
  onSelectElementId?: (id: string | null) => void;
  onSelectElementIds?: (ids: string[]) => void;
  vaultItems?: VaultMediaItem[];
  onUpdateTheme: (theme: Partial<CanvasTheme>) => void;
  onApplyThemeToAll: (theme: Partial<CanvasTheme>) => void;
  onUpdateElementMeta: (elementId: string, meta: Record<string, any>) => void;
  onUpdateElements: (elements: SlideElement[]) => void;
  onInsertMedia: (newElement: SlideElement) => void;
  onAutoBeautify: () => void;
  onOpenVideoModal?: () => void;
  onAddCrestToAllSlides?: (crestElement: SlideElement) => void;
  onRemoveCrestFromAllSlides?: () => void;
  onUpdateCrestOpacity?: (opacity: number) => void;
  onToggleCrestLock?: (isLocked: boolean) => void;
  onUpdateAllSlides?: (slides: SlideItem[]) => void;
}

export const RightEditorToolbar: React.FC<RightEditorToolbarProps> = ({
  slides = [], activeSlide, selectedElement, selectedElementId, selectedElementIds, onSelectElementId, onSelectElementIds, vaultItems,
  onUpdateTheme, onApplyThemeToAll, onUpdateElementMeta, onUpdateElements, onInsertMedia, onAutoBeautify, onOpenVideoModal,
  onAddCrestToAllSlides, onRemoveCrestFromAllSlides, onUpdateCrestOpacity, onToggleCrestLock, onUpdateAllSlides,
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'media' | 'anim' | 'diag'>('anim');
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const existingCrest = activeSlide.elements.find((el) => el.meta?.isSchoolCrest || el.meta?.isSchoolLogo);

  return (
    <aside aria-label="Slide Customisation Suite" className="bg-white border border-stone-200 rounded-2xl p-3 shadow-sm space-y-3 sticky top-3 max-h-[calc(100vh-2rem)] overflow-y-auto pr-1">
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => setIsVaultOpen(true)} className="flex-1 py-1.5 px-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs cursor-pointer">
          <ImagePlus className="w-3.5 h-3.5 text-amber-200" /><span>Media Vault</span>
        </button>
        <button type="button" onClick={onAutoBeautify} className="py-1.5 px-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer" title="Auto-Beautify">
          <Wand2 className="w-3.5 h-3.5 text-amber-700" /><span>Auto-Fix</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-0.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-[10px] font-bold">
        <button type="button" onClick={() => setActiveTab('edit')} className={`py-1 rounded-lg flex flex-col items-center gap-0.5 cursor-pointer ${activeTab === 'edit' ? 'bg-white text-amber-900 shadow-xs' : 'text-stone-600'}`}><Edit3 className="w-3 h-3" /><span>Edit</span></button>
        <button type="button" onClick={() => setActiveTab('media')} className={`py-1 rounded-lg flex flex-col items-center gap-0.5 cursor-pointer ${activeTab === 'media' ? 'bg-white text-amber-900 shadow-xs' : 'text-stone-600'}`}><Sliders className="w-3 h-3" /><span>Media</span></button>
        <button type="button" onClick={() => setActiveTab('anim')} className={`py-1 rounded-lg flex flex-col items-center gap-0.5 cursor-pointer ${activeTab === 'anim' ? 'bg-white text-amber-900 shadow-xs' : 'text-stone-600'}`}><PlayCircle className="w-3 h-3" /><span>Anim</span></button>
        <button type="button" onClick={() => setActiveTab('diag')} className={`py-1 rounded-lg flex flex-col items-center gap-0.5 cursor-pointer ${activeTab === 'diag' ? 'bg-white text-amber-900 shadow-xs' : 'text-stone-600'}`}><Network className="w-3 h-3" /><span>Diagrams</span></button>
      </div>

      <div className="min-h-[260px]">
        {activeTab === 'edit' && (
          <EditTab
            currentTheme={activeSlide.theme} selectedElement={selectedElement} existingCrest={existingCrest} onUpdateTheme={onUpdateTheme}
            onUpdateElement={(patch) => selectedElement && onUpdateElements(activeSlide.elements.map((el) => (el.id === selectedElement.id ? { ...el, ...patch } : el)))}
            onReplaceElement={(newEl) => selectedElement ? onUpdateElements(activeSlide.elements.map((el) => (el.id === selectedElement.id ? newEl : el))) : onInsertMedia(newEl)}
            onSplitElement={(split) => selectedElement && onUpdateElements([...activeSlide.elements.filter((el) => el.id !== selectedElement.id), ...split])}
            onInsertElement={onInsertMedia} onAddCrestToAllSlides={onAddCrestToAllSlides} onRemoveCrestFromAllSlides={onRemoveCrestFromAllSlides}
            onUpdateCrestOpacity={onUpdateCrestOpacity} onToggleCrestLock={onToggleCrestLock}
          />
        )}
        {activeTab === 'media' && (
          <MediaTab
            selectedElement={selectedElement} slideTitle={activeSlide.title} chunkId={activeSlide.chunkId} onOpenVideoModal={onOpenVideoModal}
            onUpdateElementMeta={(m) => selectedElement && onUpdateElementMeta(selectedElement.id, m)}
            onUpdateElementContent={(content) => selectedElement && onUpdateElements(activeSlide.elements.map((el) => (el.id === selectedElement.id ? { ...el, content } : el)))}
            onUpdateElementCaption={(caption) => selectedElement && onUpdateElements(activeSlide.elements.map((el) => (el.id === selectedElement.id ? { ...el, caption } : el)))}
            onUpdateElement={(patch) => selectedElement && onUpdateElements(activeSlide.elements.map((el) => (el.id === selectedElement.id ? { ...el, ...patch } : el)))}
            onInsertElement={onInsertMedia}
          />
        )}
        {activeTab === 'anim' && (
          <AnimationsTab
            currentTheme={activeSlide.theme} elements={activeSlide.elements}
            selectedElementId={selectedElementId || selectedElement?.id}
            selectedElementIds={selectedElementIds}
            onSelectElementId={onSelectElementId}
            onSelectElementIds={onSelectElementIds}
            onUpdateTheme={onUpdateTheme} onApplyThemeToAll={onApplyThemeToAll} onUpdateElements={onUpdateElements}
          />
        )}
        {activeTab === 'diag' && <DiagramsTab onInsertElements={(newEls) => onUpdateElements([...activeSlide.elements, ...newEls])} />}
      </div>

      <AiMediaVaultDrawer isOpen={isVaultOpen} vaultItems={vaultItems} onClose={() => setIsVaultOpen(false)} onInsertMedia={onInsertMedia} />
    </aside>
  );
};

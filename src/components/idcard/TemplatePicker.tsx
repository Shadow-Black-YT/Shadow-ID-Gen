import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  ALL_TEMPLATES, TemplateConfig, ColorScheme, CardLayout,
  COLOR_SCHEME_COLORS, isVerticalLayout, LAYOUT_CATEGORIES,
} from '@/types/idcard';

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

const CATEGORY_KEYS = Object.keys(LAYOUT_CATEGORIES) as (keyof typeof LAYOUT_CATEGORIES)[];

const TemplatePicker = ({ selected, onSelect }: Props) => {
  const [category, setCategory] = useState<keyof typeof LAYOUT_CATEGORIES>('All');

  const filtered = useMemo(() => {
    let items = ALL_TEMPLATES;
    const layouts = LAYOUT_CATEGORIES[category];
    if (layouts) items = items.filter(t => layouts.includes(t.layout));
    return items;
  }, [category]);

  return (
    <div className="space-y-3">
      {/* Category tabs */}
      <div className="flex gap-1 flex-wrap">
        {CATEGORY_KEYS.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'px-3 py-1 rounded-lg text-xs font-medium transition-all',
              category === cat
                ? 'gradient-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-[10px] text-muted-foreground">{filtered.length} templates</p>

      {/* Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5 max-h-64 overflow-y-auto pr-1">
        {filtered.map(t => (
          <TemplateThumb key={t.id} template={t} isSelected={selected === t.id} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

const TemplateThumb = ({ template, isSelected, onSelect }: { template: TemplateConfig; isSelected: boolean; onSelect: (id: string) => void }) => {
  const colors = COLOR_SCHEME_COLORS[template.colorScheme];
  const isVert = isVerticalLayout(template.layout);

  return (
    <button
      onClick={() => onSelect(template.id)}
      title={template.label}
      className={cn(
        'rounded-lg overflow-hidden transition-all duration-150',
        isSelected ? 'ring-2 ring-primary scale-110 z-10 shadow-glow' : 'hover:scale-105 opacity-80 hover:opacity-100'
      )}
    >
      <div
        className={cn('relative', isVert ? 'aspect-[2/3]' : 'aspect-[3/2]')}
        style={{ backgroundColor: colors.bg }}
      >
        {/* Header bar */}
        <div
          className={cn(
            'absolute',
            template.layout.includes('sidebar') ? 'left-0 top-0 bottom-0 w-1/4' :
            template.layout.includes('diagonal') ? 'top-0 left-0 right-0 h-1/2 skew-y-3 origin-top-left' :
            template.layout.includes('ribbon') ? 'left-1/2 -translate-x-1/2 top-[20%] w-[80%] h-[12%] rounded-sm' :
            template.layout.includes('badge') ? 'top-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[15%] rounded-full' :
            'top-0 left-0 right-0 h-1/4'
          )}
          style={{ backgroundColor: colors.accent }}
        />
        {/* Photo placeholder */}
        <div
          className={cn(
            'absolute rounded-sm',
            isVert
              ? 'w-[40%] h-[25%] left-[30%] top-[35%]'
              : 'w-[20%] h-[40%] left-[5%] top-[35%]'
          )}
          style={{ backgroundColor: colors.sub + '40' }}
        />
        {/* Text lines */}
        <div
          className={cn(
            'absolute space-y-0.5',
            isVert
              ? 'left-[15%] right-[15%] bottom-[15%]'
              : 'left-[30%] right-[5%] top-[40%]'
          )}
        >
          <div className="h-[3px] rounded-full w-3/4" style={{ backgroundColor: colors.text + '60' }} />
          <div className="h-[2px] rounded-full w-1/2" style={{ backgroundColor: colors.sub + '40' }} />
        </div>
      </div>
    </button>
  );
};

export default TemplatePicker;

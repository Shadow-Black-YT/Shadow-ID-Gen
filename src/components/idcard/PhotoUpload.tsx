import { useRef, useCallback } from 'react';
import { Camera, RotateCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
  small?: boolean;
}

const PhotoUpload = ({ label, value, onChange, small }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  }, [onChange]);

  const size = small ? 'w-20 h-20' : 'w-32 h-32';

  return (
    <div className="flex flex-col items-center gap-2">
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <button
        onClick={() => inputRef.current?.click()}
        className={`${size} rounded-xl glass border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center overflow-hidden transition-all group relative`}
      >
        {value ? (
          <>
            <img src={value} alt={label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
          </>
        ) : (
          <div className="text-center">
            <Camera className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </div>
        )}
      </button>
      {value && (
        <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => onChange(null)}>
          <X className="w-3 h-3 mr-1" /> Remove
        </Button>
      )}
    </div>
  );
};

export default PhotoUpload;

import { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { SIGNATURE_TEMPLATES } from '@/types/idcard';
import { Upload, PenLine, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

interface Props {
  selected: string | null;
  onSelect: (sig: string | null) => void;
  signatureName?: string;
  onSignatureNameChange?: (name: string) => void;
}

const NAME_SUGGESTIONS = [
  'James Wilson', 'Sarah Mitchell', 'Robert Chen', 'Emily Parker',
  'Michael Adams', 'Jessica Taylor', 'David Kumar', 'Olivia Brown',
  'Daniel Garcia', 'Sophia Martinez',
];

const SignaturePicker = ({ selected, onSelect, signatureName, onSignatureNameChange }: Props) => {
  const [uploadMode, setUploadMode] = useState(false);
  const [uploadedSig, setUploadedSig] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const result = ev.target?.result as string;
      setUploadedSig(result);
      onSelect(result);
    };
    reader.readAsDataURL(file);
  }, [onSelect]);

  const handleRemoveUpload = () => {
    setUploadedSig(null);
    onSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const displayed = showAll ? SIGNATURE_TEMPLATES : SIGNATURE_TEMPLATES.slice(0, 12);
  const isUploadedSelected = selected?.startsWith('data:');
  const displayName = signatureName || 'Sign';

  return (
    <div className="space-y-3">
      {/* Name Writer */}
      {onSignatureNameChange && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-foreground">Signer Name</label>
          <input
            type="text"
            value={signatureName || ''}
            onChange={e => onSignatureNameChange(e.target.value)}
            placeholder="Type name for signature..."
            className="w-full h-9 px-3 rounded-lg text-sm glass border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-background text-foreground placeholder:text-muted-foreground"
          />
          <div className="flex flex-wrap gap-1.5">
            {NAME_SUGGESTIONS.map(name => (
              <button
                key={name}
                onClick={() => onSignatureNameChange(name)}
                className={cn(
                  'px-2 py-0.5 rounded-md text-[10px] transition-all',
                  signatureName === name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                )}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle: Upload vs Template */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {uploadMode ? (
            <Upload className="w-4 h-4 text-primary" />
          ) : (
            <PenLine className="w-4 h-4 text-primary" />
          )}
          <span className="text-xs font-medium text-foreground">
            {uploadMode ? 'Upload My Own' : 'Choose Template'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">Templates</span>
          <Switch checked={uploadMode} onCheckedChange={setUploadMode} />
          <span className="text-[10px] text-muted-foreground">Upload</span>
        </div>
      </div>

      {uploadMode ? (
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full h-24 rounded-xl glass border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 transition-all group"
          >
            {uploadedSig ? (
              <img src={uploadedSig} alt="Uploaded signature" className="h-16 object-contain" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-xs text-muted-foreground">Click to upload your signature image</span>
                <span className="text-[10px] text-muted-foreground/60">PNG with transparent background recommended</span>
              </>
            )}
          </button>
          {uploadedSig && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={handleRemoveUpload}>
                <X className="w-3 h-3 mr-1" /> Remove
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => inputRef.current?.click()}>
                <Upload className="w-3 h-3 mr-1" /> Replace
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-[10px] text-muted-foreground">
            {SIGNATURE_TEMPLATES.length} handwritten signature styles
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {displayed.map(sig => (
              <button
                key={sig.id}
                onClick={() => onSelect(selected === sig.id ? null : sig.id)}
                className={cn(
                  'rounded-lg p-2 h-16 flex flex-col items-center justify-center transition-all glass gap-0.5 overflow-hidden',
                  selected === sig.id
                    ? 'ring-2 ring-primary shadow-glow bg-primary/5'
                    : 'hover:ring-1 hover:ring-border'
                )}
              >
                <span
                  className="text-foreground select-none leading-none whitespace-nowrap"
                  style={{ font: sig.fontStyle }}
                >
                  {displayName}
                </span>
                <span className="text-[7px] text-muted-foreground truncate w-full text-center mt-0.5">
                  {sig.name}
                </span>
              </button>
            ))}
          </div>

          {SIGNATURE_TEMPLATES.length > 12 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-primary hover:underline w-full text-center py-1"
            >
              {showAll ? 'Show less' : `Show all ${SIGNATURE_TEMPLATES.length} signatures`}
            </button>
          )}

          {selected && !isUploadedSelected && (
            <button onClick={() => onSelect(null)} className="text-[10px] text-destructive hover:underline">
              Remove selected signature
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SignaturePicker;

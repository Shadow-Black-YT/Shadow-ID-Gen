import { useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Download, FileText, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import CardForm from '@/components/idcard/CardForm';
import CardPreview from '@/components/idcard/CardPreview';
import TemplatePicker from '@/components/idcard/TemplatePicker';
import PhotoUpload from '@/components/idcard/PhotoUpload';
import SignaturePicker from '@/components/idcard/SignaturePicker';
import LogoGallery from '@/components/idcard/LogoGallery';
import {
  CardType, CardData, CARD_TYPE_LABELS, ALL_TEMPLATES, isVerticalLayout,
  DEFAULT_UNIVERSITY_DATA, DEFAULT_SCHOOL_DATA, DEFAULT_EMPLOYEE_DATA, DEFAULT_EVENT_DATA,
} from '@/types/idcard';

const DEFAULTS: Record<CardType, CardData> = {
  university: { ...DEFAULT_UNIVERSITY_DATA },
  school: { ...DEFAULT_SCHOOL_DATA },
  employee: { ...DEFAULT_EMPLOYEE_DATA },
  event: { ...DEFAULT_EVENT_DATA },
};

const Create = () => {
  const [searchParams] = useSearchParams();
  const initialType = (searchParams.get('type') as CardType) || 'university';

  const [cardType, setCardType] = useState<CardType>(initialType);
  const [data, setData] = useState<CardData>(DEFAULTS[initialType]);
  const [templateId, setTemplateId] = useState(ALL_TEMPLATES[0].id);
  const [photo, setPhoto] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [signatureName, setSignatureName] = useState('');
  const [showBack, setShowBack] = useState(false);
  const [backEnabled, setBackEnabled] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  const tpl = ALL_TEMPLATES.find(t => t.id === templateId) || ALL_TEMPLATES[0];
  const isVert = isVerticalLayout(tpl.layout);

  const handleTypeChange = (type: string) => {
    const t = type as CardType;
    setCardType(t);
    setData(DEFAULTS[t]);
  };

  const handleDownloadPNG = useCallback(async () => {
    const el = previewRef.current?.querySelector('canvas');
    if (!el) return;
    const link = document.createElement('a');
    link.download = `idcard-${cardType}-${showBack ? 'back' : 'front'}.png`;
    link.href = el.toDataURL('image/png');
    link.click();
  }, [cardType, showBack]);

  const handleDownloadPDF = useCallback(async () => {
    const el = previewRef.current?.querySelector('canvas');
    if (!el) return;
    const imgData = el.toDataURL('image/png');
    const w = isVert ? 380 : 600;
    const h = isVert ? 600 : 380;
    const pdf = new jsPDF({ orientation: isVert ? 'portrait' : 'landscape', unit: 'px', format: [w, h] });
    pdf.addImage(imgData, 'PNG', 0, 0, w, h);
    pdf.save(`idcard-${cardType}.pdf`);
  }, [cardType, isVert]);

  const handleReset = () => {
    setData(DEFAULTS[cardType]);
    setPhoto(null);
    setLogo(null);
    setSignature(null);
    setSignatureName('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
        <h1 className="text-3xl font-bold mb-6">
          <span className="gradient-text">Create ID Card</span>
        </h1>

        <Tabs value={cardType} onValueChange={handleTypeChange} className="mb-6">
          <TabsList className="glass-strong h-auto flex-wrap gap-1 p-1.5">
            {(Object.keys(CARD_TYPE_LABELS) as CardType[]).map(t => (
              <TabsTrigger key={t} value={t} className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm">
                {CARD_TYPE_LABELS[t]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="glass rounded-2xl p-5 shadow-card">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Card Details</h2>
              <CardForm cardType={cardType} data={data} onChange={setData} />
            </div>

            <div className="glass rounded-2xl p-5 shadow-card">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Photos & Logo</h2>
              <div className="flex gap-6 flex-wrap mb-4">
                <PhotoUpload label="Photo" value={photo} onChange={setPhoto} />
                <PhotoUpload label="Custom Logo" value={logo} onChange={setLogo} small />
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                  Or choose a pre-made logo
                </h3>
                <LogoGallery cardType={cardType} selected={logo} onSelect={setLogo} />
              </div>
            </div>

            <div className="glass rounded-2xl p-5 shadow-card">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Signature <span className="text-[10px] text-muted-foreground font-normal">(54 handwritten styles + upload)</span>
              </h2>
              <SignaturePicker selected={signature} onSelect={setSignature} signatureName={signatureName} onSignatureNameChange={setSignatureName} />
            </div>

            {/* Back Side Toggle */}
            <div className="glass rounded-2xl p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Back Side</h2>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Enable to include QR code, terms & emergency info on back</p>
                </div>
                <Switch checked={backEnabled} onCheckedChange={(checked) => { setBackEnabled(checked); if (!checked) setShowBack(false); }} />
              </div>
            </div>

            <div className="glass rounded-2xl p-5 shadow-card">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                Card Template <span className="text-[10px] text-muted-foreground font-normal">({ALL_TEMPLATES.length}+ designs)</span>
              </h2>
              <TemplatePicker selected={templateId} onSelect={setTemplateId} />
            </div>
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Live Preview</h2>
              {backEnabled && (
                <Button variant="outline" size="sm" onClick={() => setShowBack(!showBack)} className="gap-2">
                  {showBack ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showBack ? 'Show Front' : 'Show Back'}
                </Button>
              )}
            </div>

            <div ref={previewRef} className="glass rounded-2xl p-6 shadow-card">
              <CardPreview
                cardType={cardType}
                data={data}
                templateId={templateId}
                photo={photo}
                logo={logo}
                signature={signature}
                signatureName={signatureName}
                showBack={backEnabled && showBack}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={handleDownloadPNG} className="gradient-primary text-primary-foreground shadow-glow gap-2">
                <Download className="w-4 h-4" /> Download PNG
              </Button>
              <Button onClick={handleDownloadPDF} variant="outline" className="gap-2">
                <FileText className="w-4 h-4" /> Download PDF
              </Button>
              <Button onClick={handleReset} variant="ghost" className="gap-2 text-muted-foreground">
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

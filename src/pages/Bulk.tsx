import { useState, useCallback, useRef } from 'react';
import { Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Navbar from '@/components/Navbar';
import TemplatePicker from '@/components/idcard/TemplatePicker';
import CardPreview from '@/components/idcard/CardPreview';
import {
  CardType, CardData, CARD_TYPE_LABELS, BulkEntry, ALL_TEMPLATES,
} from '@/types/idcard';

const FIELD_MAP: Record<CardType, string[]> = {
  university: ['universityName', 'studentName', 'department', 'rollNumber', 'year', 'dob', 'address', 'phone'],
  school: ['schoolName', 'studentName', 'className', 'section', 'rollNumber', 'dob', 'guardianName', 'phone'],
  employee: ['companyName', 'employeeName', 'designation', 'department', 'employeeId', 'dob', 'phone', 'bloodGroup'],
  event: ['eventName', 'attendeeName', 'role', 'date', 'validThrough'],
};

const parseCSV = (text: string): string[][] => {
  return text.trim().split('\n').map(row =>
    row.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''))
  );
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const sanitizeFilePart = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'card';

const getNameForFile = (type: CardType, data: CardData) => {
  if (type === 'employee') return (data as { employeeName?: string }).employeeName || '';
  if (type === 'event') return (data as { attendeeName?: string }).attendeeName || '';
  return (data as { studentName?: string }).studentName || '';
};

const Bulk = () => {
  const [cardType, setCardType] = useState<CardType>('university');
  const [template, setTemplate] = useState(ALL_TEMPLATES[0].id);
  const [entries, setEntries] = useState<BulkEntry[]>([]);
  const [renderEntries, setRenderEntries] = useState<BulkEntry[]>([]);
  const [generating, setGenerating] = useState(false);
  const renderRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string;
      const rows = parseCSV(text);
      if (rows.length < 2) return;

      const headers = rows[0];
      const fields = FIELD_MAP[cardType];
      const dataRows = rows.slice(1);

      const parsed: BulkEntry[] = dataRows.map((row, idx) => {
        const obj: Record<string, string> = {};
        const errors: string[] = [];

        fields.forEach((field, fi) => {
          const hi = headers.findIndex(h => h.toLowerCase().replace(/\s/g, '') === field.toLowerCase());
          const value = hi !== -1 ? row[hi] || '' : row[fi] || '';
          obj[field] = value;
        });

        // Basic validation
        const nameField = fields.find(f => f.toLowerCase().includes('name'));
        if (nameField && !obj[nameField]) errors.push('Name is required');

        return {
          id: `entry-${idx}`,
          data: obj as unknown as CardData,
          valid: errors.length === 0,
          errors,
        };
      });

      setEntries(parsed);
    };
    reader.readAsText(file);
  }, [cardType]);

  const handleGenerate = useCallback(async () => {
    const validEntries = entries.filter(e => e.valid);
    if (validEntries.length === 0) return;

    setGenerating(true);
    setRenderEntries(validEntries);

    try {
      await sleep(500);
      const canvases = Array.from(renderRef.current?.querySelectorAll('canvas') ?? []);

      if (canvases.length !== validEntries.length) {
        throw new Error('Not all card previews finished rendering.');
      }

      const zip = new JSZip();
      canvases.forEach((canvas, index) => {
        const entry = validEntries[index];
        const name = sanitizeFilePart(getNameForFile(cardType, entry.data));
        const png = canvas.toDataURL('image/png').split(',')[1];
        zip.file(`${String(index + 1).padStart(3, '0')}-${name}.png`, png, { base64: true });
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `shadow-id-gen-${cardType}-${validEntries.length}-cards.zip`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Could not generate the ZIP. Please check your CSV data and try again.');
    } finally {
      setGenerating(false);
      setRenderEntries([]);
    }
  }, [cardType, entries]);

  const validCount = entries.filter(e => e.valid).length;
  const fields = FIELD_MAP[cardType];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-24 pb-12 px-4">
        <h1 className="text-3xl font-bold mb-6">
          <span className="gradient-text">Bulk Generation</span>
        </h1>

        {/* Card Type */}
        <Tabs value={cardType} onValueChange={v => { setCardType(v as CardType); setEntries([]); }} className="mb-6">
          <TabsList className="glass-strong h-auto flex-wrap gap-1 p-1.5">
            {(Object.keys(CARD_TYPE_LABELS) as CardType[]).map(t => (
              <TabsTrigger key={t} value={t} className="data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 text-sm">
                {CARD_TYPE_LABELS[t]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-5 shadow-card">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Upload CSV</h2>
              <p className="text-xs text-muted-foreground mb-3">
                Expected columns: {fields.join(', ')}
              </p>
              <label className="flex flex-col items-center justify-center gap-3 py-8 rounded-xl border-2 border-dashed border-border hover:border-primary/50 cursor-pointer transition-colors">
                <FileSpreadsheet className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Click to upload CSV</span>
                <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

            <div className="glass rounded-2xl p-5 shadow-card">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Template</h2>
              <TemplatePicker selected={template} onSelect={setTemplate} />
            </div>

            {entries.length > 0 && (
              <Button
                onClick={handleGenerate}
                disabled={generating || validCount === 0}
                className="w-full gradient-primary text-primary-foreground shadow-glow gap-2"
              >
                <Download className="w-4 h-4" />
                {generating ? 'Generating...' : `Generate ${validCount} Cards`}
              </Button>
            )}
          </div>

          {/* Preview Table */}
          <div className="lg:col-span-2">
            {entries.length > 0 ? (
              <div className="glass rounded-2xl p-5 shadow-card overflow-auto">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Parsed Entries
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {validCount} valid / {entries.length} total
                  </span>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">#</TableHead>
                      {fields.slice(0, 4).map(f => (
                        <TableHead key={f} className="text-xs">{f}</TableHead>
                      ))}
                      <TableHead className="w-16">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry, i) => (
                      <TableRow key={entry.id}>
                        <TableCell className="text-xs text-muted-foreground">{i + 1}</TableCell>
                        {fields.slice(0, 4).map(f => (
                          <TableCell key={f} className="text-xs">
                            {(entry.data as unknown as Record<string, string>)[f] || '—'}
                          </TableCell>
                        ))}
                        <TableCell>
                          {entry.valid ? (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="glass rounded-2xl p-16 shadow-card flex flex-col items-center justify-center text-center">
                <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Data Yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Upload a CSV file with your student or employee data to get started with bulk generation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {renderEntries.length > 0 && (
        <div ref={renderRef} className="fixed -left-[9999px] top-0 pointer-events-none opacity-0" aria-hidden="true">
          {renderEntries.map(entry => (
            <div key={entry.id} className="p-4">
              <CardPreview
                cardType={cardType}
                data={entry.data}
                templateId={template}
                photo={null}
                logo={null}
                signature={null}
                showBack={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bulk;

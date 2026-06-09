import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import {
  CardType, CardData, CardLayout, ColorScheme, UniversityData, SchoolData,
  EmployeeData, EventData, ALL_TEMPLATES, COLOR_SCHEME_COLORS, isVerticalLayout,
  SIGNATURE_TEMPLATES,
} from '@/types/idcard';

interface Props {
  cardType: CardType;
  data: CardData;
  templateId: string;
  photo: string | null;
  logo: string | null;
  signature: string | null;
  signatureName?: string;
  showBack: boolean;
}

const getCardName = (type: CardType, data: CardData) => {
  if (type === 'university') return (data as UniversityData).studentName || 'Student Name';
  if (type === 'school') return (data as SchoolData).studentName || 'Student Name';
  if (type === 'employee') return (data as EmployeeData).employeeName || 'Employee Name';
  return (data as EventData).attendeeName || 'Attendee Name';
};

const getOrgName = (type: CardType, data: CardData) => {
  if (type === 'university') return (data as UniversityData).universityName || 'University Name';
  if (type === 'school') return (data as SchoolData).schoolName || 'School Name';
  if (type === 'employee') return (data as EmployeeData).companyName || 'Company Name';
  return (data as EventData).eventName || 'Event Name';
};

const getIdNumber = (type: CardType, data: CardData) => {
  if (type === 'university') return (data as UniversityData).rollNumber;
  if (type === 'school') return (data as SchoolData).rollNumber;
  if (type === 'employee') return (data as EmployeeData).employeeId;
  return '';
};

const getDetailsRows = (type: CardType, data: CardData): [string, string][] => {
  if (type === 'university') {
    const d = data as UniversityData;
    return [['Dept', d.department], ['Year', d.year], ['DOB', d.dob], ['Phone', d.phone]];
  }
  if (type === 'school') {
    const d = data as SchoolData;
    return [['Class', `${d.className} - ${d.section}`], ['DOB', d.dob], ['Guardian', d.guardianName], ['Phone', d.phone]];
  }
  if (type === 'employee') {
    const d = data as EmployeeData;
    return [['Designation', d.designation], ['Dept', d.department], ['DOB', d.dob], ['Blood', d.bloodGroup]];
  }
  const d = data as EventData;
  return [['Role', d.role], ['Date', d.date], ['Valid', d.validThrough]];
};

const TYPE_LABELS: Record<CardType, string> = {
  university: 'STUDENT IDENTITY CARD', school: 'STUDENT IDENTITY CARD',
  employee: 'EMPLOYEE IDENTITY CARD', event: 'EVENT PASS',
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });

const CardPreview = ({ cardType, data, templateId, photo, logo, signature, signatureName, showBack }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState('');

  const tpl = ALL_TEMPLATES.find(t => t.id === templateId) || ALL_TEMPLATES[0];
  const colors = COLOR_SCHEME_COLORS[tpl.colorScheme];
  const layout = tpl.layout;
  const isVert = isVerticalLayout(layout);

  useEffect(() => {
    const qrText = `${getOrgName(cardType, data)} | ${getCardName(cardType, data)} | ${getIdNumber(cardType, data)}`;
    QRCode.toDataURL(qrText || 'IDForge', { width: 140, margin: 1, color: { dark: colors.text, light: '#00000000' } })
      .then(setQrDataUrl);
  }, [cardType, data, colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = isVert ? 380 : 600;
    const H = isVert ? 600 : 380;
    canvas.width = W;
    canvas.height = H;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = colors.bg;
    ctx.beginPath();
    ctx.roundRect(0, 0, W, H, 16);
    ctx.fill();

    if (showBack) {
      drawBack(ctx, W, H);
    } else {
      drawFront(ctx, W, H, layout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardType, data, templateId, photo, logo, signature, signatureName, showBack, qrDataUrl, colors, layout, isVert]);

  const sigDisplayName = signatureName || 'Signature';

  const drawSignature = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    if (!signature) return;

    if (signature.startsWith('data:')) {
      const img = new Image();
      img.onload = () => {
        const maxH = 30;
        const scale = maxH / img.height;
        const drawW = img.width * scale;
        ctx.drawImage(img, x, y - maxH + 4, drawW, maxH);
        ctx.fillStyle = colors.sub;
        ctx.font = '9px sans-serif';
        ctx.fillText('Authorized Signature', x, y + 16);
      };
      img.src = signature;
      return;
    }

    const sigTemplate = SIGNATURE_TEMPLATES.find(s => s.id === signature);
    if (sigTemplate) {
      ctx.fillStyle = colors.text;
      ctx.font = sigTemplate.fontStyle;
      ctx.fillText(sigDisplayName, x, y);
    }
    ctx.fillStyle = colors.sub;
    ctx.font = '9px sans-serif';
    ctx.fillText('Authorized Signature', x, y + 16);
  };

  const drawFront = async (ctx: CanvasRenderingContext2D, W: number, H: number, layout: CardLayout) => {
    const orgName = getOrgName(cardType, data);
    const name = getCardName(cardType, data);
    const idNum = getIdNumber(cardType, data);
    const details = getDetailsRows(cardType, data);

    if (isVert) {
      drawVerticalFront(ctx, W, H, layout, orgName, name, idNum, details);
    } else {
      drawHorizontalFront(ctx, W, H, layout, orgName, name, idNum, details);
    }
  };

  const drawHorizontalFront = async (
    ctx: CanvasRenderingContext2D, W: number, H: number, layout: CardLayout,
    orgName: string, name: string, idNum: string, details: [string, string][]
  ) => {
    // Draw accent header based on layout variant
    ctx.fillStyle = colors.accent;
    if (layout === 'horizontal-sidebar') {
      ctx.beginPath();
      ctx.roundRect(0, 0, 160, H, [16, 0, 0, 16]);
      ctx.fill();
    } else if (layout === 'horizontal-diagonal') {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 60); ctx.lineTo(0, 120); ctx.closePath();
      ctx.fill();
      ctx.restore();
    } else if (layout === 'horizontal-wave') {
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 60);
      ctx.bezierCurveTo(W * 0.75, 100, W * 0.25, 40, 0, 90);
      ctx.closePath();
      ctx.fill();
    } else if (layout === 'horizontal-split') {
      ctx.beginPath();
      ctx.roundRect(0, 0, W / 2, H, [16, 0, 0, 16]);
      ctx.fill();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = colors.accent;
      ctx.fillRect(W / 2, 0, W / 2, H);
      ctx.globalAlpha = 1;
    } else if (layout === 'horizontal-banner') {
      ctx.beginPath();
      ctx.roundRect(0, 0, W, 100, [16, 16, 0, 0]);
      ctx.fill();
    } else {
      // standard
      ctx.beginPath();
      ctx.roundRect(0, 0, W, 80, [16, 16, 0, 0]);
      ctx.fill();
    }

    // Org name + type label
    const isSidebar = layout === 'horizontal-sidebar';
    const isSplit = layout === 'horizontal-split';
    ctx.fillStyle = colors.headerText;
    ctx.font = 'bold 18px "Space Grotesk", sans-serif';

    if (isSidebar) {
      ctx.fillText(orgName, 12, 35, 136);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = colors.headerText + 'cc';
      ctx.fillText(TYPE_LABELS[cardType], 12, 52, 136);
    } else if (isSplit) {
      ctx.fillText(orgName, 16, 35, W / 2 - 32);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = colors.headerText + 'cc';
      ctx.fillText(TYPE_LABELS[cardType], 16, 52, W / 2 - 32);
    } else {
      const logoOff = logo ? 48 : 0;
      ctx.fillText(orgName, 18 + logoOff, 35, W - 36 - logoOff);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = colors.headerText + 'cc';
      ctx.fillText(TYPE_LABELS[cardType], 18 + logoOff, 52);
    }

    // Logo
    if (logo) {
      try {
        const img = await loadImage(logo);
        ctx.save();
        const lx = isSidebar ? 12 : 18;
        const ly = isSidebar ? 60 : 14;
        ctx.beginPath(); ctx.arc(lx + 16, ly + 16, 16, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(img, lx, ly, 32, 32);
        ctx.restore();
      } catch {
        // Ignore invalid logo image data.
      }
    }

    // Photo
    const pX = isSidebar ? 20 : isSplit ? 16 : 18;
    const pY = isSidebar ? 90 : isSplit ? 70 : 100;
    const pW = isSidebar ? 120 : isSplit ? W / 2 - 32 : 110;
    const pH = isSidebar ? 130 : isSplit ? 130 : 140;

    ctx.fillStyle = colors.sub + '30';
    ctx.beginPath(); ctx.roundRect(pX, pY, pW, pH, 8); ctx.fill();

    if (photo) {
      try {
        const img = await loadImage(photo);
        ctx.save();
        ctx.beginPath(); ctx.roundRect(pX, pY, pW, pH, 8); ctx.clip();
        ctx.drawImage(img, pX, pY, pW, pH);
        ctx.restore();
      } catch {
        // Ignore invalid photo image data.
      }
    } else {
      ctx.fillStyle = colors.sub;
      ctx.font = '11px sans-serif';
      ctx.fillText('Photo', pX + pW / 2 - 15, pY + pH / 2 + 4);
    }

    // Name + ID + details on right side
    const infoX = isSidebar ? 170 : isSplit ? W / 2 + 16 : 148;
    const infoY = isSidebar ? 30 : isSplit ? 30 : 115;

    if (!isSidebar && !isSplit) {
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(140, 95); ctx.lineTo(140, H - 15); ctx.stroke();
    }

    ctx.fillStyle = colors.text;
    ctx.font = 'bold 20px "Space Grotesk", sans-serif';
    ctx.fillText(name, infoX, infoY, W - infoX - 16);

    if (idNum) {
      ctx.fillStyle = colors.accent;
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(`ID: ${idNum}`, infoX, infoY + 22);
    }

    ctx.font = '11px sans-serif';
    details.forEach(([label, value], i) => {
      const y = infoY + 50 + i * 22;
      ctx.fillStyle = colors.sub;
      ctx.fillText(label + ':', infoX, y);
      ctx.fillStyle = colors.text;
      ctx.fillText(value || '—', infoX + 80, y);
    });

    // Signature
    if (isSidebar) {
      drawSignature(ctx, 12, H - 40);
    } else {
      drawSignature(ctx, infoX, H - 35);
    }
  };

  const drawVerticalFront = async (
    ctx: CanvasRenderingContext2D, W: number, H: number, layout: CardLayout,
    orgName: string, name: string, idNum: string, details: [string, string][]
  ) => {
    // Accent header
    ctx.fillStyle = colors.accent;
    if (layout === 'vertical-ribbon') {
      ctx.fillRect(W * 0.1, 0, W * 0.8, 80);
      // small decorative triangles
      ctx.beginPath(); ctx.moveTo(W * 0.1, 80); ctx.lineTo(W * 0.1 + 15, 80); ctx.lineTo(W * 0.1, 95); ctx.fill();
      ctx.beginPath(); ctx.moveTo(W * 0.9, 80); ctx.lineTo(W * 0.9 - 15, 80); ctx.lineTo(W * 0.9, 95); ctx.fill();
    } else if (layout === 'vertical-badge') {
      ctx.beginPath(); ctx.arc(W / 2, 60, 50, 0, Math.PI * 2); ctx.fill();
    } else if (layout === 'vertical-elegant') {
      ctx.beginPath();
      ctx.roundRect(0, 0, W, 90, [16, 16, 0, 0]);
      ctx.fill();
      // Thin accent line at bottom
      ctx.fillStyle = colors.accent + '40';
      ctx.fillRect(0, H - 40, W, 40);
    } else if (layout === 'vertical-modern') {
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 70);
      ctx.bezierCurveTo(W * 0.5, 110, W * 0.5, 50, 0, 90);
      ctx.closePath();
      ctx.fill();
    } else {
      // standard / centered
      ctx.beginPath();
      ctx.roundRect(0, 0, W, 85, [16, 16, 0, 0]);
      ctx.fill();
    }

    // Org name
    ctx.fillStyle = colors.headerText;
    ctx.font = 'bold 16px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(orgName, W / 2, layout === 'vertical-badge' ? 65 : 35, W - 30);
    ctx.font = '9px sans-serif';
    ctx.fillStyle = colors.headerText + 'cc';
    ctx.fillText(TYPE_LABELS[cardType], W / 2, layout === 'vertical-badge' ? 80 : 52);
    ctx.textAlign = 'left';

    // Logo
    if (logo) {
      try {
        const img = await loadImage(logo);
        ctx.save();
        ctx.beginPath(); ctx.arc(W / 2, layout === 'vertical-badge' ? 40 : 20, 14, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(img, W / 2 - 14, (layout === 'vertical-badge' ? 40 : 20) - 14, 28, 28);
        ctx.restore();
      } catch {
        // Ignore invalid logo image data.
      }
    }

    // Photo - centered
    const pW = 120;
    const pH = 150;
    const pX = (W - pW) / 2;
    const pY = layout === 'vertical-badge' ? 110 : layout === 'vertical-centered' ? 100 : 105;

    ctx.fillStyle = colors.sub + '30';
    ctx.beginPath(); ctx.roundRect(pX, pY, pW, pH, 10); ctx.fill();

    if (photo) {
      try {
        const img = await loadImage(photo);
        ctx.save();
        ctx.beginPath(); ctx.roundRect(pX, pY, pW, pH, 10); ctx.clip();
        ctx.drawImage(img, pX, pY, pW, pH);
        ctx.restore();
      } catch {
        // Ignore invalid photo image data.
      }
    } else {
      ctx.fillStyle = colors.sub;
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Photo', W / 2, pY + pH / 2 + 4);
      ctx.textAlign = 'left';
    }

    // Name
    ctx.fillStyle = colors.text;
    ctx.font = 'bold 18px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(name, W / 2, pY + pH + 30, W - 30);

    if (idNum) {
      ctx.fillStyle = colors.accent;
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`ID: ${idNum}`, W / 2, pY + pH + 48);
    }
    ctx.textAlign = 'left';

    // Details
    const detailsStartY = pY + pH + 65;
    ctx.font = '11px sans-serif';
    details.forEach(([label, value], i) => {
      const y = detailsStartY + i * 20;
      ctx.fillStyle = colors.sub;
      ctx.fillText(label + ':', 30, y);
      ctx.fillStyle = colors.text;
      ctx.fillText(value || '—', 120, y);
    });

    // Signature
    drawSignature(ctx, 30, H - 45);
  };

  const drawBack = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
    // Accent bar bottom
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.roundRect(0, H - 55, W, 55, [0, 0, 16, 16]);
    ctx.fill();

    // QR
    if (qrDataUrl) {
      const img = new Image();
      img.src = qrDataUrl;
      img.onload = () => {
        const qrSize = isVert ? 130 : 110;
        ctx.drawImage(img, W / 2 - qrSize / 2, isVert ? 30 : 20, qrSize, qrSize);
      };
    }

    // Terms
    ctx.fillStyle = colors.sub;
    ctx.font = '9px sans-serif';
    const terms = [
      'This card is the property of the issuing organization.',
      'If found, please return to the address mentioned.',
      'This card is non-transferable.',
      'Misuse of this card is punishable by law.',
    ];
    const termsY = isVert ? 200 : 160;
    terms.forEach((t, i) => ctx.fillText(t, 16, termsY + i * 16, W - 32));

    ctx.fillStyle = colors.text;
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('Emergency Contact', 16, termsY + 80);
    ctx.fillStyle = colors.sub;
    ctx.font = '10px sans-serif';
    const phone = 'phone' in data ? data.phone : '—';
    ctx.fillText(`Phone: ${phone}`, 16, termsY + 96);

    // Bottom bar text
    ctx.fillStyle = colors.headerText;
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(getOrgName(cardType, data), 16, H - 22, W - 32);
  };

  return (
    <div className="relative flex justify-center">
      <canvas
        ref={canvasRef}
        className="rounded-2xl shadow-card max-w-full"
        style={{
          width: isVert ? 'min(380px, 100%)' : 'min(600px, 100%)',
          aspectRatio: isVert ? '380/600' : '600/380',
        }}
      />
    </div>
  );
};

export default CardPreview;

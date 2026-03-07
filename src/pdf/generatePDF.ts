import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
import { cardioSections } from '../data/cardioFields';
import { internalSections } from '../data/internalFields';
import { amiriBase64 } from './amiriFont';

applyPlugin(jsPDF);

// Extend jsPDF type for autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: Record<string, unknown>) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

const MARGIN = 20;
const PAGE_W = 595.28; // A4
const CONTENT_W = PAGE_W - MARGIN * 2;

const ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
function hasArabic(text: string) { return ARABIC_RE.test(text); }

function registerFont(doc: jsPDF) {
  doc.addFileToVFS('Amiri-Regular.ttf', amiriBase64);
  doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
}

/** Set font — use Amiri for Arabic text, Helvetica for English */
function setValueFont(doc: jsPDF, text: string, style: 'normal' | 'bold' = 'normal') {
  if (hasArabic(text)) {
    doc.setFont('Amiri', style);
  } else {
    doc.setFont('helvetica', style);
  }
}

function addHeader(doc: jsPDF, title: string, subtitle: string) {
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(title, PAGE_W / 2, 30, { align: 'center' });
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(subtitle, PAGE_W / 2, 42, { align: 'center' });
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(1);
  doc.line(MARGIN, 48, PAGE_W - MARGIN, 48);
  return 55;
}

function checkPage(doc: jsPDF, y: number, needed: number = 30): number {
  if (y + needed > 780) {
    doc.addPage();
    return 25;
  }
  return y;
}

function addSectionTitle(doc: jsPDF, y: number, titleEn: string): number {
  y = checkPage(doc, y, 35);
  y += 8; // extra space before section header
  doc.setFillColor(30, 64, 175);
  doc.rect(MARGIN, y - 5, CONTENT_W, 18, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(titleEn, MARGIN + 5, y + 8);
  doc.setTextColor(0, 0, 0);
  return y + 28; // more space after header
}

function addField(doc: jsPDF, y: number, label: string, value: string): number {
  y = checkPage(doc, y, 22);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  const labelStr = label + ':';
  doc.text(labelStr, MARGIN, y);
  const labelW = doc.getTextWidth(labelStr) + 8; // 8pt gap between label and value

  doc.setFontSize(9);
  const valueText = value || '_______________';
  setValueFont(doc, valueText);
  const maxWidth = CONTENT_W - labelW - 5;
  const lines = doc.splitTextToSize(valueText, maxWidth);
  if (lines.length <= 1) {
    doc.text(valueText, MARGIN + labelW, y);
    doc.setFont('helvetica', 'normal'); // reset
    return y + 18;
  } else {
    doc.text(lines, MARGIN + 5, y + 14);
    doc.setFont('helvetica', 'normal'); // reset
    return y + 14 + lines.length * 12 + 4;
  }
}

function addCheckboxField(doc: jsPDF, y: number, label: string, values: string[]): number {
  y = checkPage(doc, y, 22);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(label + ':', MARGIN, y);
  const text = values && values.length > 0 ? values.join(', ') : 'None';
  setValueFont(doc, text);
  const lines = doc.splitTextToSize(text, CONTENT_W - 10);
  doc.text(lines, MARGIN + 5, y + 14);
  return y + 12 + lines.length * 11 + 4;
}

function addVASField(doc: jsPDF, y: number, label: string, value: number): number {
  y = checkPage(doc, y, 30);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(label + ':', MARGIN, y);

  // Draw VAS scale
  const scaleY = y + 10;
  const scaleW = CONTENT_W - 20;
  const scaleX = MARGIN + 10;

  // Background bar
  doc.setFillColor(220, 220, 220);
  doc.roundedRect(scaleX, scaleY, scaleW, 6, 3, 3, 'F');

  // Filled bar
  const fillW = (value / 10) * scaleW;
  if (fillW > 0) {
    const r = Math.min(255, Math.round(value * 25.5));
    const g = Math.max(0, Math.round(255 - value * 25.5));
    doc.setFillColor(r, g, 0);
    doc.roundedRect(scaleX, scaleY, fillW, 6, 3, 3, 'F');
  }

  // Labels
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('No pain', scaleX, scaleY + 14);
  doc.text(`${value}/10`, scaleX + scaleW / 2, scaleY + 14, { align: 'center' });
  doc.text('Severe pain', scaleX + scaleW, scaleY + 14, { align: 'right' });

  return scaleY + 22;
}

// ─── Generate Cardio PDF pages ───
export function generateCardioPDF(doc: jsPDF, data: Record<string, unknown>): void {
  let y = addHeader(doc, 'Cardiology Case Assessment', 'Case 1');

  for (const section of cardioSections) {
    y = addSectionTitle(doc, y, section.titleEn);

    for (const field of section.fields) {
      const val = data[field.id];

      if (field.type === 'vas') {
        y = addVASField(doc, y, field.englishLabel, Number(val ?? 0));
      } else if (field.type === 'checkbox') {
        y = addCheckboxField(doc, y, field.englishLabel, (val as string[]) || []);
      } else {
        y = addField(doc, y, field.englishLabel, String(val ?? ''));
      }
    }

    y += 5;
  }
}

// ─── Generate Internal PDF pages ───
export function generateInternalPDF(
  doc: jsPDF,
  data: Record<string, unknown>,
  adlRows: { activity: string; value: string }[],
  iadlRows: { activity: string; value: string }[],
  memoryRows: { item: string; present: boolean; comments: string }[],
  behavioralRows: { item: string; present: boolean; comments: string }[],
  familyHistoryRows: { disease: string; familyMember: string; ageOfOnset: string }[],
  arteryRows: { artery: string; rt: string; lt: string }[],
): void {
  doc.addPage();
  let y = addHeader(doc, 'Internal Medicine & Geriatric Evaluation', 'Case 1');

  for (const section of internalSections) {
    y = addSectionTitle(doc, y, section.titleEn);

    // Handle special table sections
    if (section.id === 'adl_assessment') {
      y = renderAssessmentTablePDF(doc, y, 'ADL Assessment', adlRows);
      continue;
    }
    if (section.id === 'iadl_assessment') {
      y = renderAssessmentTablePDF(doc, y, 'IADL Assessment', iadlRows);
      continue;
    }
    if (section.id === 'memory_assessment') {
      y = renderCheckTablePDF(doc, y, 'Memory Assessment', memoryRows);
      continue;
    }
    if (section.id === 'behavioral_assessment') {
      y = renderCheckTablePDF(doc, y, 'Behavioral Assessment', behavioralRows);
      continue;
    }
    if (section.id === 'family_history') {
      y = renderFamilyTablePDF(doc, y, familyHistoryRows);
      continue;
    }
    if (section.id === 'artery_assessment') {
      y = renderArteryTablePDF(doc, y, arteryRows);
      continue;
    }

    for (const field of section.fields) {
      if (['assessment-table', 'family-table', 'artery-table', 'image'].includes(field.type)) continue;
      const val = data[field.id];
      y = addField(doc, y, field.englishLabel, String(val ?? ''));
    }
    y += 5;
  }
}

function mapValue(v: string): string {
  switch (v) {
    case 'fully_dependent': return 'Fully Dependent';
    case 'needs_assistance': return 'Needs Assistance';
    case 'fully_independent': return 'Fully Independent';
    default: return '';
  }
}

function renderAssessmentTablePDF(
  doc: jsPDF,
  y: number,
  _title: string,
  rows: { activity: string; value: string }[],
): number {
  y = checkPage(doc, y, 40);
  doc.autoTable({
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    head: [['Activity', 'Status']],
    body: rows.map((r) => [r.activity, mapValue(r.value)]),
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [30, 64, 175], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });
  return doc.lastAutoTable.finalY + 10;
}

function renderCheckTablePDF(
  doc: jsPDF,
  y: number,
  _title: string,
  rows: { item: string; present: boolean; comments: string }[],
): number {
  y = checkPage(doc, y, 40);
  doc.autoTable({
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    head: [['Item', 'Present', 'Comments']],
    body: rows.map((r) => [r.item, r.present ? 'Yes' : 'No', r.comments || '']),
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [30, 64, 175], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });
  return doc.lastAutoTable.finalY + 10;
}

function renderFamilyTablePDF(
  doc: jsPDF,
  y: number,
  rows: { disease: string; familyMember: string; ageOfOnset: string }[],
): number {
  y = checkPage(doc, y, 40);
  doc.autoTable({
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    head: [['Disease', 'Family Member', 'Age of Onset']],
    body: rows.map((r) => [r.disease, r.familyMember || '-', r.ageOfOnset || '-']),
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [30, 64, 175], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });
  return doc.lastAutoTable.finalY + 10;
}

function renderArteryTablePDF(
  doc: jsPDF,
  y: number,
  rows: { artery: string; rt: string; lt: string }[],
): number {
  y = checkPage(doc, y, 40);
  const capitalize = (v: string) => v ? v.charAt(0).toUpperCase() + v.slice(1) : '';
  doc.autoTable({
    startY: y,
    margin: { left: MARGIN, right: MARGIN },
    head: [['Artery', 'Right', 'Left']],
    body: rows.map((r) => [
      r.artery,
      capitalize(r.rt),
      capitalize(r.lt),
    ]),
    styles: { fontSize: 8, cellPadding: 3, halign: 'center' },
    headStyles: { fillColor: [30, 64, 175], textColor: 255 },
    columnStyles: { 0: { halign: 'left' } },
    alternateRowStyles: { fillColor: [245, 247, 250] },
  });
  return doc.lastAutoTable.finalY + 10;
}

function addPageNumbers(doc: jsPDF) {
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${total}`, PAGE_W / 2, 830, { align: 'center' });
  }
}

function getFilename(prefix: string, ...names: string[]) {
  const name = names.find(n => n) || 'Patient';
  const date = new Date().toISOString().slice(0, 10);
  const safeName = name.replace(/[^a-zA-Z0-9\u0600-\u06FF ]/g, '').trim().replace(/\s+/g, '_');
  return `${prefix}_${safeName}_${date}.pdf`;
}

type InternalTableData = {
  adlRows: { activity: string; value: string }[];
  iadlRows: { activity: string; value: string }[];
  memoryRows: { item: string; present: boolean; comments: string }[];
  behavioralRows: { item: string; present: boolean; comments: string }[];
  familyHistoryRows: { disease: string; familyMember: string; ageOfOnset: string }[];
  arteryRows: { artery: string; rt: string; lt: string }[];
};

// ─── Export: Cardio only ───
export function exportCardioPDF(cardioData: Record<string, unknown>): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  registerFont(doc);
  generateCardioPDF(doc, cardioData);
  addPageNumbers(doc);
  doc.save(getFilename('Cardio_Case', String(cardioData['patient_name'] || '')));
}

// ─── Export: Internal only ───
export function exportInternalPDF(
  internalData: Record<string, unknown>,
  tables: InternalTableData,
): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  registerFont(doc);
  // Don't call addPage for standalone — generateInternalPDF starts with addPage, so override
  generateInternalPDFStandalone(doc, internalData, tables);
  addPageNumbers(doc);
  doc.save(getFilename('Internal_Case', String(internalData['int_name'] || '')));
}

// Standalone version that doesn't addPage (starts on current page)
function generateInternalPDFStandalone(
  doc: jsPDF,
  data: Record<string, unknown>,
  tables: InternalTableData,
): void {
  let y = addHeader(doc, 'Internal Medicine & Geriatric Evaluation', 'Case 1');

  for (const section of internalSections) {
    y = addSectionTitle(doc, y, section.titleEn);

    if (section.id === 'adl_assessment') { y = renderAssessmentTablePDF(doc, y, 'ADL Assessment', tables.adlRows); continue; }
    if (section.id === 'iadl_assessment') { y = renderAssessmentTablePDF(doc, y, 'IADL Assessment', tables.iadlRows); continue; }
    if (section.id === 'memory_assessment') { y = renderCheckTablePDF(doc, y, 'Memory Assessment', tables.memoryRows); continue; }
    if (section.id === 'behavioral_assessment') { y = renderCheckTablePDF(doc, y, 'Behavioral Assessment', tables.behavioralRows); continue; }
    if (section.id === 'family_history') { y = renderFamilyTablePDF(doc, y, tables.familyHistoryRows); continue; }
    if (section.id === 'artery_assessment') { y = renderArteryTablePDF(doc, y, tables.arteryRows); continue; }

    for (const field of section.fields) {
      if (['assessment-table', 'family-table', 'artery-table', 'image'].includes(field.type)) continue;
      const val = data[field.id];
      y = addField(doc, y, field.englishLabel, String(val ?? ''));
    }
    y += 5;
  }
}

// ─── Export: Combined (Cardio + Internal) ───
export function generateCombinedPDF(
  cardioData: Record<string, unknown>,
  internalData: Record<string, unknown>,
  tables: InternalTableData,
): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  registerFont(doc);

  // Cardio case (first)
  generateCardioPDF(doc, cardioData);

  // Internal case (second, starts new page)
  generateInternalPDF(doc, internalData, tables.adlRows, tables.iadlRows, tables.memoryRows, tables.behavioralRows, tables.familyHistoryRows, tables.arteryRows);

  addPageNumbers(doc);

  doc.save(getFilename('Hospital_Case', String(cardioData['patient_name'] || internalData['int_name'] || '')));
}

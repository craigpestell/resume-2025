import { pdf } from '@react-pdf/renderer';
import { portfolioData } from '@/data/portfolio';
import { ResumeDocument } from '@/lib/resumeDocument';

export const runtime = 'nodejs';

export async function GET() {
  const fileName = `${portfolioData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
  const pdfBlob = await pdf(<ResumeDocument data={portfolioData} />).toBlob();

  return new Response(pdfBlob, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store',
    },
  });
}

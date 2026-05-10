import { portfolioData } from '@/data/portfolio';

export const runtime = 'nodejs';

export async function GET() {
  const fileName = `${portfolioData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
  const [{ pdf }, { ResumeDocument }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('@/lib/resumeDocument'),
  ]);
  const pdfBlob = await pdf(<ResumeDocument data={portfolioData} />).toBlob();

  return new Response(pdfBlob, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store',
    },
  });
}

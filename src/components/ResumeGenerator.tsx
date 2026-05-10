'use client';

import { pdf } from '@react-pdf/renderer';
import type { PortfolioData } from '@/data/portfolio';
import { ResumeDocument } from '@/lib/resumeDocument';

// Function to generate and download PDF
export const generateResume = async (data: PortfolioData) => {
  try {
    const blob = await pdf(<ResumeDocument data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('There was an error generating the resume. Please try again.');
  }
};

export default ResumeDocument;

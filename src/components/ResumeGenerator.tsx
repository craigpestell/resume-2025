'use client';

import type { PortfolioData } from '@/data/portfolio';
import { ResumeDocument } from '@/lib/resumeDocument';

// Function to generate and download PDF
export const generateResume = async (data: PortfolioData) => {
  try {
    const link = document.createElement('a');
    link.href = '/api/resume';
    link.download = `${data.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('There was an error generating the resume. Please try again.');
  }
};

export default ResumeDocument;

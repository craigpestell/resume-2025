import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/HeroWithTesting';
import Skills from '@/components/Skills';
import StructuredData from '@/components/StructuredData';
import { portfolioData } from '@/data/portfolio';

const Projects = dynamic(() => import('@/components/Projects'));
const Experience = dynamic(() => import('@/components/Experience'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData personalInfo={portfolioData.personalInfo} />
      <Header />
      <Hero personalInfo={portfolioData.personalInfo} />
      <section id="projects" aria-label="Projects">
        <Projects projects={portfolioData.projects} />
      </section>
      <section id="skills" aria-label="Skills">
        <Skills skills={portfolioData.skills} />
      </section>
      <section id="experience" aria-label="Experience">
        <Experience
          experience={portfolioData.experience}
          education={portfolioData.education}
        />
      </section>

      <Footer personalInfo={portfolioData.personalInfo} />
    </main>
  );
}

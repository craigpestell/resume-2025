import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/HeroWithTesting';
import StructuredData from '@/components/StructuredData';
import Skills from '@/components/Skills';
import LazyFooterControls from '@/components/LazyFooterControls';
import { portfolioData } from '@/data/portfolio';

const Projects = dynamic(() => import('@/components/Projects'));
const Experience = dynamic(() => import('@/components/Experience'));
const Contact = dynamic(() => import('@/components/Contact'));

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData personalInfo={portfolioData.personalInfo} />
      <Header />
      <Hero personalInfo={portfolioData.personalInfo} />
      <section id="skills">
        <Skills skills={portfolioData.skills} />
      </section>
      <section id="projects">
        <Projects projects={portfolioData.projects} />
      </section>
      <section id="experience">
        <Experience 
          experience={portfolioData.experience} 
          education={portfolioData.education} 
        />
      </section>
      
      <section id="contact">
        <Contact personalInfo={portfolioData.personalInfo} />
      </section>
      
      {/* Footer */}
      <footer className="bg-card text-card-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-center md:text-left">
              © 2025 {portfolioData.personalInfo.name}. Built with Next.js and TailwindCSS.
            </p>
            <LazyFooterControls />
          </div>
        </div>
      </footer>
    </main>
  );
}

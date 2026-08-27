'use client';

import { Calendar, Building, ChevronDown, ChevronRight } from 'lucide-react';
import { Experience, Education } from '@/data/portfolio';
import { useState } from 'react';
import MotionWrapper from './MotionWrapper';

interface ExperienceProps {
  experience: Experience[];
  education: Education[];
}

export default function ExperienceSection({ experience, education }: ExperienceProps) {
  const recentExperience = experience.filter(exp => new Date(exp.startDate) >= new Date('2015-01-01'));
  const earlierExperience = experience.filter(exp => new Date(exp.startDate) < new Date('2015-01-01'));

  const parseDateString = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    if (year && month) {
      return new Date(year, month - 1, day ?? 1);
    }
    return new Date(dateString);
  };

  const formatDate = (dateString: string) => {
    const date = parseDateString(dateString);
    const formatted = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    return formatted.replace(/^Sep\b/, 'Sept');
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = parseDateString(startDate);
    const end = endDate ? parseDateString(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  const ExperienceCard = ({ exp, index }: { exp: Experience; index: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <MotionWrapper
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="h-full"
      >
        <div className="bg-gradient-to-br from-card to-card/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow h-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-1">
                {exp.position}
              </h3>
              <div className="flex items-center text-primary mb-2">
                <Building className="w-4 h-4 mr-2" />
                <span className="font-medium">{exp.company}</span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center mb-1">
                <Calendar className="w-4 h-4 mr-3" />
                <div className="flex flex-col text-primary">
                  <span className="text-right text-nowrap">{formatDate(exp.startDate)}</span>
                  <span className="text-right text-nowrap">{exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
                </div>
              </div>
              <span className="text-xs bg-muted px-2 py-1 rounded block text-center">
                {calculateDuration(exp.startDate, exp.endDate)}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">
            {exp.description}
          </p>

          {/* Keep the strongest proof visible while leaving the full detail expandable. */}
          {exp.achievements.length > 0 && (
            <div className="mb-4">
              <ul className="mx-4 list-disc list-outside space-y-1">
                <li className="text-muted-foreground text-sm">
                  {exp.achievements[0]}
                </li>
              </ul>

              {exp.achievements.length > 1 && (
                <>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center text-sm font-medium text-card-foreground hover:text-primary transition-colors mt-2"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 mr-1" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-1" />
                    )}
                    {isExpanded ? 'Hide' : 'Show'} additional achievements ({exp.achievements.length - 1})
                  </button>
                </>
              )}

              {isExpanded && exp.achievements.length > 1 && (
                <MotionWrapper
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="mx-4 list-disc list-outside space-y-1">
                    {exp.achievements.slice(1).map((achievement, i) => (
                      <li key={i} className="text-muted-foreground text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </MotionWrapper>
              )}
            </div>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </MotionWrapper>
    );
  };

  const EducationCard = ({ edu, index }: { edu: Education; index: number }) => (
    <MotionWrapper
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div className="bg-gradient-to-br from-card to-card/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">
              {edu.degree}
            </h3>
            <p className="text-primary font-medium mb-1">
              {edu.field}
            </p>
            <div className="flex items-center text-muted-foreground mb-2">
              <Building className="w-4 h-4 mr-2" />
              <span>{edu.institution}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Calendar className="w-4 h-4 mr-3" />
              <div className="flex flex-col text-right text-primary">
                <span className="text-right text-nowrap">{formatDate(edu.startDate)}</span>
                <span className="text-right text-nowrap">{formatDate(edu.endDate)}</span>
              </div>
            </div>
            {edu.gpa && (
              <div className="text-sm text-muted-foreground text-center">
                GPA: {edu.gpa}
              </div>
            )}
          </div>
        </div>

        {edu.achievements && edu.achievements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">
              Achievements:
            </h4>
            <ul className="mx-4 list-disc list-outside space-y-1">
              {edu.achievements.map((achievement, i) => (
                <li key={i} className="text-muted-foreground text-sm">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </MotionWrapper>
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <MotionWrapper
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Experience & Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A career spanning 1998 to the present, including concurrent consulting engagements and long-term product work.
          </p>
        </MotionWrapper>

        <div className="max-w-6xl mx-auto">
          {/* Experience Section */}
          <div className="mb-16">
            <MotionWrapper
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-8 text-foreground"
              as="h3"
            >
              Professional Experience
            </MotionWrapper>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {recentExperience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  <ExperienceCard exp={exp} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Earlier work is intentionally compact because several engagements overlapped as contracts. */}
          <div className="mb-16">
            <MotionWrapper
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-3 text-foreground"
              as="h3"
            >
              Earlier Work & Consulting
            </MotionWrapper>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Earlier roles include database applications, PHP web systems, public-sector software, e-commerce, CMS platforms, web services, and Linux administration. Several were concurrent contract engagements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {earlierExperience.map((exp, index) => (
                <MotionWrapper
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="border-l-2 border-primary/40 pl-5 py-2"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h4 className="font-semibold text-foreground">{exp.company}</h4>
                    <span className="text-sm text-primary">
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground mt-1">{exp.position}</p>
                  <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                </MotionWrapper>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div>
            <MotionWrapper
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-8 text-foreground"
              as="h3"
            >
              Education
            </MotionWrapper>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <EducationCard key={edu.id} edu={edu} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

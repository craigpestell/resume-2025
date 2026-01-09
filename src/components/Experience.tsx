'use client';

import { Calendar, Building, ChevronDown, ChevronRight, Eye } from 'lucide-react';
import { Experience, Education } from '@/data/portfolio';
import { useState } from 'react';
import MotionWrapper from './MotionWrapper';

interface ExperienceProps {
  experience: Experience[];
  education: Education[];
}

export default function ExperienceSection({ experience, education }: ExperienceProps) {
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showEarlyCareer, setShowEarlyCareer] = useState(false);
  
  // Show experiences from 2020 onwards as recent, hide Kali Protectives and earlier
  const cutoffDate = new Date('2020-01-01');
  const earlyCareerCutoff = new Date('2005-01-01');
  
  const recentExperience = experience.filter(exp => new Date(exp.startDate) >= cutoffDate);
  const midCareerExperience = experience.filter(exp => {
    const startDate = new Date(exp.startDate);
    return startDate < cutoffDate && startDate >= earlyCareerCutoff;
  });
  const earlyCareerExperience = experience.filter(exp => new Date(exp.startDate) < earlyCareerCutoff);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
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

          {/* Achievements */}
          {exp.achievements.length > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center text-sm font-medium text-card-foreground hover:text-primary transition-colors mb-2"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-1" />
                )}
                Key Achievements ({exp.achievements.length})
              </button>
              
              {isExpanded && (
                <MotionWrapper
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className="mx-4 list-disc list-outside space-y-1">
                    {exp.achievements.map((achievement, i) => (
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
            My professional journey and educational background
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
              {showAllExperience && midCareerExperience.map((exp) => (
                <div key={exp.id} className="relative">
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

                    {/* Achievements */}
                    {exp.achievements.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm font-medium text-card-foreground mb-2">
                          Key Achievements ({exp.achievements.length})
                        </div>
                        <ul className="mx-4 list-disc list-outside space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="text-muted-foreground text-sm">
                              {achievement}
                            </li>
                          ))}
                        </ul>
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
                </div>
              ))}
              {showAllExperience && showEarlyCareer && earlyCareerExperience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="bg-gradient-to-br from-card/50 to-card/5 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow h-full border border-muted">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-card-foreground mb-1">
                          {exp.position}
                        </h3>
                        <div className="flex items-center text-primary mb-2">
                          <Building className="w-3 h-3 mr-2" />
                          <span className="font-medium text-sm">{exp.company}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center mb-1">
                          <Calendar className="w-3 h-3 mr-2" />
                          <div className="flex flex-col text-primary text-xs">
                            <span className="text-right text-nowrap">{formatDate(exp.startDate)}</span>
                            <span className="text-right text-nowrap">{formatDate(exp.endDate!)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 text-sm">
                      {exp.description}
                    </p>

                    {/* Technologies only for early career */}
                    <div className="flex flex-wrap gap-1">
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
                </div>
              ))}
            </div>
            
            {midCareerExperience.length > 0 && !showAllExperience && (
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="mt-8 text-center"
              >
                <button
                  onClick={() => setShowAllExperience(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Show {midCareerExperience.length} More Experience{midCareerExperience.length !== 1 ? 's' : ''}
                </button>
              </MotionWrapper>
            )}
            
            {earlyCareerExperience.length > 0 && showAllExperience && !showEarlyCareer && (
              <MotionWrapper
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="mt-8 text-center"
              >
                <button
                  onClick={() => setShowEarlyCareer(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium text-sm"
                >
                  <Eye className="w-3 h-3" />
                  Show {earlyCareerExperience.length} Early Career Role{earlyCareerExperience.length !== 1 ? 's' : ''}
                </button>
              </MotionWrapper>
            )}
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

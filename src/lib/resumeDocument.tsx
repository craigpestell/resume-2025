import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Experience, PortfolioData } from '@/data/portfolio';
import { formatPhoneForDisplay } from '@/lib/phoneUtils';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 36,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1F2937',
  },
  header: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
    paddingBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#2563EB',
    marginBottom: 8,
  },
  contactLine: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 2,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  bodyText: {
    fontSize: 10,
    lineHeight: 1.45,
  },
  item: {
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#2563EB',
    marginBottom: 2,
  },
  dates: {
    fontSize: 9,
    color: '#6B7280',
    marginBottom: 4,
  },
  bullet: {
    marginBottom: 2,
    paddingLeft: 8,
    fontSize: 9,
    lineHeight: 1.35,
  },
  meta: {
    fontSize: 9,
    color: '#6B7280',
    marginTop: 3,
    fontStyle: 'italic',
  },
  skillLabel: {
    fontWeight: 'bold',
  },
});

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = year && month
    ? new Date(year, month - 1, day ?? 1)
    : new Date(dateString);
  const formatted = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  return formatted.replace(/^Sep\b/, 'Sept');
}

function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Professional Experience</Text>
      {items.map((exp) => (
        <View key={exp.id} style={styles.item} wrap={false}>
          <Text style={styles.itemTitle}>{exp.position}</Text>
          <Text style={styles.itemSubtitle}>{exp.company}</Text>
          <Text style={styles.dates}>
            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
          </Text>
          <Text style={styles.bodyText}>{exp.description}</Text>
          {exp.achievements.slice(0, 3).map((achievement, index) => (
            <Text key={`${exp.id}-achievement-${index}`} style={styles.bullet}>
              • {achievement}
            </Text>
          ))}
          {exp.technologies.length > 0 && (
            <Text style={styles.meta}>Technologies: {exp.technologies.join(', ')}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

function EarlierCareerSection({ summary, highlights }: { summary: string; highlights: string[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Earlier Career</Text>
      <Text style={styles.bodyText}>{summary}</Text>
      {highlights.map((highlight, index) => (
        <Text key={`earlier-career-${index}`} style={styles.bullet}>
          • {highlight}
        </Text>
      ))}
    </View>
  );
}

function SkillsSection({ skills }: { skills: PortfolioData['skills'] }) {
  const categoryLabels: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    languages: 'Languages',
    tools: 'Tools & Platforms',
    other: 'Other',
  };
  const categoryOrder = ['frontend', 'backend', 'languages', 'tools', 'other'];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Technical Skills</Text>
      {categoryOrder.map((category) => {
        const categorySkills = skills.filter((skill) => skill.category === category);
        if (categorySkills.length === 0) return null;

        return (
          <Text key={category} style={styles.bodyText}>
            <Text style={styles.skillLabel}>{categoryLabels[category]}: </Text>
            {categorySkills.map((skill) => skill.name).join(', ')}
          </Text>
        );
      })}
    </View>
  );
}

export function ResumeDocument({ data }: { data: PortfolioData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <Text style={styles.contactLine}>{data.personalInfo.email}</Text>
          <Text style={styles.contactLine}>{formatPhoneForDisplay(data.personalInfo.phone)}</Text>
          <Text style={styles.contactLine}>{data.personalInfo.location}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.bodyText}>{data.personalInfo.summary}</Text>
        </View>

        <ExperienceSection items={data.experience.filter((experience) => experience.resumeIncluded !== false)} />
        <EarlierCareerSection
          summary={data.resume.earlierCareerSummary}
          highlights={data.resume.earlierCareerHighlights}
        />

        <SkillsSection skills={data.skills} />

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {data.projects
            .filter((project) => project.featured)
            .map((project) => (
              <View key={project.id} style={styles.item} wrap={false}>
                <Text style={styles.itemTitle}>{project.title}</Text>
                <Text style={styles.bodyText}>{project.description}</Text>
                <Text style={styles.meta}>Technologies: {project.technologies.join(', ')}</Text>
              </View>
            ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.item} wrap={false}>
              <Text style={styles.itemTitle}>
                {edu.field ? `${edu.degree} in ${edu.field}` : edu.degree}
              </Text>
              <Text style={styles.itemSubtitle}>{edu.institution}</Text>
              <Text style={styles.dates}>
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

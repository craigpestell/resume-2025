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
});

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Professional Experience</Text>
      {items.map((exp) => (
        <View key={exp.id} style={styles.item}>
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

export function ResumeDocument({ data }: { data: PortfolioData }) {
  const experienceChunks = chunk(data.experience, 4);
  const firstExperienceChunk = experienceChunks[0] ?? [];
  const remainingExperienceChunks = experienceChunks.slice(1);

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

        <ExperienceSection items={firstExperienceChunk} />
      </Page>

      {remainingExperienceChunks.map((items, index) => (
        <Page key={`experience-page-${index + 2}`} size="A4" style={styles.page}>
          <ExperienceSection items={items} />
        </Page>
      ))}

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <Text style={styles.bodyText}>{data.skills.map((skill) => skill.name).join(', ')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {data.projects
            .filter((project) => project.featured)
            .map((project) => (
              <View key={project.id} style={styles.item}>
                <Text style={styles.itemTitle}>{project.title}</Text>
                <Text style={styles.bodyText}>{project.description}</Text>
                <Text style={styles.meta}>Technologies: {project.technologies.join(', ')}</Text>
              </View>
            ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.item}>
              <Text style={styles.itemTitle}>
                {edu.degree} in {edu.field}
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

import { Skill } from '@/data/portfolio';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const skillCategories = {
    frontend: 'Frontend',
    backend: 'Backend',
    languages: 'Languages',
    tools: 'Tools & Platforms',
    other: 'Other'
  };

  const categoryOrder = ['frontend', 'backend', 'languages', 'tools', 'other'];

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Technical Skills & Enterprise Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Career-spanning experience with modern technologies, enterprise platforms, and scalable solutions at Fortune 500 companies
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {categoryOrder.filter(category => groupedSkills[category]).map((category) => {
            const categorySkills = groupedSkills[category];
            return (
              <div
                key={category}
                className="mb-12"
              >
                <h3 className="text-2xl font-semibold mb-6 text-foreground">
                  {skillCategories[category as keyof typeof skillCategories]}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-medium text-foreground shadow-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 mx-auto max-w-3xl text-center">
          <p className="text-lg text-muted-foreground">
            My work spans frontend architecture, full-stack delivery, developer tooling, cloud integration, and complex operational workflows.
          </p>
        </div>
      </div>
    </section>
  );
}

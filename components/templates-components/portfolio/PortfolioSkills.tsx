import React from 'react';
import styles from './PortfolioSkills.module.css';

interface PortfolioSkillsProps {
  skills: string[];
}

const skillCategories = {
  'Frontend': ['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML', 'CSS', 'Tailwind'],
  'Backend': ['Node.js', 'Python', 'Express', 'Django', 'FastAPI'],
  'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  'Cloud & DevOps': ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
  'Tools': ['Git', 'VS Code', 'Figma', 'Postman']
};

const PortfolioSkills: React.FC<PortfolioSkillsProps> = ({ skills }) => {
  const categorizeSkills = () => {
    const categorized: { [key: string]: string[] } = {};
    
    Object.entries(skillCategories).forEach(([category, categorySkills]) => {
      const matchingSkills = skills.filter(skill => 
        categorySkills.some(catSkill => 
          catSkill.toLowerCase().includes(skill.toLowerCase()) || 
          skill.toLowerCase().includes(catSkill.toLowerCase())
        )
      );
      if (matchingSkills.length > 0) {
        categorized[category] = matchingSkills;
      }
    });
    
    // Add uncategorized skills
    const categorizedSkills = Object.values(categorized).flat();
    const uncategorized = skills.filter(skill => !categorizedSkills.includes(skill));
    if (uncategorized.length > 0) {
      categorized['Other'] = uncategorized;
    }
    
    return categorized;
  };

  const categorizedSkills = categorizeSkills();

  return (
    <section className={styles.skills} id="skills">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Skills & Technologies</h2>
          <p className={styles.subtitle}>
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>
        
        <div className={styles.skillsContainer}>
          {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
            <div key={category} className={styles.skillCategory}>
              <h3 className={styles.categoryTitle}>{category}</h3>
              <div className={styles.skillsGrid}>
                {categorySkills.map((skill, index) => (
                  <div key={index} className={styles.skillItem}>
                    <div className={styles.skillIcon}>
                      {getSkillIcon(skill)}
                    </div>
                    <span className={styles.skillName}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.proficiencySection}>
          <h3 className={styles.proficiencyTitle}>Proficiency Levels</h3>
          <div className={styles.proficiencyGrid}>
            <div className={styles.proficiencyItem}>
              <div className={styles.proficiencyBar}>
                <div className={styles.proficiencyFill} style={{width: '90%'}}></div>
              </div>
              <span>Frontend Development</span>
            </div>
            <div className={styles.proficiencyItem}>
              <div className={styles.proficiencyBar}>
                <div className={styles.proficiencyFill} style={{width: '85%'}}></div>
              </div>
              <span>Backend Development</span>
            </div>
            <div className={styles.proficiencyItem}>
              <div className={styles.proficiencyBar}>
                <div className={styles.proficiencyFill} style={{width: '80%'}}></div>
              </div>
              <span>Database Design</span>
            </div>
            <div className={styles.proficiencyItem}>
              <div className={styles.proficiencyBar}>
                <div className={styles.proficiencyFill} style={{width: '75%'}}></div>
              </div>
              <span>DevOps & Cloud</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getSkillIcon(skill: string) {
  const iconMap: { [key: string]: string } = {
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'React': '⚛️',
    'Next.js': '▲',
    'Node.js': '🟢',
    'Python': '🐍',
    'MongoDB': '🍃',
    'PostgreSQL': '🐘',
    'AWS': '☁️',
    'Docker': '🐳',
    'Git': '📦'
  };
  
  return iconMap[skill] || '⚡';
}

export default PortfolioSkills;

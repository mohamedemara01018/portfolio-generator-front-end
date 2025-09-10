import React from 'react';
import styles from './PortfolioAbout.module.css';

interface PortfolioAboutProps {
  bio: string;
  skills: string[];
}

export default function PortfolioAbout({ bio, skills }: PortfolioAboutProps) {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h2 className={styles.title}>About Me</h2>
            <p className={styles.description}>{bio}</p>
            
            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <h3>Experience</h3>
                <p>5+ years in web development</p>
              </div>
              <div className={styles.highlight}>
                <h3>Projects</h3>
                <p>50+ completed projects</p>
              </div>
              <div className={styles.highlight}>
                <h3>Focus</h3>
                <p>Full-stack development</p>
              </div>
            </div>
          </div>
          
          <div className={styles.skillsSection}>
            <h3 className={styles.skillsTitle}>Technical Skills</h3>
            <div className={styles.skillsGrid}>
              {skills.map((skill, index) => (
                <div key={index} className={styles.skillTag}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

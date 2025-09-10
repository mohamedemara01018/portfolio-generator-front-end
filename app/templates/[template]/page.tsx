'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PortfolioHero from '@/components/templates-components/portfolio/PortfolioHero';
import PortfolioAbout from '@/components/templates-components/portfolio/PortfolioAbout';
import PortfolioProjects from '@/components/templates-components/portfolio/PortfolioProjects';
import PortfolioSkills from '@/components/templates-components/portfolio/PortfolioSkills';
import PortfolioContact from '@/components/templates-components/portfolio/PortfolioContact';
import styles from './portfolio.module.css';

interface PortfolioData {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  skills: string[];
  projects: {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
  }[];
  contact: {
    email: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  theme: 'modern' | 'classic' | 'minimal' | 'creative';
}

export default function PortfolioPage() {
  const params = useParams();
  const template = params.template as string;
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from your API
        // For now, we'll use mock data based on the template parameter
        const mockData: PortfolioData = {
          id: template,
          name: "John Doe",
          title: "Full Stack Developer",
          bio: "Passionate developer with 5+ years of experience creating innovative web applications. I love turning complex problems into simple, beautiful designs.",
          avatar: "/api/placeholder/300/300",
          skills: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Python",
            "MongoDB",
            "PostgreSQL",
            "AWS",
            "Docker"
          ],
          projects: [
            {
              id: "1",
              title: "E-Commerce Platform",
              description: "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
              image: "/api/placeholder/400/250",
              technologies: ["React", "Node.js", "MongoDB", "Stripe"],
              liveUrl: "https://example.com",
              githubUrl: "https://github.com/example"
            },
            {
              id: "2",
              title: "Task Management App",
              description: "Collaborative task management application with real-time updates and team collaboration features.",
              image: "/api/placeholder/400/250",
              technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
              liveUrl: "https://example.com",
              githubUrl: "https://github.com/example"
            },
            {
              id: "3",
              title: "Weather Dashboard",
              description: "Interactive weather dashboard with location-based forecasts and historical data visualization.",
              image: "/api/placeholder/400/250",
              technologies: ["React", "D3.js", "Weather API", "CSS3"],
              liveUrl: "https://example.com",
              githubUrl: "https://github.com/example"
            }
          ],
          contact: {
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567",
            linkedin: "https://linkedin.com/in/johndoe",
            github: "https://github.com/johndoe",
            website: "https://johndoe.dev"
          },
          theme: template as any || 'modern'
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPortfolioData(mockData);
      } catch (err) {
        setError('Failed to load portfolio data');
        console.error('Error fetching portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (template) {
      fetchPortfolioData();
    }
  }, [template]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  if (error || !portfolioData) {
    return (
      <div className={styles.error}>
        <h2>Oops! Something went wrong</h2>
        <p>{error || 'Portfolio not found'}</p>
        <button 
          onClick={() => window.location.reload()} 
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.portfolio} ${styles[portfolioData.theme]}`}>
      <PortfolioHero 
        name={portfolioData.name}
        title={portfolioData.title}
        bio={portfolioData.bio}
        avatar={portfolioData.avatar}
        contact={portfolioData.contact}
      />
      
      <PortfolioAbout 
        bio={portfolioData.bio}
        skills={portfolioData.skills}
      />
      
      <PortfolioProjects 
        projects={portfolioData.projects}
      />
      
      <PortfolioSkills 
        skills={portfolioData.skills}
      />
      
      <PortfolioContact 
        contact={portfolioData.contact}
      />
    </div>
  );
}
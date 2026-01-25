
import PortfolioAbout from '@/components/templates-components/portfolio/about-section/PortfolioAbout';
import PortfolioContact from '@/components/templates-components/portfolio/contact-section/PortfolioContact';
import PortfolioHero from '@/components/templates-components/portfolio/hero-section/PortfolioHero';
import PortfolioProjects from '@/components/templates-components/portfolio/projects-section/PortfolioProjects';
import PortfolioSkills from '@/components/templates-components/portfolio/skills-section/PortfolioSkills';
import { initialStateTemplate } from '@/types';
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/navigation';
import React from 'react';

export default function PortfolioComponent({ portfolio }: { portfolio?: initialStateTemplate }) {
    if (!portfolio) {
        return redirect('/', RedirectType.replace)
    }
    return (
        <div>
            {portfolio?.heroData && <PortfolioHero heroDataTemplate={portfolio.heroData} isPortfolio={true} />}
            {portfolio?.aboutData && <PortfolioAbout aboutDataTemplate={portfolio.aboutData} isPortfolio={true} />}
            {portfolio?.projectsData && <PortfolioProjects projectsDataTemplate={portfolio.projectsData} isPortfolio={true} />}
            {portfolio?.skillCategories && <PortfolioSkills skillsTemplate={portfolio.skillCategories} isPortfolio={true} />}
            {portfolio?.contact && <PortfolioContact contactDataTemplate={portfolio.contact} isPortfolio={true} />}
        </div >

    );
}

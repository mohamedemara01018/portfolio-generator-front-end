
import PortfolioHero from '@/components/templates-components/portfolio/hero-section/PortfolioHero';
import PortfolioProjects from '@/components/templates-components/portfolio/projects-section/PortfolioProjects';
import PortfolioSkills from '@/components/templates-components/portfolio/skills-section/PortfolioSkills';
import PortfolioContact from '@/components/templates-components/portfolio/contact-section/PortfolioContact';
import styles from './portfolio.module.css';
import PortfolioAbout from '@/components/templates-components/portfolio/about-section/PortfolioAbout';
import { getTemplatesById } from '@/functions';
import TemplateContainer from '../component/templateContainer';
import { initialStateTemplate } from '@/types';



export default async function portfolioPage({
  params,
}: {
  params: Promise<{ template: string }>
}) {

  const param = await params;
  const t: initialStateTemplate = (await getTemplatesById(String(param.template))).template;
  return (

    <div className={`${styles.portfolio}`}>
      <TemplateContainer template={t} />
    </div>


  );
}
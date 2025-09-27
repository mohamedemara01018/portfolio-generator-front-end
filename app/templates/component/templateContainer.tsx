'use client'

import PortfolioAbout from "@/components/templates-components/portfolio/about-section/PortfolioAbout";
import PortfolioContact from "@/components/templates-components/portfolio/contact-section/PortfolioContact";
import PortfolioHero from "@/components/templates-components/portfolio/hero-section/PortfolioHero";
import PortfolioProjects from "@/components/templates-components/portfolio/projects-section/PortfolioProjects";
import PortfolioSkills from "@/components/templates-components/portfolio/skills-section/PortfolioSkills";
import { getTemplatesById } from "@/functions";
import { addTemplate } from "@/RTK/slices/templateSlice/templateDataSlice";
import { appdispatch } from "@/RTK/store"
import { initialStateTemplate } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

function TemplateContainer({ template }: { template: initialStateTemplate }) {
    const dispatch = useDispatch<appdispatch>();

    useEffect(() => {
        dispatch(addTemplate(template))
    }, [])

    return <>
        {template.heroData && <PortfolioHero heroDataTemplate={template.heroData} />}

        {template.aboutData && <PortfolioAbout aboutDataTemplate={template.aboutData} />}

        {template.projectsData && <PortfolioProjects projectsDataTemplate={template.projectsData} />}

        {template.skillCategories && <PortfolioSkills skillsTemplate={template.skillCategories} />}

        {template.contact && <PortfolioContact contactDataTemplate={template.contact} />}
    </>
}

export default TemplateContainer

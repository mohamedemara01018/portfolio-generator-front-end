'use client'

import PortfolioAbout from "@/components/templates-components/portfolio/about-section/PortfolioAbout";
import PortfolioContact from "@/components/templates-components/portfolio/contact-section/PortfolioContact";
import PortfolioHero from "@/components/templates-components/portfolio/hero-section/PortfolioHero";
import PortfolioProjects from "@/components/templates-components/portfolio/projects-section/PortfolioProjects";
import PortfolioSkills from "@/components/templates-components/portfolio/skills-section/PortfolioSkills";
import { addTemplate, templateDataState } from "@/RTK/slices/templateSlice/templateDataSlice";
import { appdispatch } from "@/RTK/store"
import { initialStateTemplate } from "@/types";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function TemplateContainer({ template }: { template: initialStateTemplate }) {
    const dispatch = useDispatch<appdispatch>();
    const currentTemplate = useSelector(templateDataState) as unknown as initialStateTemplate | undefined;

    useEffect(() => {
        dispatch(addTemplate(template))
    }, [])

    const tpl = currentTemplate ?? template;

    return <>
        {tpl.heroData && (
            <PortfolioHero heroDataTemplate={tpl.heroData} />
        )}

        {tpl.aboutData && (
            <PortfolioAbout aboutDataTemplate={tpl.aboutData} />
        )}

        {tpl.projectsData && (
            <PortfolioProjects projectsDataTemplate={tpl.projectsData} />
        )}

        {tpl.skillCategories && (
            <PortfolioSkills skillsTemplate={tpl.skillCategories} />
        )}

        {tpl.contact && (
            <PortfolioContact contactDataTemplate={tpl.contact} />
        )}
    </>
}

export default TemplateContainer

'use client';
import React, { useEffect, useRef, useState } from 'react'
import styles from './PortfolioAbout.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { editTemplateData, templateDataState, removeTemplateSection } from '@/RTK/slices/templateSlice/templateDataSlice'
import { MdDelete, MdEdit } from 'react-icons/md'
import { AboutData, initialStateTemplate } from '@/types';
import AboutModel from '../../models/aboutModel/AboutModel';
import { FaEdit } from 'react-icons/fa';



export default function PortfolioAbout({ aboutDataTemplate, isPortfolio = false }: { aboutDataTemplate: AboutData, isPortfolio?: boolean }) {

  const [aboutData, setAboutData] = useState({ ...aboutDataTemplate })
  const [isModelOpen, setModelOpen] = useState(false)
  const dispatch = useDispatch();


  return (
    <section className={styles.about} id="about">
      <div className={styles.content}>
        {isModelOpen && <AboutModel aboutData={aboutData} setAboutData={setAboutData} setModelOpen={setModelOpen} />}
        <div className={styles.textSection}>
          <h2 className={styles.title}>About Me</h2>

          <div className={styles.bioContainer}>
            <p className={styles.description} >
              {aboutData.bio}
            </p>
          </div>

          <div className={styles.highlights}>
            <div>
              <div className={styles.highlight}  >
                <h3>Experience</h3>
                <p>{aboutData.experience}</p>
              </div>
            </div>

            <div>
              <div className={styles.highlight}  >
                <h3>Projects</h3>
                <p>{aboutData.projects}</p>
              </div>
            </div>

            <div>
              <div className={styles.highlight} >
                <h3>Focus</h3>
                <p>{aboutData.focus}</p>
              </div>

            </div>
          </div>
        </div>

        <div className={styles.skillsSection}>
          <h3 className={styles.skillsTitle}>Technical Skills</h3>
          <div className={styles.skillsGrid}>
            {aboutData.skills.map((skill, index) => (
              <div key={index}>
                <div className={styles.skillTag}>
                  {skill}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {!isPortfolio && <div className={styles.icons}>
        <div className={`${styles.deleteIcon}`}>
          <MdDelete className={`${styles.icon} `} onClick={() => dispatch(removeTemplateSection({ key: 'aboutData' }))} />
          <div className={`${styles.drobMenuDelete} ${styles.drobMenu}`}>
            delete this section
          </div>
        </div>
        <div className={` ${styles.editIcon}`} >
          <FaEdit className={`${styles.icon}`} onClick={() => setModelOpen(true)} />
          <div className={`${styles.drobMenuEdit}  ${styles.drobMenu}`}>
            Edit this section
          </div>
        </div>
      </div>}
    </section >
  )
}

'use client';
import React, { useState } from 'react';
import styles from './PortfolioSkills.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { editTemplateData, templateDataState } from '@/RTK/slices/templateSlice/templateDataSlice';
import { SkillCategories } from '@/types';
import SkillsModel from '../../models/skillsModel/SkillsModel';




const PortfolioSkills = ({ skillsTemplate }: { skillsTemplate: SkillCategories[] }) => {
  const [skillCategories, setSkillCategories] = useState([...skillsTemplate])
  const [openModel, setOpenModel] = useState<boolean[]>(new Array(skillCategories.length as number).fill(false))
  const [openModelNewSkill, setOpenModelNewSkill] = useState(false)
  const dispatch = useDispatch()
  const dataNewSkill = {
    title: '',
    skills: [],
    level: 0,
  }

  function handleOpenModel(index: number) {
    const newOpenModel = [...openModel];
    newOpenModel[index] = true;
    setOpenModel(newOpenModel)
  }

  function handleCloseModel() {
    setOpenModel(new Array(skillCategories.length - 1).fill(false));
    setOpenModelNewSkill(false)
  }

  function handleDeleteSkill(index: number) {
    const newSkillCategories = skillCategories.filter((item, idx) => {
      return index != idx;
    })
    setSkillCategories(newSkillCategories);
    dispatch(editTemplateData({ newData: newSkillCategories, key: 'skillCategories' }))
  }





  return (
    <section className={styles.skills} id="skills">

      <div className={styles.header}>
        <h2 className={styles.title}>Skills & Technologies</h2>
        <p className={styles.subtitle}>
          Technologies and tools I work with to bring ideas to life
        </p>
      </div>

      <div className={styles.skillsContainer}>
        {skillCategories.map((category, index) => (
          <div key={category.title} className={styles.skillCategory}>
            <div className={styles.upPart}>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
              <div className={styles.skillsGrid}>
                {category.skills.map((skill, index) => (
                  <div key={index} className={styles.skillItem}>
                    <span className={styles.skillName}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.btns}>
              <button onClick={() => handleOpenModel(index)}>Edit</button>
              <button onClick={() => handleDeleteSkill(index)}>Delete</button>
            </div>
            {openModel[index] && <SkillsModel index={index} skillCategory={skillCategories[index]} skillCategories={skillCategories} setSkillCategories={setSkillCategories} handleCloseModel={handleCloseModel} />}

          </div>
        ))}

        <div className={styles.plus} onClick={() => setOpenModelNewSkill(true)}>
          +
        </div>
      </div>
      {openModelNewSkill && <SkillsModel index={skillCategories.length} skillCategory={dataNewSkill} skillCategories={skillCategories} setSkillCategories={setSkillCategories} handleCloseModel={handleCloseModel} />}

      <div className={styles.proficiencySection}>
        <h3 className={styles.proficiencyTitle}>Proficiency Levels</h3>
        <div className={styles.proficiencyGrid}>
          {
            skillCategories.map((category, idx) => {
              console.log(category)
              return (
                <div key={idx} className={styles.proficiencyItem}>
                  <div className={styles.proficiencyBar}>
                    <div className={styles.proficiekncyFill} style={{ width: `${category.level}%` }}></div>
                  </div>
                  <span>{category.title}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  );
}


export default PortfolioSkills;

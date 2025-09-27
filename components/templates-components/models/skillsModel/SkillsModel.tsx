import { SkillCategories } from '@/types'
import styles from './SkillsModel.module.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editTemplateData } from '@/RTK/slices/templateSlice/templateDataSlice';

function SkillsModel({ index, skillCategory, skillCategories, setSkillCategories, handleCloseModel }: { index: number, skillCategory: SkillCategories, skillCategories: SkillCategories[], setSkillCategories: (skills: SkillCategories[]) => void, handleCloseModel: (index: number) => void }) {

    const [skillData, setSkillData] = useState({ ...skillCategory });
    const [skillInput, setSkillInput] = useState('');
    const dispatch = useDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name == 'level' && (+value > 100 || +value < 0)) {
            return
        } else if (name == 'skills') {
            setSkillInput(value)
            return
        }
        setSkillData({
            ...skillData,
            [name]: value
        })

    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'Enter' && skillInput.length > 0) {
            const newSkills = [...skillData.skills];
            newSkills.push(skillInput)
            setSkillData({
                ...skillData,
                skills: newSkills
            })
            setSkillInput('')
        }
    }

    function handleDeleteskill(index: number) {
        const newSkills = skillData.skills.filter((skill, idx) => {
            return idx !== index
        })
        setSkillData({
            ...skillData,
            skills: newSkills
        })
    }

    function handleSave() {
        const newData = [
            ...skillCategories,
        ]
        newData[index] = skillData
        setSkillCategories(newData);


        dispatch(editTemplateData({ newData, key: 'skillCategories' }))
    }



    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <h1>Edit Your Skills</h1>
                    <div className={styles.inputContainer}>
                        <label htmlFor="title" className={styles.label}>Title</label>
                        <input type="text" id='title' name='title' placeholder='Title' className={styles.input} value={skillData.title} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="level" className={styles.label}>Level (0 to 100)%</label>
                        <input type="number" id='level' name='level' min={0} max={100} placeholder='level' className={styles.input} value={skillData.level} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="skills" className={styles.label}>Skills</label>
                        <input type="text" id='skills' name='skills' placeholder='skills' className={styles.input} value={skillInput} onChange={handleChange} onKeyDown={handleKeyDown} />
                        <div className={styles.skills}>
                            {
                                skillData.skills.map((skill, idx) => {
                                    return (
                                        <span className={styles.skill}>
                                            {skill}
                                            <span onClick={() => handleDeleteskill(idx)}>
                                                X
                                            </span>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <button className={`${styles.btn} ${styles.cancel}`} onClick={() => handleCloseModel(index)}>Cancel</button>
                        <button className={`${styles.btn} ${styles.save}`}
                            onClick={() => {
                                handleSave()
                                handleCloseModel(index)
                            }}
                        >Save</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SkillsModel
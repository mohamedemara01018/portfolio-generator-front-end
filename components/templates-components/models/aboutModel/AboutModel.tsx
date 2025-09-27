import React, { useState } from 'react'
import styles from './AboutModel.module.css'
import { AboutData } from '@/types'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { editTemplateData } from '@/RTK/slices/templateSlice/templateDataSlice'

function AboutModel({ aboutData, setAboutData, setModelOpen }: { aboutData: AboutData, setAboutData: (data: AboutData) => void, setModelOpen: (flag: boolean) => void }) {
    const [data, setData] = useState<AboutData>({ ...aboutData });
    const [skill, setSkill] = useState<string>('');
    const dispatch = useDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    function handleChangeSkills(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setSkill(value)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'Enter' && skill.length > 0) {
            const newSkills = [...data.skills];
            newSkills.push(skill)
            setData({
                ...data,
                skills: newSkills
            })
            setSkill('')
        }
        console.log('mohamed')
    }

    function deleteSkill(index: number) {
        const newSkills = data.skills.filter((skill, idx) => {
            return index != idx
        })

        setData({
            ...data,
            skills: newSkills
        })
    }

    function onSave() {
        dispatch(editTemplateData({ newData: data, key: 'aboutData' }))
        setAboutData(data)
        setModelOpen(false)
    }

    function onClose() {
        setModelOpen(false)
    }


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="bio">Description</label>
                        <textarea name="bio" id="bio" className={`${styles.inputBio} ${styles.input}`} value={data.bio} onChange={handleChange}></textarea>
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="title">Job Title</label>
                        <input type='text' id='title' name='experience' className={`${styles.inputTitle} ${styles.input}`} value={data.experience} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="linkedin">LinkedIn</label>
                        <input type='text' id='linkedin' name='projects' className={`${styles.inputLinkedin} ${styles.input}`} value={data.projects} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="github">Github</label>
                        <input type='text' id='github' name='focus' className={`${styles.inputDescription} ${styles.input}`} value={data.focus} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="github">skills</label>
                        <input type='text' id='github' name='skills' className={`${styles.inputDescription} ${styles.input}`} placeholder='Add Skill' value={skill} onChange={handleChangeSkills} onKeyDown={handleKeyDown} />
                        <div className={styles.skills}>
                            {
                                data.skills.map((skill, index) => {
                                    return (
                                        <p key={index} className={styles.skill}>
                                            {skill}
                                            <div className={styles.deleteIconContainer}>
                                                <MdDelete className={styles.deleteIcon} onClick={() => deleteSkill(index)} />
                                            </div>
                                        </p>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.btns}>
                    <button className={`${styles.btn} ${styles.cancel}`} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={`${styles.btn} ${styles.save}`} onClick={onSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AboutModel
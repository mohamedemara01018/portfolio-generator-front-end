import { ProjectsData } from '@/types'
import styles from './ProjectModel.module.css'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTemplateData } from '@/RTK/slices/templateSlice/templateDataSlice';
import ReactDOM from 'react-dom';

function ProjectModel({ projectsData, setProjectsData, project, index, onClose }: { projectsData: ProjectsData[], setProjectsData: (projects: ProjectsData[]) => void, project: ProjectsData, index: number, onClose: () => void }) {


    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [projectData, setProjectData] = useState({ ...project });
    const [technology, seTechnology] = useState('');



    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setProjectData({
            ...projectData,
            [name]: value
        })
    }


    function handleSave() {
        const newData = [
            ...projectsData
        ]
        newData[index] = projectData
        setProjectsData(newData)
        dispatch(editTemplateData({ newData: newData, key: 'projectsData' }));
        onClose();
    }


    function handleChangeFile() {
        let imageUrl: string = ''
        if (inputRef && inputRef.current?.files) {
            const file = inputRef.current?.files[0];
            imageUrl = URL.createObjectURL(file)
        }
        setProjectData({
            ...projectData,
            image: imageUrl
        })
    }


    function handleChangeSkills(e: React.ChangeEvent<HTMLInputElement>) {
        seTechnology(e.target.value);
    }


    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Enter") {
            const newTechnologies = [...projectData.technologies];
            newTechnologies.push(technology);
            setProjectData({
                ...projectData,
                technologies: newTechnologies
            })
        }
    }


    function handleDeleteTechnology(index: number) {
        const newTechnologies = projectData.technologies.filter((technology, idx) => {
            return idx != index
        })
        setProjectData({
            ...projectData,
            technologies: newTechnologies
        })
    }
    const projectModel = (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <div className={`${styles.inputContainer}`}>
                        <label htmlFor="title" className={styles.label} >Title</label>
                        <input type="text" className={`${styles.input} ${styles.textArea}`} id='title' placeholder='Edit title' value={projectData.title} name='title' onChange={handleChange} />
                    </div>
                    <div className={`${styles.inputContainer}`}>
                        <label htmlFor="textarea" className={styles.label} >Description</label>
                        <textarea className={`${styles.input} ${styles.textArea}`} id='textarea' placeholder='Edit description' value={projectData.description} name='description' onChange={handleChange} />
                    </div>
                    <div className={`${styles.inputContainer}`}>
                        <label htmlFor="lived-demo" className={styles.label} >Live Demo</label>
                        <input type="text" className={`${styles.input} ${styles.liveDemo}`} id='lived-demo' placeholder='Edit live demo url' value={projectData.liveUrl} name='liveUrl' onChange={handleChange} />
                    </div>
                    <div className={`${styles.inputContainer}`}>
                        <label htmlFor="code" className={styles.label} >Github Code</label>
                        <input type="text" className={`${styles.input} ${styles.code}`} id='code' placeholder='Edit github url' value={projectData.githubUrl} name='githubUrl' onChange={handleChange} />
                    </div>
                    <div className={`${styles.inputContainer}`}>
                        <label htmlFor="image" className={styles.label} >Image</label>
                        <input ref={inputRef} type="file" className={`${styles.input} ${styles.image}`} id='image' placeholder='Edit github url' onChange={handleChangeFile} />
                    </div>
                    <div className={styles.technologiesContainer}>
                        <div className={`${styles.inputContainer}`}>
                            <label htmlFor="technologies" className={styles.label} >technologies</label>
                            <input type="text" className={`${styles.input} ${styles.technologies}`} id='technologies' placeholder='Edit github url' name='technologies' value={technology} onChange={handleChangeSkills} onKeyDown={handleKeyDown} />
                        </div>
                        <div className={styles.technologies}>
                            {
                                projectData.technologies.map((technology, index) => {
                                    return (
                                        <div className={styles.technology}>
                                            <p>{technology}</p>
                                            <span onClick={() => handleDeleteTechnology(index)}>X</span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                    <div className={styles.btnsContainer}>
                        <button className={`${styles.btn} ${styles.cancel}`} onClick={onClose}>Cancel</button>
                        <button className={`${styles.btn} ${styles.save}`} onClick={() => {
                            handleSave();
                            onClose();
                        }}>Save</button>
                    </div>

                </div>
            </div>
        </div >
    )
    return ReactDOM.createPortal(projectModel, document.getElementById('projects') as HTMLElement)
}

export default ProjectModel
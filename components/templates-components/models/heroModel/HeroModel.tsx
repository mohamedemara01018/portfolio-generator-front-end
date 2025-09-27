import { HeroData } from '@/types'
import styles from './HeroModel.module.css'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTemplateData } from '@/RTK/slices/templateSlice/templateDataSlice';

function HeroModel({ heroData, setHeroData, setModelOpen }: { heroData: HeroData, setHeroData: (data: HeroData) => void, setModelOpen: (flag: boolean) => void }) {
    const [data, setData] = useState<HeroData>(heroData)
    const dispatch = useDispatch();

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;
        let isInFlatObject = false;
        if (data.hasOwnProperty(name)) {
            isInFlatObject = true;
        }
        const newData: any =
            (isInFlatObject) ?
                {
                    ...data,
                    [name]: value

                } : {
                    ...data,
                    contact: {
                        ...data.contact,
                        [name]: value
                    },
                }
        setData(newData)
    }


    function onSave() {
        dispatch(editTemplateData({ newData: data, key: 'heroData' }))
        setHeroData(data)
        setModelOpen(false)
    }
    function onClose() {
        setModelOpen(false)

    }


    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files ? e.target.files[0] : '';
        if (file) {
            const urlImage = URL.createObjectURL(file)

            const newData = {
                ...heroData,
                avatar: urlImage
            }
            setData(newData)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="name">Name</label>
                        <input type='text' id='name' name='name' className={`${styles.inputName} ${styles.input}`} value={data.name} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="title">Job Title</label>
                        <input type='text' id='title' name='title' className={`${styles.inputTitle} ${styles.input}`} value={data.title} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="bio">Description</label>
                        <textarea name="bio" id="bio" className={`${styles.inputBio} ${styles.input}`} value={data.bio} onChange={handleChange}></textarea>
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="linkedin">LinkedIn</label>
                        <input type='text' id='linkedin' name='linkedin' className={`${styles.inputLinkedin} ${styles.input}`} value={data.contact.linkedin} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="github">Github</label>
                        <input type='text' id='github' name='github' className={`${styles.inputDescription} ${styles.input}`} value={data.contact.github} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <input type='text' id='email' name='email' className={`${styles.inputEmail} ${styles.input}`} value={data.contact.email} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="avatar">Avatar</label>
                        <input type='file' id='avatar' name='avatar' className={`${styles.inputAvatar} ${styles.input}`} onChange={handleImageChange} />
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

export default HeroModel
import { Contact } from '@/types'
import styles from './ContactModel.module.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTemplateData } from '@/RTK/slices/templateSlice/templateDataSlice'

function ContactModel({ contact, setContact, setModelOpen }: { contact: Contact, setContact: (flag: Contact) => void, setModelOpen: (flag: boolean) => void }) {
    const [contactModel, setContactModel] = useState(contact)
    const dispatch = useDispatch();
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setContactModel({
            ...contactModel,
            [name]: value
        })
    }

    function handleClose() {
        setModelOpen(false)
    }

    function handleSave() {
        setContact(contactModel)
        dispatch(editTemplateData({ newData: contactModel, key: 'contact' }))
        handleClose();
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input type="email" id='email' name='email' className={styles.input} value={contactModel.email} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="linkedin" className={styles.label}>LinkedIn</label>
                        <input type="text" id='linkedin' name='linkedin' className={styles.input} value={contactModel.linkedin} onChange={handleChange} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="github" className={styles.label}>GitHub</label>
                        <input type="text" id='github' name='github' className={styles.input} value={contactModel.github} onChange={handleChange} />
                    </div>
                </div>
                <div className={styles.btns}>
                    <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={handleClose}>
                        Cancel
                    </button>
                    <button className={`${styles.btn} ${styles.saveBtn}`} onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContactModel
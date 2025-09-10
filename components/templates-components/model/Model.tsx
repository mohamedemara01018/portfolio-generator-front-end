
import styles from './Model.module.css'
import { ChangeEvent } from 'react'


interface ModelParamType {
    value: string,
    name: string,
    handleChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
    handleOpenInput: () => void,
    isOpen: boolean
}
function Model({ value, name, handleChange, handleOpenInput, isOpen }: ModelParamType) {

    return (
        <div className={styles.modelContainer} data-open={isOpen}>
            <div className={styles.modelCard}>
                <div className={styles.modelContent}>
                    <h2>Edit Your {name} link</h2>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            className={styles.input}
                            value={value}
                            name={name}
                            onChange={handleChange}
                        />
                        <div className={styles.btnsContainer}>
                            <button
                                className={`${styles.btn}  ${styles.saveBtn}`}
                                onClick={handleOpenInput}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Model
'use client';
import { ChangeEvent, useState } from 'react'
import styles from './passwordContainer.module.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function PasswordContainer({ password, handleChange, error }: { password: string, handleChange: (e: ChangeEvent<HTMLInputElement>) => void, error: string | undefined }) {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <div className={styles.passwordContainer}>

            <input type={showPassword ? 'text' : "password"}
                className={`${styles.input} ${error?.length ? styles.inputError : ''}`}
                id="password"
                placeholder='Enter Your password'
                name='password'
                value={password}
                onChange={handleChange} />

            <div className={styles.eye} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : < FaEyeSlash />}
            </div>
        </div>
    )
}

export default PasswordContainer
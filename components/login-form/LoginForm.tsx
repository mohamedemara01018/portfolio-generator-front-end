'use client'
import styles from './loginForm.module.css'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FormDataLogin, FormErrors, FormErrorsLogin } from '@/types'
import PasswordContainer from '@/reuseableComponents/passwordContainer/PasswordContainer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoginUser, loginState } from '@/RTK/slices/userSlice/loginSlice'
import { appdispatch } from '@/RTK/store'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
import { validateFormLogin } from '@/functions'

function LoginForm() {
    const [isLoading, setLoading] = useState(false)
    const [formData, setFormDate] = useState<FormDataLogin>({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState<FormErrorsLogin>({
        email: '',
        password: ''
    })

    const dispatch = useDispatch<appdispatch>();
    const login = useSelector(loginState)
    const router = useRouter();
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormDate((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const checkVaildate = validateFormLogin(formData);
        if (Object.keys(checkVaildate).length > 0) {
            setErrors(checkVaildate)
            return 0;
        }
        setErrors({})
        let res = null
        try {
            setLoading(true);
            setErrors({})
            res = await dispatch(fetchLoginUser(formData))
            if (fetchLoginUser.fulfilled.match(res)) {
                setFormDate({
                    email: '',
                    password: '',
                })
            } else if (fetchLoginUser.rejected.match(res)) {
                setErrors({ email: 'invailed email', password: 'invailed password' })
                return;
            }
            setErrors({})
        } catch (error: any) {
            alert('unExpedted Error')
        }
        finally {
            setLoading(false)
            if (fetchLoginUser.fulfilled.match(res)) {
                router.push('/')
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputContainer}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                    type="email"
                    id='email'
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder='Enter Your Email'
                    name='email' value={formData.email}
                    onChange={handleChange} />
                {errors.email && (
                    <span className={styles.errorMessage}>{errors.email}</span>
                )}
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <PasswordContainer
                    password={formData.password}
                    handleChange={handleChange}
                    error={String(errors.password)} />
                {errors.password && (
                    <span className={styles.errorMessage}>{errors.password}</span>
                )}
            </div>
            <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
            >
                {isLoading ? 'Logining...' : 'Login'}
            </button>
        </form>
    )
}

export default LoginForm
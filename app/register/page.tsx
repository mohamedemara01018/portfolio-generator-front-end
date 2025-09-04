'use client';
import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import styles from './register.module.css';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

function RegisterPage() {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setLoading] = useState(false)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const validateForm = () => {
        const newError: FormErrors = {};

        //firstName
        if (!formData.firstName) {
            newError.firstName = 'you must provide first name'
        } else if (formData.firstName.length <= 2) {
            newError.firstName = 'first name must be greate than 3 character'
        }

        //lastName
        if (!formData.lastName) {
            newError.lastName = 'you must provide last name'
        } else if (formData.lastName.length <= 2) {
            newError.lastName = 'last name must be greate than 3 character'
        }

        //email
        if (!formData.email) {
            newError.email = 'you must provide email'
        } else if (formData.email.includes('@gmail.com')) {
            newError.email = 'you must provide a valid form of email'
        }

        //password
        if (!formData.password) {
            newError.password = 'you must provide password'
        } else if (formData.password.length < 8) {
            newError.password = 'password must be greate than 8 character'
        }

        //confirmPassword
        if (!formData.confirmPassword) {
            newError.confirmPassword = 'you must provide password'
        } else if (formData.confirmPassword !== formData.password) {
            newError.confirmPassword = "confirmPassword & password are don't match["
        }

        return newError
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errorVaildate = validateForm();
        if (Object.keys(errorVaildate).length > 0) {
            setErrors(errorVaildate)
            return;
        }
        setLoading(true);
        await new Promise((res: any, rej) => setTimeout(() => {
            res("resolve successful")
        }, 3000))
        setLoading(false)
    }


    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Join us to create your amazing portfolio</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.nameRow}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="firstName" className={styles.label}>
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                                placeholder="Enter your first name"
                            />
                            {errors.firstName && (
                                <span className={styles.errorMessage}>{errors.firstName}</span>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="lastName" className={styles.label}>
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                                placeholder="Enter your last name"
                            />
                            {errors.lastName && (
                                <span className={styles.errorMessage}>{errors.lastName}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            placeholder="Enter your email address"
                        />
                        {errors.email && (
                            <span className={styles.errorMessage}>{errors.email}</span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                            placeholder="Create a strong password"
                        />
                        {errors.password && (
                            <span className={styles.errorMessage}>{errors.password}</span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword" className={styles.label}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                            placeholder="Retype your password"
                        />
                        {errors.confirmPassword && (
                            <span className={styles.errorMessage}>{errors.confirmPassword}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p className={styles.loginLink}>
                        Already have an account?{' '}
                        <Link href="/login" className={styles.link}>
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
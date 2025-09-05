'use client';
import { ChangeEvent, useState } from 'react';
import styles from './registerForm.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisterUser, registerState } from '@/RTK/slices/userSlice/registerSlice';
import { appdispatch } from '@/RTK/store';
import { useRouter } from 'next/navigation';
import { FormData, FormErrors } from '@/types';
import { validateFormRegister } from '@/functions';
import PasswordContainer from '@/reuseableComponents/passwordContainer/PasswordContainer';




function RegisterForm({ }) {
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setLoading] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '11111111',
        confirmPassword: '11111111',
        image: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    });

    const router = useRouter();
    const dispatch = useDispatch<appdispatch>();
    const user = useSelector(registerState);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateFormRegister(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setErrors({});
        let result = null
        try {
            result = await dispatch(fetchRegisterUser(formData));
            if (fetchRegisterUser.fulfilled.match(result)) {
                // Success - reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    
                });
                setErrors({});

            } else if (fetchRegisterUser.rejected.match(result)) {
                // Handle API errors

                const errorMessage = result.payload as string;
                setErrors({ email: errorMessage || 'Registration failed' });

            }
        } catch (error) {
            alert('An unexpected error occurred')
        } finally {
            setLoading(false);
            if (fetchRegisterUser.fulfilled.match(result)) {
                router.push('/')
            }

        }
    }
    return (
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

                <PasswordContainer
                    password={formData.password}
                    handleChange={handleChange}
                    error={errors.password}
                />

                {errors.password && (
                    <span className={styles.errorMessage}>{errors.password}</span>
                )}
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm Password
                </label>
                <PasswordContainer
                    password={formData.confirmPassword}
                    handleChange={handleChange}
                    error={errors.confirmPassword}
                />
                {
                    errors.confirmPassword && (
                        <span className={styles.errorMessage}>{errors.confirmPassword}</span>
                    )
                }
            </div>

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
            >
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
        </form>
    )
}

export default RegisterForm
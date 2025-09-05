import Link from 'next/link';
import styles from './register.module.css';
import RegisterForm from '@/components/register-form/RegisterForm';


function RegisterPage() {


    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Join us to create your amazing portfolio</p>
                </div>

                <RegisterForm />

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
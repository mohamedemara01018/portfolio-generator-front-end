import Link from 'next/link'
import styles from './login.module.css'
import LoginForm from '@/components/login-form/LoginForm'

function page() {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Login To Your Accout</h1>
                    <p className={styles.subTitle}>Join us to create your amazing portfolio</p>
                </div>
                <LoginForm />
                <div className={styles.footer}>
                    <p className={styles.registerLink}>
                        Don't have accout?{' '}
                        <Link href={'/register'} className={styles.link}>
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default page
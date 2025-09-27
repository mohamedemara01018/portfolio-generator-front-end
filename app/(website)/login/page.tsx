import Link from 'next/link'
import styles from './login.module.css'
import LoginForm from '@/components/website-components/login-form/LoginForm'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { authUser } from '@/functions'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/navigation'


export const metadata: Metadata = {
    title: 'Login'
}


async function page() {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    let res = await authUser(cookieHeader)
    // console.log(res)
    if (res?.logIn) {
        console.log(res.logIn)
        redirect("/", RedirectType.replace);
    }

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
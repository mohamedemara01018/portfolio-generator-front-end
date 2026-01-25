import { Metadata } from 'next'
import styles from './profile.module.css'
import { cookies } from 'next/headers';
import { authUser } from '@/functions';
import { redirect, RedirectType } from 'next/navigation';
import GoToPortfolioButton from './GoToPortfolioButton'

// must be dynamic
export const metadata: Metadata = {
    title: 'Profile'
}



async function page() {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    let res = await authUser(cookieHeader)

    if (!res?.logIn) {
        redirect("/login", RedirectType.replace);
    }

    return (
        <section className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.avatar} aria-hidden="true">👤</div>
                    <div>
                        <h1 className={styles.title}>Your Profile</h1>
                        <p className={styles.subtitle}>Manage your info and preview your portfolio</p>
                    </div>
                </div>

                <div className={styles.actions}>
                    <GoToPortfolioButton className={styles.primaryBtn}>
                        Go to Portfolio
                    </GoToPortfolioButton>
                </div>
            </div>
        </section>
    )
}

export default page
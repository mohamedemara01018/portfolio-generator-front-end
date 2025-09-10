import Link from 'next/link';
import styles from './verification.module.css';
import VerificationForm from '@/components/website-components/verification-form/VerificationForm';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Verification'
}


function VerificationPage() {
    return (
        <div className={styles.verificationContainer}>
            <div className={styles.verificationCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Verify Your Account</h1>
                    <p className={styles.subtitle}>
                        We've sent a 6-digit verification code to your email address.
                        Please enter it below to verify your account.
                    </p>
                </div>

                <VerificationForm />

                <div className={styles.footer}>
                    <p className={styles.resendText}>
                        Didn't receive the code?{' '}
                        <button className={styles.resendButton}>
                            Resend Code
                        </button>
                    </p>
                    <p className={styles.backLink}>
                        <Link href="/login" className={styles.link}>
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VerificationPage;

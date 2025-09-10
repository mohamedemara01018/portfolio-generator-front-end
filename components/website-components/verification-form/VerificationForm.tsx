'use client';
import React, { useState, useRef, useEffect, FormEvent, FormEventHandler } from 'react';
import styles from './verificationForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { appdispatch } from '@/RTK/store';
import { fetchVerifyCode, verificationCodeState } from '@/RTK/slices/userSlice/verificationSlice';
import { verificationData } from '@/types';
import { useRouter } from 'next/navigation';
import { registerState } from '@/RTK/slices/userSlice/registerSlice';
import { fetchResendCode } from '@/RTK/slices/userSlice/resendCodeSlice';


interface VerificationFormProps {
    onVerify?: (code: string) => void;
    onResend?: () => void;
}

function VerificationForm({ onVerify, onResend }: VerificationFormProps) {

    const [code, setCode] = useState<string[]>(new Array(6).fill(''));
    const [error, setError] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isResendLoading, setResendLoading] = useState<boolean>(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const router = useRouter();
    const dispatch: appdispatch = useDispatch();
    // const verificationCode = useSelector(verificationCodeState);
    const registerUser = useSelector(registerState);


    if (!registerUser.user) {
        router.replace('/')
    }


    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
    }, [])




    // handleChange
    function handleChange(element: EventTarget & HTMLInputElement, index: number) {
        const value = element.value;

        //Only Number
        if (!Number(value) && value != '0') return

        //set new code
        const newCode = [...code]
        newCode[index] = value;
        setCode(newCode);

        // move pointer to next input
        if (inputRefs.current[index] && index < 6) {
            inputRefs.current[index + 1]?.focus();
        }

    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        const newCode = [...code];
        if (e.key === 'Backspace') {
            if (code[index]) {
                // If current field has value, clear it
                newCode[index] = '';
                setCode(newCode);
            } else if (index > 0) {
                // If current field is empty, move to previous field and clear it
                newCode[index - 1] = '';
                inputRefs.current[index - 1]?.focus();
                setCode(newCode);
            }
        }
        else if (e.key === 'ArrowLeft') {
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
        else if (e.key === 'ArrowRight') {
            if (index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    }

    function handlePaste(e: React.ClipboardEvent) {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        if (pastedData.length <= 6) {
            const newCode: string[] = new Array(6).fill('');
            for (let index = 0; index < pastedData.length; index++) {
                newCode[index] = pastedData[index];
            }
            setCode(newCode)
            const nextIndex = Math.min(pastedData.length, 5);
            inputRefs.current[nextIndex]?.focus();
        }
    }


    const getVerificationCode = async (data: verificationData) => {
        let res = await dispatch(fetchVerifyCode(data))
        try {
            if (fetchVerifyCode.fulfilled.match(res)) {
                router.push('/')
            } else if (fetchVerifyCode.rejected.match(res)) {
                setError(String(res.payload))
            }
        } catch (error) {
            console.log(error)
        }
    }


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const c: string = code.join('');
        setLoading(true)
        getVerificationCode({ email: String(registerUser.user.email), code: c });
        setLoading(false)
    }

    async function handleResend() {
        setResendLoading(true);
        const res = await dispatch(fetchResendCode(registerUser.user.email));
        try {
            if (fetchResendCode.rejected.match(res)) {
                setError('error')
            }
        } catch (error) {
            console.error(error)
        }
        setResendLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.verificationForm}>
            <div className={styles.codeInputContainer}>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => { (inputRefs.current[index] = el) }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className={`${styles.codeInput} ${error ? styles.error : ''}`}
                        disabled={isLoading}
                        autoComplete="off"
                    />
                ))}
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <button
                onSubmit={handleSubmit}
                type="submit"
                className={styles.verifyButton}
                disabled={isLoading || code.join('').length !== 6}
            >
                {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>

            <button
                type="button"
                onClick={handleResend}
                className={styles.resendButton}
                disabled={isResendLoading}
            >
                {isResendLoading ? 'Sending...' : 'Resend Code'}
            </button>
        </form>
    );
}

export default VerificationForm;



// const [code, setCode] = useState<string[]>(new Array(6).fill(''));
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState('');
// const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
// console.log(inputRefs)
// // Focus on first input when component mounts
// useEffect(() => {
//     if (inputRefs.current[0]) {
//         inputRefs.current[0].focus();
//     }
// }, []);

// const handleChange = (element: HTMLInputElement, index: number) => {
//     const value = element.value;

//     //only number
//     if (!Number(value)) return;

//     const newCode = [...code];
//     newCode[index] = value;
//     setCode(newCode);
//     setError(''); // Clear error when user starts typing

//     // Move to next input if current field is filled
//     if (value && index < 5) {
//         inputRefs.current[index + 1]?.focus();
//     }
// };

// const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//     // Handle backspace
//     if (e.key === 'Backspace') {
//         const newCode = [...code];

//         if (code[index]) {
//             // If current field has value, clear it
//             newCode[index] = '';
//             setCode(newCode);
//         } else if (index > 0) {
//             // If current field is empty, move to previous field and clear it
//             newCode[index - 1] = '';
//             setCode(newCode);
//             inputRefs.current[index - 1]?.focus();
//         }
//     }

//     // Handle arrow keys
//     if (e.key === 'ArrowLeft' && index > 0) {
//         inputRefs.current[index - 1]?.focus();
//     }
//     if (e.key === 'ArrowRight' && index < 5) {
//         inputRefs.current[index + 1]?.focus();
//     }
// };

// const handlePaste = (e: React.ClipboardEvent) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text').replace(/\D/g, ''); // Remove non-digits

//     if (pastedData.length <= 6) {
//         const newCode = new Array(6).fill('');
//         for (let i = 0; i < pastedData.length; i++) {
//             newCode[i] = pastedData[i];
//         }
//         setCode(newCode);

//         // Focus on the next empty field or the last field
//         const nextIndex = Math.min(pastedData.length, 5);
//         inputRefs.current[nextIndex]?.focus();
//     }
// };

// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const verificationCode = code.join('');

//     if (verificationCode.length !== 6) {
//         setError('Please enter all 6 digits');
//         return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 1000));

//         if (onVerify) {
//             onVerify(verificationCode);
//         } else {
//             // Default behavior - you can customize this
//             console.log('Verification code:', verificationCode);
//             alert('Verification successful!');
//         }
//     } catch (error) {
//         setError('Invalid verification code. Please try again.');
//     } finally {
//         setIsLoading(false);
//     }
// };

// const handleResend = async () => {
//     setIsLoading(true);
//     setError('');
//     setCode(new Array(6).fill(''));

//     try {
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 1000));

//         if (onResend) {
//             onResend();
//         } else {
//             alert('Verification code sent!');
//         }

//         // Focus on first input after resend
//         inputRefs.current[0]?.focus();
//     } catch (error) {
//         setError('Failed to resend code. Please try again.');
//     } finally {
//         setIsLoading(false);
//     }
// };


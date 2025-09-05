'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './header.module.css'
import ToggleTheme from '../toggleTheme/ToggleTheme'
import Link from 'next/link'
import { CiBoxList } from 'react-icons/ci'
import Dropdown from '../dropdown/Dropdown'
import { useDispatch, useSelector } from 'react-redux';
import { registerState } from '@/RTK/slices/userSlice/registerSlice';
import { loginState } from '@/RTK/slices/userSlice/loginSlice';
import { appdispatch } from '@/RTK/store';
import { fetchAuthUser } from '@/RTK/slices/userSlice/authSlice';
import ProfileHeader from '../profileHeader/ProfileHeader';
import { userProfile } from '@/types';
import { logoutUserState } from '@/RTK/slices/userSlice/logoutSlice';


function Header() {
    const [toggle, setToggle] = useState(false);
    const [user, setUser] = useState<userProfile | undefined>({ image: '' });
    const [login, setLogin] = useState(false);
    const dispatch = useDispatch<appdispatch>();
    const userState = useSelector(registerState);
    const userLoginState = useSelector(loginState)
    const logoutState = useSelector(logoutUserState);

    async function getUser() {
        try {
            const res = await dispatch(fetchAuthUser()).unwrap();
            setUser(res.user); // Set user based on logIn status
            setLogin(res.logIn);
        } catch (error) {
            console.error("auth check failed:", error);
            setLogin(false);
        }
    }
    useEffect(() => {
        getUser();
    }, [])
    useEffect(() => {
        getUser();
    }, [userState, userLoginState, logoutState])
    useEffect(() => {
    }, [user])
    return (
        <header className={`${styles.header}`}>
            <div className={styles.logo}>
                <Image
                    src="/logo2.png"
                    alt="Portfolio Logo"
                    width={50}
                    height={50}
                    className={styles.logoImage}
                />
                <span className={styles.logoText}>Portfolio</span>
            </div>

            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li><a href="#home" className={styles.navLink}>Home</a></li>
                    <li><a href="#about" className={styles.navLink}>About</a></li>
                    <li><a href="#projects" className={styles.navLink}>Projects</a></li>
                    <li><a href="#skills" className={styles.navLink}>Skills</a></li>
                    <li><a href="#contact" className={styles.navLink}>Contact</a></li>
                </ul>
            </nav>

            <div className={styles.auth}>
                <ToggleTheme />
                {!login ? <>< Link href={'/login'} className={`${styles.loginBtn} ${styles.btn}`}>Login</Link>
                    <Link href={'/register'} className={`${styles.signupBtn} ${styles.btn}`}>Sign Up</Link></> : (
                    <ProfileHeader image={String(user?.image)} />
                )}
                <CiBoxList className={styles.toggleList} onClick={() => setToggle(true)} />
                <Dropdown toggle={toggle} setToggle={setToggle} />
            </div>

        </header >
    )
}

export default Header
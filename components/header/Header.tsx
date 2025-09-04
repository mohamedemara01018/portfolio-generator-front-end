'use client';
import React, { useState } from 'react'
import Image from 'next/image'
import styles from './header.module.css'
import ToggleTheme from '../toggleTheme/ToggleTheme'
import Link from 'next/link'
import { CiBoxList } from 'react-icons/ci'
import Dropdown from '../dropdown/Dropdown'

function Header() {
    const [toggle, setToggle] = useState(false)
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
                <Link href={'/login'} className={`${styles.loginBtn} ${styles.btn}`}>Login</Link>
                <Link href={'/register'} className={`${styles.signupBtn} ${styles.btn}`}>Sign Up</Link>
                <CiBoxList className={styles.toggleList} onClick={() => setToggle(true)} />
                <Dropdown toggle={toggle} setToggle={setToggle} />
            </div>

        </header>
    )
}

export default Header
'use client';
import React, { useState, useEffect } from 'react'
import styles from './toggleTheme.module.css'
import { useDispatch } from 'react-redux';
import { toggleTheme } from '@/RTK/slices/theme/themeSlice';
import { useSelector } from 'react-redux';
import { themeState } from '@/RTK/slices/theme/themeSlice';

function ToggleTheme() {
    const [isDark, setIsDark] = useState(false)
    const dispatch = useDispatch();
    const theme = useSelector(themeState)
    useEffect(() => {
        setIsDark(theme === 'dark')
    }, [theme])
    return (
        <button
            className={styles.themeToggle}
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
        >
            <div className={`${styles.toggleTrack} ${isDark ? styles.dark : styles.light}`}>
                <div className={`${styles.toggleThumb} ${isDark ? styles.thumbDark : styles.thumbLight}`}>
                    <span className={styles.icon}>
                        {isDark ? '🌙' : '☀️'}
                    </span>
                </div>
            </div>
        </button>
    )
}

export default ToggleTheme
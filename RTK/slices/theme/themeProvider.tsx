'use client';

import React from 'react'
import { useSelector } from 'react-redux'
import { themeState } from './themeSlice'

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = useSelector(themeState)


    return (
        <html lang='en' className={String(theme)}>
            {children}
        </html>

    )
}

export default ThemeProvider
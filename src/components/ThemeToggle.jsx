"use client"

import { useState, useEffect } from "react"
import "../styles/ThemeToggle.css"

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        if (savedTheme) {
            setIsDark(savedTheme === 'dark')
        } else {
            setIsDark(prefersDark)
        }
    }, [])

    useEffect(() => {
        // Apply theme to document
        if (!isDark) {
            document.documentElement.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
            localStorage.setItem('theme', 'light')
        }
    }, [isDark])

    const handleToggle = () => {
        setIsDark(!isDark)
    }

    return (
        <label className="switch">
            
            <input
                checked={!isDark}
                class="theme-checkbox"
                id = "checkbox"
                type="checkbox"
                onChange={handleToggle}
            />
            
        </label>
    )
}

export default ThemeToggle
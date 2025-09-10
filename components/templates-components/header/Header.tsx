'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';

interface HeaderProps {
  portfolioName?: string;
  showNavigation?: boolean;
}

export default function Header({ portfolioName = "Portfolio", showNavigation = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  const navigationItems = [
    { label: 'Home', href: '#hero', action: () => scrollToSection('hero') },
    { label: 'About', href: '#about', action: () => scrollToSection('about') },
    { label: 'Projects', href: '#projects', action: () => scrollToSection('projects') },
    { label: 'Skills', href: '#skills', action: () => scrollToSection('skills') },
    { label: 'Contact', href: '#contact', action: () => scrollToSection('contact') },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            
            <span className={styles.logoText}>{portfolioName}</span>
          </Link>
        </div>

        {showNavigation && (
          <>
            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
              <ul className={styles.navList}>
                {navigationItems.map((item) => (
                  <li key={item.label} className={styles.navItem}>
                    <button
                      onClick={item.action}
                      className={styles.navLink}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.headerActions}>
              <button className={styles.ctaButton}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                </svg>
                Hire Me
              </button>

              <button
                className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleOpen : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className={styles.mobileOverlay} onClick={closeMenu}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileMenuHeader}>
              <h3>Navigation</h3>
              <button onClick={closeMenu} className={styles.closeButton}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
            <nav className={styles.mobileNav}>
              <ul className={styles.mobileNavList}>
                {navigationItems.map((item) => (
                  <li key={item.label} className={styles.mobileNavItem}>
                    <button
                      onClick={item.action}
                      className={styles.mobileNavLink}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.mobileMenuFooter}>
              <button className={styles.mobileCta}>
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
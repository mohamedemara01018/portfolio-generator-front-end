'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { themeState } from '@/RTK/slices/theme/themeSlice';
import styles from './footer.module.css';
import Link from 'next/link';
import { socialLinks } from '@/constant';

function Footer() {
    // const theme = useSelector(themeState);
    const currentYear = new Date().getFullYear();


    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' }
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                {/* Brand Section */}
                <div className={styles.brandSection}>
                    <h3 className={styles.brandTitle}>Portfolio Generator</h3>
                    <p className={styles.brandDescription}>
                        Creating beautiful portfolios with modern technology
                    </p>
                </div>

                {/* Quick Links */}
                <div className={styles.linksSection}>
                    <h4 className={styles.sectionTitle}>Quick Links</h4>
                    <ul className={styles.linksList}>
                        {quickLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className={styles.link}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Links */}
                <div className={styles.socialSection}>
                    <h4 className={styles.sectionTitle}>Connect</h4>
                    <div className={styles.socialLinks}>
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                className={styles.socialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                            >
                                <span className={styles.socialIcon}>{social.icon}</span>
                                <span className={styles.socialName}>{social.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottomBar}>
                <div className={styles.copyright}>
                    <p>&copy; {currentYear} Portfolio Generator. All rights reserved.</p>
                </div>
                <div className={styles.techStack}>
                    <p>Built with Next.js, TypeScript & Redux</p>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
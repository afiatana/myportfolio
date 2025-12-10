"use client";
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo} onClick={closeMenu}>
                Portfolio.
            </Link>

            <button
                className={`${styles.hamburger} ${isOpen ? styles.active : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle navigation"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
                <li className={styles.navItem}>
                    <Link href="#about" className={styles.navLink} onClick={closeMenu}>About</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="#skills" className={styles.navLink} onClick={closeMenu}>Skills</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="#projects" className={styles.navLink} onClick={closeMenu}>Projects</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="#experience" className={styles.navLink} onClick={closeMenu}>Experience</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/blog" className={styles.navLink} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Blog</Link>
                </li>
                {/* Mobile only CTA inside menu */}
                <li className={`${styles.navItem} ${styles.mobileCta}`} style={{ marginTop: '1rem' }}>
                    <Link href="#contact" className={styles.ctaButton} onClick={closeMenu}>
                        Let's Talk
                    </Link>
                </li>
            </ul>

            <Link href="#contact" className={styles.ctaButton}>
                Let's Talk
            </Link>
        </nav>
    );
}

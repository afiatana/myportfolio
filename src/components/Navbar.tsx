import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.logo}>
                Portfolio.
            </Link>

            <ul className={styles.navLinks}>
                <li className={styles.navItem}>
                    <Link href="#about" className={styles.navLink}>About</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="#skills" className={styles.navLink}>Skills</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="#projects" className={styles.navLink}>Projects</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="#experience" className={styles.navLink}>Experience</Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="#blog" className={styles.navLink}>Blog</Link>
                </li>
            </ul>

            <Link href="#contact" className={styles.ctaButton}>
                Let's Talk
            </Link>
        </nav>
    );
}

import { CiBoxList } from 'react-icons/ci'
import styles from './dropdown.module.css'

function Dropdown({ toggle, setToggle }: { toggle: boolean, setToggle: (val: boolean) => void }) {
    return (
        <div className={`${styles.dropdown} ${toggle ? ` ${styles.isToggle}` : null} `}>
            <nav className={styles.nav}>
                <ul className={styles.navList} onClick={() => setToggle(false)}>
                    <li><a href="#home" className={styles.navLink}>Home</a></li>
                    <li><a href="#about" className={styles.navLink}>About</a></li>
                    <li><a href="#projects" className={styles.navLink}>Projects</a></li>
                    <li><a href="#skills" className={styles.navLink}>Skills</a></li>
                    <li><a href="#contact" className={styles.navLink}>Contact</a></li>
                </ul>
            </nav>
            <CiBoxList className={styles.toggleList} onClick={() => setToggle(false)} />
        </div>
    )
}

export default Dropdown
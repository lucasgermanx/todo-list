import styles from './Header.module.css'
import todoLogo from "../assets/rocket.png"

export function Header() {
    return (
        <header className={styles.header}>
            <img src={todoLogo} alt="Logotipo Todo-List" />
            <h1>to<span>do</span> </h1>
        </header>
    )
}
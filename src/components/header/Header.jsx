import { Link } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  return (
    <div className={styles.navbar_wrapped}>
        <div className={styles.navbar_container}>
        <button type='button'>Подати оголошення</button>
        </div>
    </div>
  )
}

export default Header
import React from 'react'
import styles from './Sidebar.module.css'
import FromAddAnouncement from '../form/FromAddAnouncement'

function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
      <FromAddAnouncement/>
    </div>
  )
}

export default Sidebar
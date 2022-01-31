import React from "react"
import * as styles from "./badge.module.css"

export default function Badge({ children }) {
  return <span className={styles.badge}>{children}</span>
}

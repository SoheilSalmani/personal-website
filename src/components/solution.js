import React from "react"
import * as styles from "./solution.module.css"

export default function Solution({ children }) {
  return (
    <details className={styles.solution}>
      <summary>Solution</summary>
      <div className={styles.solutionContent}>{children}</div>
    </details>
  )
}

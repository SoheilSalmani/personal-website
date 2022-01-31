import React from "react"
import Header from "../components/header"
import "../styles/global.css"
import "katex/dist/katex.min.css"
import * as styles from "./layout.module.css"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={styles.mainContent}>{children}</main>
    </>
  )
}

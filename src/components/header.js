import React from "react"
import { Link } from "gatsby"
import * as styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigationBar}>
        <ul>
          <li>
            <Link to="/">Soheil Salmani</Link>
          </li>
          <li>
            <Link to="/" activeClassName="current-page">
              Home
            </Link>
          </li>
          <li>
            <Link to="/skills/" activeClassName="current-page">
              Skills
            </Link>
          </li>
          <li>
            <Link to="/resources/" activeClassName="current-page">
              Resources
            </Link>
          </li>
          <li>
            <Link to="/exercises/" activeClassName="current-page">
              Exercises
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

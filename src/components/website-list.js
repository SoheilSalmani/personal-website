import React from "react"
import ProgressBar from "../components/progress-bar"
import * as styles from "./website-list.module.css"

export default function WebsiteList({ websites }) {
  return (
    <>
      {websites.map(website => (
        <section className={styles.websiteSection}>
          <a href={website.link} target="_blank">
            <img src={website.image} className={styles.websiteImage} />
          </a>
          <div className={styles.websiteDetails}>
            <h3>{website.title}</h3>
            {website.structure.map(path => (
              <>
                {path.path}
                <ProgressBar progression={path.progression} />
              </>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}

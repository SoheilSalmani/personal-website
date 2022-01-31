import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Badge from "../components/badge"
import ProgressBar from "../components/progress-bar"
import * as styles from "./course-list.module.css"

const renderAuthors = authors => {
  if (authors.length === 1) return authors
  return authors.slice(0, -1).join(", ") + " & " + authors[authors.length - 1]
}

const renderEdition = edition => {
  if (!edition) return
  const splitted = edition.split(/(\d+)(\w+)/).filter(Boolean)
  if (splitted.length > 1) {
    return (
      <Badge>
        {splitted[0]}
        <sup>{splitted[1]}</sup>
        {splitted[2]}
      </Badge>
    )
  }
  return <Badge>{edition}</Badge>
}

const renderProgressBar = (progression, status) => {
  return <ProgressBar progression={progression} status={status} />
}

export default function CourseList({ courses }) {
  return (
    <>
      {courses.map(course => (
        <section className={styles.courseSection}>
          <a href={course.link} target="_blank">
            <GatsbyImage
              className={styles.courseImage}
              image={getImage(course.image)}
            />
          </a>
          <div className={styles.courseDetails}>
            <h3>
              {course.title} {renderEdition(course.edition)}{" "}
              {course.isVideo && <Badge>Video</Badge>}
            </h3>
            {course.subtitle && <h4>{course.subtitle}</h4>}
            {renderAuthors(course.authors)}
            <div className={styles.badgeContainers}>
              <Badge>
                <b>{course.publicationDate ?? <i>Not published yet</i>}</b>
              </Badge>
            </div>
            {renderProgressBar(course.progression, course.status)}
            <small>{course.progression.total} chapters</small>
          </div>
        </section>
      ))}
    </>
  )
}

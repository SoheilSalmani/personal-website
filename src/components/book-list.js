import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Badge from "../components/badge"
import ProgressBar from "../components/progress-bar"
import * as styles from "./book-list.module.css"

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

export default function BookList({ books }) {
  return (
    <>
      {books.map(book => (
        <section className={styles.bookSection}>
          <a href={book.link} target="_blank">
            <GatsbyImage
              className={styles.bookImage}
              image={getImage(book.image)}
            />
          </a>
          <div className={styles.bookDetails}>
            <h3>
              {book.title} {renderEdition(book.edition)}{" "}
              {book.isVideo && <Badge>Video</Badge>}
            </h3>
            {book.subtitle && <h4>{book.subtitle}</h4>}
            {renderAuthors(book.authors)}
            <div className={styles.badgeContainers}>
              <Badge>
                <b>{book.publicationDate ?? <i>Not published yet</i>}</b>
              </Badge>{" "}
              {book.isbn && <Badge><b>ISBN:</b> {book.isbn}</Badge>}
            </div>
            {renderProgressBar(book.progression, book.status)}
            <small>{book.progression.total} chapters</small>
          </div>
        </section>
      ))}
    </>
  )
}

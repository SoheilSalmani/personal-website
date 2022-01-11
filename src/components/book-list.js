import React from "react"
import { css } from "@emotion/react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Badge from "../components/badge"
import ProgressBar from "../components/progress-bar"

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
        <article
          css={css`
            display: flex;
            padding: 25px;
          `}
        >
          <a href={book.link} target="_blank">
            <GatsbyImage
              image={getImage(book.image)}
              css={css`
                cursor: pointer;
                border-radius: 0.25rem;
                box-shadow: -2px 6px 19px 0px #7f818e;
                transition: 0.3s ease;

                &:hover {
                  transform: scale(1.1);
                }
              `}
            />
          </a>
          <div
            css={css`
              padding: 0 25px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            `}
          >
            <h3
              css={css`
                font-size: 1.2rem;
              `}
            >
              {book.title} {renderEdition(book.edition)}{" "}
              {book.isVideo && <Badge backgroundColor="#853530">Video</Badge>}
            </h3>
            {book.subtitle && (
              <h4
                css={css`
                  font-size: 1rem;
                  color: #555;
                `}
              >
                {book.subtitle}
              </h4>
            )}
            {renderAuthors(book.authors)}{" "}
            <div
              css={css`
                margin-top: 0.35rem;
                margin-bottom: 0.7rem;
              `}
            >
              <Badge backgroundColor="#cccc00" color="#000">
                <b>{book.publicationDate ?? <i>Not published yet</i>}</b>
              </Badge>{" "}
              <Badge backgroundColor="darkblue">
                <b>ISBN:</b> {book.isbn}
              </Badge>
            </div>
            {renderProgressBar(book.progression, book.status)}
            <small
              css={css`
                margin-top: 0.15rem;
              `}
            >
              {book.progression.total} chapters
            </small>
          </div>
        </article>
      ))}
    </>
  )
}

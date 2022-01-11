import React from "react"
import { css } from "@emotion/react"
import ProgressBar from "../components/progress-bar"

const renderProgressBar = (progression, status) => {
  return <ProgressBar progression={progression} status={status} />
}

export default function WebsiteList({ websites }) {
  return (
    <>
      {websites.map(website => (
        <article
          css={css`
            display: flex;
            padding: 25px;
          `}
        >
          <a href={website.link} target="_blank">
            <img
              src={website.image}
              css={css`
                cursor: pointer;
                border-radius: 0.25rem;
                transition: 0.3s ease;
                width: 200px;

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
              {website.title}
            </h3>
            {website.structure.map(path => (
              <>
                {path.path}
                {renderProgressBar(path.progression, path.status)}
              </>
            ))}
          </div>
        </article>
      ))}
    </>
  )
}

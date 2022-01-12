import { css } from "@emotion/react"
import React from "react"

export default function Solution({ children }) {
  return (
    <details
      css={css`
        border: 1px solid #aaa;
        border-radius: 4px;
        text-align: justify;
        margin-bottom: 0.7rem !important;

        &[open] summary {
          border-bottom: 1px solid #aaa;
        }
      `}
    >
      <summary
        css={css`
          cursor: pointer;
          padding: 0.5rem;
          font-weight: bold;
          font-variant: small-caps;
        `}
      >
        Solution
      </summary>
      <div
        css={css`
          padding: 0.5rem;
        `}
      >
        {children}
      </div>
    </details>
  )
}

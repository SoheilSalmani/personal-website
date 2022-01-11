import React from "react"
import { css } from "@emotion/react"

export default function Badge({
  children,
  color = "#fff",
  backgroundColor = "#6c757d",
  margin = 0,
}) {
  return (
    <span
      css={css`
        color: ${color};
        display: inline-block;
        background-color: ${backgroundColor};
        padding: 0.25rem 0.4rem;
        font-size: 0.7rem;
        text-align: center;
        vertical-align: bottom;
        border-radius: 0.25rem;
        margin: ${margin};
      `}
    >
      {children}
    </span>
  )
}

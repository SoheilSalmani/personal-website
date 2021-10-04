import React from "react"
import { Global, css } from "@emotion/react"
import Header from "../components/header"
import { rhythm } from "../utils/typography"

const Layout = ({ children }) => (
  <>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }
      `}
    />
    <Header />
    <main
      css={css`
        padding: ${rhythm(4 / 4)};
      `}
    >
      {children}
    </main>
  </>
)

export default Layout

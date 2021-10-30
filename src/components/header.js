import React from "react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"

const NavLink = styled(Link)`
  text-decoration: none;
  display: block;

  &.current-page {
    border-bottom: 2px solid #fff;

    &:hover {
      border-color: #3498db;
    }
  }
`

const Header = () => (
  <header
    css={css`
      background: #141618;
      color: #fff;
      display: flex;
      justify-content: space-between;
      padding: ${rhythm(2 / 4)} ${rhythm(4 / 4)};
      font-variant: small-caps;
      align-items: center;
    `}
  >
    <NavLink
      to="/"
      css={css`
        font-size: ${scale(3 / 6).fontSize};
        line-height: ${scale(3 / 6).lineHeight};
        font-weight: bold;
      `}
    >
      Soheil Salmani
    </NavLink>
    <nav
      css={css`
        font-size: ${scale(1 / 6).fontSize};
        line-height: ${scale(1 / 6).lineHeight};

        & li {
          margin: 0 0 0 ${rhythm(2 / 4)};
        }
      `}
    >
      <ul
        css={css`
          margin: 0;
          list-style-type: none;
          display: flex;
        `}
      >
        <li>
          <NavLink to="/" activeClassName="current-page">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/skills/" activeClassName="current-page">
            Skills
          </NavLink>
        </li>
        <li>
          <NavLink to="/exercises/" activeClassName="current-page">
            Exercises
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header

import { MDXProvider } from "@mdx-js/react"
import React from "react"

import Solution from "./src/components/solution"

const components = {
  Solution: props => <Solution {...props} />,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)

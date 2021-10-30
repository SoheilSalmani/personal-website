import { MDXProvider } from "@mdx-js/react"
import React from "react"

import CodeBlock from "./src/components/code-block"
import Solution from "./src/components/solution"

const components = {
  code: props => <CodeBlock {...props} />,
  Solution: props => <Solution {...props} />,
}

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)

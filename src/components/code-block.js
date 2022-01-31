import styled from "@emotion/styled"
import _ from "lodash"
import Highlight, { defaultProps } from "prism-react-renderer"
import { Prism } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import React from "react"
import * as styles from "./code-block.module.css"

  ; (typeof global !== "undefined" ? global : window).Prism = Prism

require("prismjs/components/prism-bash")
require("prismjs/components/prism-csharp")
require("prismjs/components/prism-docker")
require("prismjs/components/prism-groovy")
require("prismjs/components/prism-hcl")
require("prismjs/components/prism-ini")
require("prismjs/components/prism-java")
require("prismjs/components/prism-latex")
require("prismjs/components/prism-markdown")
require("prismjs/components/prism-properties")
require("prismjs/components/prism-rest")
require("prismjs/components/prism-scala")
require("prismjs/components/prism-toml")

const LineNumber = styled.div`
  background-color: ${({ lineNumber, highlightedLines }) =>
    highlightedLines.includes(lineNumber + 1)
      ? "rgba(199, 146, 234, 0.25)"
      : "unset"};
  color: ${({ lineNumber, highlightedLines }) =>
    highlightedLines.includes(lineNumber + 1)
      ? "rgba(255, 255, 255, 0.5)"
      : "unset"};
  border-left: ${({ lineNumber, highlightedLines }) =>
    highlightedLines.includes(lineNumber + 1)
      ? "5px solid rgb(199, 146, 234)"
      : "unset"};
`

const LineContent = styled.div`
  padding-left: ${({ isNumbered }) => (isNumbered ? "1rem" : "0.5rem")};
  padding-right: ${({ isNumbered }) => (isNumbered ? "1rem" : "0.5rem")};
  background-color: ${({ lineNumber, highlightedLines }) =>
    highlightedLines.includes(lineNumber + 1)
      ? "rgba(199, 146, 234, 0.25)"
      : "unset"};
  border-left: ${({ lineNumber, highlightedLines, isNumbered }) =>
    highlightedLines.includes(lineNumber + 1) && !isNumbered
      ? "5px solid rgb(199, 146, 234)"
      : "unset"};
`

export default function CodeBlock({ children, className, hl = "", nu, fp }) {
  const language = className.replace(/language-/, "")
  let highlightedLines = hl.split(",")
  highlightedLines = highlightedLines.map(section => {
    const range = section.split("..")
    if (range.length > 1) {
      return _.range(Number(range[0]), Number(range[1]) + 1)
    }
    return Number(section)
  })
  highlightedLines = highlightedLines.flat()

  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className={styles.codeContent}>
          {fp && <div className={styles.codeTitle}>{fp}</div>}
          <div className={`${className} ${styles.codeBlock}`} style={style}>
            {tokens.map((line, i) => (
              <>
                {nu && (
                  <LineNumber
                    className={styles.lineNumber}
                    lineNumber={i}
                    highlightedLines={highlightedLines}
                  >
                    {i + 1}
                  </LineNumber>
                )}
                <LineContent
                  lineNumber={i}
                  highlightedLines={highlightedLines}
                  isNumbered={nu}
                  className={styles.lineContent}
                  {...getLineProps({ line, key: i })}
                >
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </>
            ))}
          </div>
        </div>
      )}
    </Highlight>
  )
}

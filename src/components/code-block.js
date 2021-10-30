import { css } from "@emotion/react"
import styled from "@emotion/styled"
import _ from "lodash"
import Highlight, { defaultProps } from "prism-react-renderer"
import { Prism } from "prism-react-renderer"
import theme from "prism-react-renderer/themes/nightOwl"
import React from "react"
;(typeof global !== "undefined" ? global : window).Prism = Prism

require("prismjs/components/prism-bash")
require("prismjs/components/prism-csharp")
require("prismjs/components/prism-docker")
require("prismjs/components/prism-groovy")
require("prismjs/components/prism-ini")
require("prismjs/components/prism-java")
require("prismjs/components/prism-markdown")
require("prismjs/components/prism-properties")
require("prismjs/components/prism-rest")
require("prismjs/components/prism-toml")

const Code = styled.div`
  padding: 0.5rem 0 0.5rem 0;
  display: grid;
  grid-template-columns: auto 1fr;
  break-inside: avoid;
  overflow: auto;
`

const CodeTitle = styled.div`
  padding: 0.25rem 0 0.25rem calc(0.5rem + 5px);
  background-color: #2a3c4f;
  font-size: 0.8rem;
  font-weight: bold;
  color: rgb(214, 222, 235);
  & + pre {
    border-radius: 0 0 5px 5px;
  }
`

const LineNumber = styled.div`
  user-select: none;
  line-height: 1.1rem;
  box-sizing: border-box;
  grid-column-start: 1;
  text-align: right;
  padding-left: 0.5rem;
  background-color: ${({ lineNumber, highlightedLines }) =>
    highlightedLines.includes(lineNumber + 1)
      ? "rgba(199, 146, 234, 0.25)"
      : "transparent"};
  color: ${({ lineNumber, highlightedLines }) =>
    highlightedLines.includes(lineNumber + 1)
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(255, 255, 255, 0.3)"};
  border-left: ${({ lineNumber, highlightedLines }) =>
    highlightedLines.includes(lineNumber + 1)
      ? "5px solid rgb(199, 146, 234)"
      : "5px solid rgb(1, 22, 39)"};
`

const LineContent = styled.div`
  box-sizing: border-box;
  line-height: 1.1rem;
  grid-column-start: 2;
  padding-left: ${({ isNumbered }) => (isNumbered ? "1rem" : "0.5rem")};
  padding-right: ${({ isNumbered }) => (isNumbered ? "1rem" : "0.5rem")};
  background-color: ${({ lineNumber, highlightedLines }) =>
    highlightedLines.includes(lineNumber + 1)
      ? "rgba(199, 146, 234, 0.25)"
      : "transparent"};
  border-left: ${({ lineNumber, highlightedLines, isNumbered }) =>
    highlightedLines.includes(lineNumber + 1) && !isNumbered
      ? "5px solid rgb(199, 146, 234)"
      : "5px solid transparent"};
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
        <div
          css={css`
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
              0 6px 6px rgba(0, 0, 0, 0.23);
            border-radius: 5px;
            overflow: hidden;
          `}
        >
          {fp && <CodeTitle>{fp}</CodeTitle>}
          <Code className={className} style={style}>
            {tokens.map((line, i) => (
              <>
                {nu && (
                  <LineNumber
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
                  {...getLineProps({ line, key: i })}
                >
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </>
            ))}
          </Code>
        </div>
      )}
    </Highlight>
  )
}

import React from "react"
import { css, keyframes } from "@emotion/react"

const blink1 = keyframes`
  from {
    fill: #8b0000;
  }
  to {
    fill: #aaa;
  }
`

const blink2 = keyframes`
  from {
    fill: #cccc00;
  }
  to {
    fill: #8b0000;
  }
`

const renderProgressBar = (progression, status) => {
  let progressStacks = []
  let totalStacks = progression.total
  let xlinkHref
  for (const i of Array(totalStacks).keys()) {
    if (totalStacks === 1) {
      xlinkHref = "#uniqueProgressStack"
    } else if (i === 0) {
      xlinkHref = "#firstProgressStack"
    } else if (i === totalStacks - 1) {
      xlinkHref = "#lastProgressStack"
    } else {
      xlinkHref = "#progressStack"
    }
    let componentProps = {
      x: i * 110,
      y: 0,
      xlinkHref: xlinkHref,
    }
    switch (progression.completion[i]) {
      case 1:
        componentProps["fill"] = "#8b0000"
        break
      case 2:
        componentProps["fill"] = "#cccc00"
        break
      default:
        componentProps["fill"] = "#aaa"
    }
    if (
      i ===
        progression.completion.indexOf(Math.min(...progression.completion)) &&
      status == "READING"
    ) {
      const blink = progression.completion[i] === 0 ? blink1 : blink2
      componentProps["css"] = css`
        animation-duration: 0.5s;
        animation-name: ${blink};
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: linear;
      `
    }
    progressStacks.push(<use {...componentProps} />)
  }
  return progressStacks
}

export default function ProgressBar({ progression, status }) {
  return (
    <svg
      viewBox={`0 0 ${progression.total * (100 + 10)} 100`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="none"
      height="20px"
      width="600px"
      css={css`
        border-radius: 0.5rem;
      `}
    >
      <defs>
        <polygon
          id="firstProgressStack"
          points="0,0 100,0 125,50 100,100 0,100"
        />
        <polygon
          id="progressStack"
          points="25,50 0,0 100,0 125,50 100,100 0,100"
        />
        <polygon
          id="lastProgressStack"
          points="25,50 0,0 135,0 135,100 0,100"
        />
        <polygon id="uniqueProgressStack" points="0,0 110,0 110,100 0,100" />
      </defs>
      {renderProgressBar(progression, status)}
    </svg>
  )
}

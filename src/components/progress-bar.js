import React from "react"
import * as styles from "./progress-bar.module.css"

const renderProgressBar = progression => {
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
    if (progression.completion[i]) {
      componentProps.fill = "#8b0000"
    } else {
      componentProps.fill = "#aaa"
    }
    progressStacks.push(<use {...componentProps} />)
  }
  return progressStacks
}

export default function ProgressBar({ progression }) {
  return (
    <svg
      viewBox={`0 0 ${progression.total * (100 + 10)} 100`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="none"
      height="20px"
      width="600px"
      className={styles.progressBar}
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
      {renderProgressBar(progression)}
    </svg>
  )
}

import React from "react"
import Layout from "../components/layout"

export default function ExerciseSheetLayout({ children, pageContext }) {
  const data = pageContext.frontmatter
  return (
    <Layout>
      <h1>{data.title}</h1>
      {children}
    </Layout>
  )
}

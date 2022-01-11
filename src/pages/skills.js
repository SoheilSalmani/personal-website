import React from "react"
import Layout from "../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
import useSkills from "../hooks/use-skills"

export default function SkillsPage() {
  const skills = useSkills()

  const createSubskillsList = subskills => {
    if (!subskills) return
    return (
      <>
        <p>
          <b>Subskills:</b>
        </p>
        <ul>
          {subskills.map(subskill => (
            <li key={subskill.id}>{subskill.title}</li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <Layout>
      <h1>Skills</h1>
      {skills.map(skill => (
        <section key={skill.id}>
          <h2>{skill.title}</h2>
          <MDXRenderer>{skill.description}</MDXRenderer>
          <p>
            <b>Score:</b> {skill.score}
          </p>
          {createSubskillsList(skill.subskills)}
        </section>
      ))}
    </Layout>
  )
}

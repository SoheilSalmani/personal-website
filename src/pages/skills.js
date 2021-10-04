import React from "react"
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
            <li>{subskill.title}</li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <>
      {skills.map(skill => (
        <section>
          <h2>{skill.title}</h2>
          <div
            className="skill-description"
            dangerouslySetInnerHTML={{
              __html: skill.description,
            }}
          />
          <p>
            <b>Score:</b> {skill.score}
          </p>
          {createSubskillsList(skill.subskills)}
        </section>
      ))}
    </>
  )
}

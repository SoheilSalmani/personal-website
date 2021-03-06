import { graphql, useStaticQuery } from "gatsby"

const useSkills = (lang = "en-US") => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSkill {
        nodes {
          id
          title
          description {
            childMdx {
              body
            }
          }
          score
          node_locale
          subskills {
            id
            title
          }
        }
      }
    }
  `)
  return data.allContentfulSkill.nodes
    .map(skill => ({
      id: skill.id,
      title: skill.title,
      description: skill.description.childMdx.body,
      score: skill.score,
      lang: skill.node_locale,
      subskills: skill.subskills,
    }))
    .filter(skill => skill.lang === lang)
}

export default useSkills

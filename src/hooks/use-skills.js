import { graphql, useStaticQuery } from "gatsby"

const useSkills = (lang = "en-US") => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulSkill {
        nodes {
          title
          description {
            childMdx {
              body
            }
          }
          score
          node_locale
          subskills {
            title
          }
        }
      }
    }
  `)
  return data.allContentfulSkill.nodes
    .map(skill => ({
      title: skill.title,
      description: skill.description.childMdx.body,
      score: skill.score,
      lang: skill.node_locale,
      subskills: skill.subskills,
    }))
    .filter(skill => skill.lang === lang)
}

export default useSkills

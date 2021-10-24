import { graphql, useStaticQuery } from "gatsby"

export default function useExerciseSheets() {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { fields: frontmatter___title }
        filter: { fields: { type: { eq: "ExerciseSheet" } } }
      ) {
        nodes {
          id
          frontmatter {
            title
            relatedResources
            tags
          }
          slug
        }
      }
    }
  `)

  return data.allMdx.nodes.map(exerciseSheet => ({
    id: exerciseSheet.id,
    title: exerciseSheet.frontmatter.title,
    relatedResources: exerciseSheet.frontmatter.relatedResources,
    tags: exerciseSheet.frontmatter.tags,
    slug: exerciseSheet.slug,
  }))
}

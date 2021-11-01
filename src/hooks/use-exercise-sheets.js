import { graphql, useStaticQuery } from "gatsby"

export default function useExerciseSheets() {
  const data = useStaticQuery(graphql`
    query GetExerciseSheets {
      allFile(
        sort: { fields: childMdx___frontmatter___title }
        filter: { sourceInstanceName: { eq: "exerciseSheets" } }
      ) {
        nodes {
          childMdx {
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
    }
  `)

  console.log(data)

  return data.allFile.nodes.map(exerciseSheet => ({
    id: exerciseSheet.childMdx.id,
    title: exerciseSheet.childMdx.frontmatter.title,
    relatedResources: exerciseSheet.childMdx.frontmatter.relatedResources,
    tags: exerciseSheet.childMdx.frontmatter.tags,
    slug: exerciseSheet.childMdx.slug,
  }))
}

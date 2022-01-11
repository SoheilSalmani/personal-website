import { graphql, useStaticQuery } from "gatsby"

const useWebsites = () => {
  const data = useStaticQuery(graphql`
    query GetWebsites {
      allContentfulWebsite {
        nodes {
          id
          title
          link
          structure {
            path
            status
            progression {
              completion
              total
            }
          }
          localImage {
            publicURL
          }
        }
      }
    }
  `)
  return data.allContentfulWebsite.nodes.map(doc => ({
    id: doc.id,
    title: doc.title,
    link: doc.link,
    structure: doc.structure,
    image: doc.localImage.publicURL,
  }))
}

export default useWebsites

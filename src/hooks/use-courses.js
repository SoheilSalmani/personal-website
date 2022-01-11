import { graphql, useStaticQuery } from "gatsby"

const useCourses = () => {
  const data = useStaticQuery(graphql`
    query GetCourses {
      allContentfulCourse(
        sort: { fields: title, order: ASC }
        filter: { status: { in: ["READING", "FINISHED", "STOPPED"] } }
      ) {
        nodes {
          id
          title
          version
          authors
          publicationDate
          isVideo
          additionalResources {
            code
            website
          }
          status
          progression {
            total
            completion
          }
          source
          link
          localImage {
            childImageSharp {
              gatsbyImageData(width: 200, placeholder: DOMINANT_COLOR)
            }
          }
        }
      }
    }
  `)
  return data.allContentfulCourse.nodes.map(course => ({
    id: course.id,
    title: course.title,
    version: course.version,
    authors: course.authors,
    publicationDate: course.publicationDate,
    isVideo: course.isVideo,
    additionalResources: course.additionalResources,
    status: course.status,
    progression: course.progression,
    source: course.source,
    link: course.link,
    image: course.localImage,
  }))
}

export default useCourses

import { graphql, useStaticQuery } from "gatsby"

const useBooks = () => {
  const data = useStaticQuery(graphql`
    query GetBooks {
      allContentfulBook(
        sort: { fields: [publicationDate, title], order: [DESC, ASC] }
        filter: { status: { in: ["READING", "FINISHED"] } }
      ) {
        nodes {
          id
          title
          subtitle
          edition
          authors
          publicationDate(formatString: "MMMM YYYY")
          isbn
          isVideo
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
  return data.allContentfulBook.nodes.map(book => ({
    id: book.id,
    title: book.title,
    subtitle: book.subtitle,
    edition: book.edition,
    authors: book.authors,
    publicationDate: book.publicationDate,
    isbn: book.isbn,
    isVideo: book.isVideo,
    status: book.status,
    progression: book.progression,
    source: book.source,
    link: book.link,
    image: book.localImage,
  }))
}

export default useBooks

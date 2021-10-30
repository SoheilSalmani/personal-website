const path = require("path")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const fileNode = getNode(node.parent)
    if (fileNode.sourceInstanceName === "exercise-sheets") {
      createNodeField({
        node,
        name: `type`,
        value: `ExerciseSheet`,
      })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const allExerciseSheets = await graphql(`
    query {
      allMdx(filter: { fields: { type: { eq: "ExerciseSheet" } } }) {
        nodes {
          id
          slug
        }
      }
    }
  `)
  allExerciseSheets.data.allMdx.nodes.forEach(node => {
    createPage({
      path: path.join("/exercise-sheet/", node.slug),
      component: path.resolve(
        `${__dirname}/src/templates/exercise-sheet-template.js`
      ),
      context: {
        id: node.id,
      },
    })
  })
}

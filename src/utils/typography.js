import Typography from "typography"
import funstonTheme from "typography-theme-funston"

funstonTheme.overrideThemeStyles = ({ scale, rhythm }, options) => ({
  "h1,h2,h3,h4,h5,h6,ul,p": {
    marginBottom: rhythm(1 / 4),
  },
  li: {
    marginBottom: rhythm(0 / 4),
  },
  section: {
    marginBottom: rhythm(3 / 4),
  },
})
const typography = new Typography(funstonTheme)

export const { scale, rhythm, options } = typography
export default typography

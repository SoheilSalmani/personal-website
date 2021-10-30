import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import useExerciseSheets from "../hooks/use-exercise-sheets"

export default function ExercisesPage() {
  const exerciseSheets = useExerciseSheets()

  return (
    <Layout>
      <h1>Exercises</h1>
      <ul>
        {exerciseSheets.map(exerciseSheet => (
          <li key={exerciseSheet.id}>
            <Link to={`/exercise-sheet/${exerciseSheet.slug}`}>
              {exerciseSheet.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

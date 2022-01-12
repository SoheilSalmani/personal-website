import React from "react"
import Layout from "../components/layout"
import useBooks from "../hooks/use-books"
import useCourses from "../hooks/use-courses"
import useWebsites from "../hooks/use-websites"
import BookList from "../components/book-list"
import CourseList from "../components/course-list"
import WebsiteList from "../components/website-list"

export default function ResourcesPage() {
  const books = useBooks()
  const websites = useWebsites()
  const courses = useCourses()
  return (
    <Layout>
      <h1>Resources</h1>
      <section>
        <h2>Books</h2>
        <BookList books={books} />
      </section>
      <section>
        <h2>Courses</h2>
        <CourseList courses={courses} />
      </section>
      <section>
        <h2>Websites</h2>
        <WebsiteList websites={websites} />
      </section>
    </Layout>
  )
}

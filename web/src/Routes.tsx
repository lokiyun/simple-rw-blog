// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router'
import { AnimatePresence } from 'framer-motion'
import AdminLayout from './layouts/AdminLayout/AdminLayout'
import ArticleWritePage from './pages/ArticleWritePage/ArticleWritePage'

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3,
}

export const pageVariants = {
  pageInit: {
    opacity: 0,
  },
  pageIn: {
    opacity: 1,
  },
  pageOut: {
    opacity: 0,
  },
}

const Routes = () => {
  return (
    <AnimatePresence>
      <Router>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/" page={HomePage} name="home" />

        <Private unauthenticated="home">
          <Set wrap={AdminLayout} key={location.pathname}>
            <Route path="/admin/user" page={UserPage} name="user" />
            <Route path="/admin/category" page={CategoryPage} name="category" />
            <Route path="/admin/tag" page={TagPage} name="tag" />
            <Route path="/admin/image" page={ImagePage} name="image" />
            <Route path="/admin/post" page={PostPage} name="post" />
            <Route path="/admin/article-write" page={ArticleWritePage} name="articleWrite" />
          </Set>
        </Private>
        <Route notfound page={NotFoundPage} />
      </Router>
    </AnimatePresence>
  )
}

export default Routes

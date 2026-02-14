import 'quill/dist/quill.snow.css'
import { Toaster } from "react-hot-toast"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/admin/Login.jsx"
import Signup from './components/Signup.jsx'
import { useAppContext } from "./context/AppContext.jsx"
import AddBlog from "./pages/admin/AddBlog.jsx"
import Comments from "./pages/admin/Comments.jsx"
import Dashboard from "./pages/admin/Dashboard.jsx"
import EventComments from './pages/admin/EventComments.jsx'
import Layout from "./pages/admin/Layout.jsx"
import ListBlog from "./pages/admin/ListBlog.jsx"
import ListEvents from "./pages/admin/ListEvents.jsx"
import PostForm from './pages/admin/PostForm.jsx'
import Blog from "./pages/blog.jsx"
import Blogs from './pages/Blogs.jsx'
import Event from "./pages/Event.jsx"
import Events from './pages/Events.jsx'

const App = () => {
  const { user } = useAppContext()   // 👈 single source of truth

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/event/:id" element={<Event />} />

        <Route path='/admin' element={user ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path='addBlog' element={<AddBlog />} />
          <Route path='addBlog/:id' element={<AddBlog />} />
          <Route path='blogs' element={<ListBlog />} />
          <Route path='comments' element={<Comments />} />
          <Route path='addEvent' element={<PostForm />} />
          <Route path='addEvent/:id' element={<PostForm />} />
          <Route path='events' element={<ListEvents />} />
          <Route path='event-comments' element={<EventComments />} />
        </Route>

        <Route
          path="/signUp"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  )
}

export default App

import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.defaults.withCredentials = true // 🔥 IMPORTANT

console.log("BASE URL:", axios.defaults.baseURL)

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [events, setEvents] = useState([])
    const [input, setInput] = useState("")

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blog/all')
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get("/api/event/all");
            data.success ? setEvents(data.events) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // 🔥 Restore session from cookie
    const getMe = async () => {
        try {
            const { data } = await axios.get("/api/auth/me");
            if (data.success) {
                ``
                setUser(data.user);
            }
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchBlogs();
        fetchEvents();
        getMe(); // 👈 restore login
    }, [])

    const value = {
        axios,
        navigate,
        user,
        setUser,
        blogs,
        events,
        input,
        setInput,
        fetchBlogs,
        fetchEvents,
        getMe
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)
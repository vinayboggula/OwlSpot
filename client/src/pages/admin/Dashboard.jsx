import { Check, FileText, MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { assets } from "../../assets/assets"
import BlogTableItem from "../../components/admin/BlogTableItem"
import EventsTableItem from "../../components/admin/EventsTableItem"
import { useAppContext } from "../../context/AppContext"


const Dashboard = () => {

    const [dashboardBlogData, setDashboardBlogData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const [dashboardEventData, setDashboardEventData] = useState({
        events: 0,
        comments: 0,
        drafts: 0,
        recentEvents: []
    })

    const { axios } = useAppContext()

    const fetchBlogDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/blog-dashboard')
            data.success ? setDashboardBlogData(data.dashboardBlogData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchEventDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/event-dashboard')
            data.success ? setDashboardEventData(data.dashboardEventData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogDashboard()
        fetchEventDashboard()
    }, [])


    return (
        <div className="flex-1 space-y-10 p-4 md:p-10 bg-blue-50/50 overflow-scroll scrollbar-hide">
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
                    <Check size={50} className="text-primary p-3 text-center font-bold text-xl bg-primary/10 rounded-xl" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashboardBlogData.blogs}</p>
                        <p className="text-gray-400 font-light">Blogs</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
                    <MessageSquare size={50} className="text-primary p-3 text-center font-bold text-xl bg-primary/10 rounded-xl" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashboardBlogData.comments}</p>
                        <p className="text-gray-400 font-light">Comments</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
                    <FileText size={50} className="text-primary p-3 text-center font-bold text-xl bg-primary/10 rounded-xl" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashboardBlogData.drafts}</p>
                        <p className="text-gray-400 font-light">Drafts</p>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
                    <img src={assets.dashboard_icon_4} alt="" />
                    <p>Least Blogs</p>
                </div>
                <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
                    <table className="w-full text-sm text-gray-500">
                        <thead className="text-xs text-gray-600 text-lfet uppercase">
                            <tr>
                                <th scope="col" className="px-2 py-4 xl:px-6">#</th>
                                <th scope="col" className="px-2 py-4">Blog Title</th>
                                <th scope="col" className="px-2 py-4 max-sm:hidden" >Date</th>
                                <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
                                <th scope="col" className="px-2 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardBlogData && dashboardBlogData.recentBlogs.map((blog, index) => {
                                return <BlogTableItem key={blog._id} blog={blog}
                                    fetchBlogs={fetchBlogDashboard} index={index + 1} />
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
                    <Check size={50} className="text-amber-600 p-3 text-center font-bold text-xl bg-amber-600/10 rounded-xl" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashboardEventData.events}</p>
                        <p className="text-gray-400 font-light">Events</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
                    <MessageSquare size={50} className="text-amber-600 p-3 text-center font-bold text-xl bg-amber-600/10 rounded-xl" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashboardEventData.comments}</p>
                        <p className="text-gray-400 font-light">Comments</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
                    <FileText size={50} className="text-amber-600 p-3 text-center font-bold text-xl bg-amber-600/10 rounded-xl" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashboardEventData.drafts}</p>
                        <p className="text-gray-400 font-light">Drafts</p>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
                    <img src={assets.dashboard_icon_4} alt="" />
                    <p>Least Events</p>
                </div>
                <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
                    <table className="w-full text-sm text-gray-500">
                        <thead className="text-xs text-gray-600 text-lfet uppercase">
                            <tr>
                                <th scope="col" className="px-2 py-4 xl:px-6">#</th>
                                <th scope="col" className="px-2 py-4">Event Title</th>
                                <th scope="col" className="px-2 py-4 max-sm:hidden" >Date</th>
                                <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
                                <th scope="col" className="px-2 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardEventData && dashboardEventData.recentEvents.map((event, index) => {
                                return <EventsTableItem key={event._id} event={event}
                                    fetchEvents={fetchEventDashboard} index={index + 1} />
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default Dashboard

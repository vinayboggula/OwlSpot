import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import EventCommentTable from "../../components/admin/EventCommentTable"
import { useAppContext } from "../../context/AppContext"

const EventComments = () => {
    const [comments, setComments] = useState([])

    const { axios } = useAppContext()

    const fetchComments = async () => {
        try {
            const { data } = await axios.get('/api/admin/eventComments')
            data.success ? setComments(data.comments) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])
    return (
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
            <div className="flex justify-between items-center max-w-3xl">
                <h1>Comments</h1>

            </div>
            <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-gray-700 text-left uppercase">
                        <tr>
                            <th scope='col' className="px-6 py-3">EVENT TITLE & COMMENT</th>
                            <th scope='col' className="px-6 py-3 max-sm:hidden">DATE</th>
                            <th scope='col' className="px-6 py-3">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment, index) => <EventCommentTable key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />)}
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default EventComments

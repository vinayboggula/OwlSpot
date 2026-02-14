import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const EventCommentTable = ({ comment, fetchComments }) => {

    const { event, createdAt, _id } = comment;
    const EventDate = new Date(createdAt)
    const { axios } = useAppContext()

    const deleteComment = async () => {
        try {
            const confirm = window.confirm('are you sure you want to delete this');
            if (!confirm) return;
            const { data } = await axios.delete('/api/admin/delete-eventcomment', { id: _id })
            if (data.success) {
                toast.success(data.message)
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <tr className="border-y border-gray-300">
            <td className="px-6 py-4">
                <b className="font-medium text-gray-600">Event</b>: {event.title}
                <br />
                <br />
                <b className="font-medium text-gray-600">Name</b>: {comment.name}
                <br />
                <b className="font-medium text-gray-600">Comment</b>: {comment.content}
            </td>
            <td className="px-6 py-4 max-sm:hidden">
                {EventDate.toLocaleDateString()}
            </td>
            <td className="px-8 py-4">
                <img onClick={() => deleteComment()} src={assets.bin_icon} alt="" className="w-5 hover:scale-110 transition-all cursor-pointer" />

            </td>
        </tr>
    )
}

export default EventCommentTable

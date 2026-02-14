import { Edit } from "lucide-react";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const EventsTableItem = ({ event, fetchEvents, index }) => {
    const { title, createdAt } = event;
    const EventDate = new Date(createdAt)

    const { axios, navigate } = useAppContext()

    const deleteEvent = async () => {
        const confirm = window.confirm('Are you sure you want to delete this event?')
        if (!confirm) return;
        try {
            const { data } = await axios.post('/api/admin/delete-event', { id: event._id })
            if (data.success) {
                toast.success(data.message)
                await fetchEvents()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const togglePublish = async () => {
        try {
            const { data } = await axios.post('/api/admin/toggle-event', { id: event._id })
            if (data.success) {
                toast.success(data.message)
                await fetchEvents()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleEdit = () => {
        const confirm = window.confirm('Are you sure you want to edit this blog?')
        if (!confirm) return;
        navigate(`/admin/addEvent/${event._id}`)
    }


    return (
        <tr className='border-y border-gray-300 text-center'>
            <td className="px-2 py-4">{index}</td>
            <td className="px-2 py-4">{title}</td>
            <td className="px-2 py-4 max-sm:hidden">{EventDate.toDateString()}</td>
            <td className="px-2 py-4 max-sm:hidden">
                <p className={`${event.isPublished ? "text-green-600" : "text-orange-700"}`}>{event.isPublished ? "Published" : "Unpublished"}</p>
            </td>
            <td className="px-2 py-4 flex justify-center items-center text-xs gap-3">
                <button onClick={togglePublish} className="border px-2 py-0.5 mt-1 rounded cursor-pointer ">
                    {event.isPublished ? "Unpublish" : "Publish"}
                </button>
                {event.isPublished ? <img onClick={deleteEvent} src={assets.cross_icon} alt="" className="w-8 hover:scale-110 transition-all cursor-pointer" /> :
                    <div className="flex items-center gap-1">
                        <Edit onClick={() => handleEdit()} size={20} className="w-8 h-8 bg-green-500/10 text-green-400 px-2 hover:scale-110 py-2.5 cursor-pointer rounded-full" />
                        <img onClick={deleteEvent} src={assets.cross_icon} alt="" className="w-8 hover:scale-110 transition-all cursor-pointer" />
                    </div>}
            </td>

        </tr>
    )
}

export default EventsTableItem

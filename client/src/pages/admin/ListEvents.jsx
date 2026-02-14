import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import EventsTableItem from "../../components/admin/EventsTableItem"
import { useAppContext } from "../../context/AppContext"

const ListEvents = () => {

    const [events, setEvents] = useState([])
    const { axios } = useAppContext()

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get('/api/admin/events')
            if (data.success) {
                setEvents(data.events)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
            <h1>All Events</h1>
            <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-gray-600 text-center uppercase">
                        <tr>
                            <th scope="col" className="px-2 py-4 xl:px-6">#</th>
                            <th scope="col" className="px-2 py-4">Event Title</th>
                            <th scope="col" className="px-2 py-4 max-sm:hidden" >Date</th>
                            <th scope="col" className="px-2 py-4 max-sm:hidden">Status</th>
                            <th scope="col" className="px-2 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => {
                            return <EventsTableItem key={event._id} event={event}
                                fetchEvents={fetchEvents} index={index + 1} />
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ListEvents

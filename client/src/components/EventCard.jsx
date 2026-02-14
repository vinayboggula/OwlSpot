import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
    const { title, category, creator, imageUrl, _id } = event;
    const navigate = useNavigate();
    // const [isHovered, setIsHovered] = useState(false);

    // const firstVideo = videoUrls && videoUrls.length > 0 ? videoUrls[0] : null;
    return (
        <div
            onClick={() => navigate(`/event/${_id}`)}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
            className="group relative w-70 md:w-80 lg:w-75 xl:w-70 2xl:w-80 overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer "
        >
            {/* Thumbnail / Video */}
            {/* <div className="relative aspect-video overflow-hidden">
                {!isHovered || !firstVideo ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <video
                        src={firstVideo}
                        autoPlay

                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                )} */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />


            <div className="py-4 px-4 space-y-1">
                <h5 className="font-semibold text-mb text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap ">{title}</h5>

                <div className="flex items-center relative group-hover:bg-amber-600/20 w-100 px-2 py-2 rounded-2xl">
                    <div className="flex items-center gap-2">
                        <UserCircle size={18} className="text-amber-600" />
                        <p className="text-xs text-gray-600">{creator?.name || "Unknown Author"}</p>
                    </div>
                    <div className="absolute transition-all right-0 px-2 py-1 inline-block opacity-0 group-hover:opacity-100 duration-300 group-hover:right-30 bg-amber-600/20 rounded-full text-amber-600 text-xs"> {category}</div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;

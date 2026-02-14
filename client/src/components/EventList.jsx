import { motion } from "framer-motion";
import { useState } from "react";
import { eventCategories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import EventCard from "./EventCard";

const EventList = () => {
    const [menu, setMenu] = useState("All");
    const { events, input } = useAppContext();
    const [hovered, setHovered] = useState(null);

    const filteredEvents = () => {
        if (!input) return events;
        return events.filter(
            (event) =>
                event.title.toLowerCase().includes(input.toLowerCase()) ||
                event.category.toLowerCase().includes(input.toLowerCase())
        );
    };

    return (
        <div>
            <div className="menu-list flex justify-center gap-4 sm:gap-8 my-10 relative">
                {eventCategories.map((item, index) => (
                    <div
                        key={index}
                        className="relative"
                        onMouseEnter={() => setHovered(item.name)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <button
                            onClick={() => setMenu(item.name)}
                            className={`cursor-pointer text-gray-500 ${menu === item.name && "text-white px-4 pt-0.5"
                                }`}
                        >
                            {item.name}

                            {menu === item.name && (
                                <motion.div
                                    layoutId="underline"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="absolute left-0 right-0 top-0 h-7 -z-10 bg-primary rounded-full"
                                />
                            )}
                        </button>

                        {hovered === item.name && (
                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1
             bg-white text-black text-[10px]
             px-1 py-0.5 rounded-lg 
             min-w-[120px]
             shadow-lg z-50"
                            >
                                {item.description}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-10 mb-24 mx-10 sm:mx-10 xl:mx-25">
                {filteredEvents()
                    .filter((event) =>
                        menu === "All"
                            ? true
                            : event.category.toLowerCase() === menu.toLowerCase()
                    )
                    .map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
            </div>
        </div >
    );
};

export default EventList;

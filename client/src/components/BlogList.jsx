import { motion } from "framer-motion";
import { useState } from "react";
import { blogCategories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import BlogCard from "./BlogCard";

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const { blogs, input } = useAppContext();
    const [hovered, setHovered] = useState(null);

    const filteredBlogs = () => {
        if (input === "") {
            return blogs;
        }
        return blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(input.toLowerCase()) ||
                blog.category.toLowerCase().includes(input.toLowerCase())
        );
    };
    return (
        <div>
            <div className="menu-list flex justify-center gap-4 sm:gap-8 my-10 relative">
                {blogCategories.map((item, index) => (
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
             min-w-[60px]
             shadow-lg z-50"
                            >
                                {item.description}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-10 mb-24 mx-10 sm:mx-10 xl:mx-25">
                {filteredBlogs()
                    .filter((blog) =>
                        menu === "All" ? true : blog.category === menu
                    )
                    .map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
            </div>
        </div>
    );
};

export default BlogList;

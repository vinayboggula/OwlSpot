import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
    const { title, category, creator, image, _id } = blog;
    const navigate = useNavigate()



    return (
        <div onClick={() => navigate(`/blog/${_id}`)} className="group relative w-70 md:w-80 lg:w-75 xl:w-70 2xl:w-80 overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer ">
            <img src={image} alt="" className="w-full h-48 object-cover group-hover:scale-105  transition-transform duration-500" />
            <div className="py-4 px-4 space-y-1">
                <h5 className="font-semibold text-mb text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap ">{title}</h5>

                <div className="flex items-center relative group-hover:bg-primary/20 w-100 px-2 py-2 rounded-2xl">
                    <div className="flex items-center gap-2">
                        <UserCircle size={18} className="text-primary" />
                        <p className="text-xs text-gray-600">{creator?.name || "Unknown Author"}</p>
                    </div>
                    <div className="absolute transition-all right-0 px-2 py-1 inline-block opacity-0 group-hover:opacity-100 duration-300 group-hover:right-30 bg-primary/20 rounded-full text-primary text-xs"> {category}</div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard

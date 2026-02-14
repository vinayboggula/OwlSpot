import { Edit } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
    const { title, createdAt } = blog;
    const navigate = useNavigate()
    const BlogDate = new Date(createdAt)

    const { axios } = useAppContext()

    const deleteBlog = async () => {
        const confirm = window.confirm('Are you sure you want to delete this blog?')
        if (!confirm) return;
        try {
            const { data } = await axios.post('/api/admin/delete-blog', { id: blog._id })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const togglePublish = async () => {
        try {
            const { data } = await axios.post('/api/admin/toggle-blog', { id: blog._id })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs()
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
        navigate(`/admin/addBlog/${blog._id}`)
    }

    return (
        <tr className='border-y border-gray-300 text-center'>
            <td className="px-2 py-4">{index}</td>
            <td className="px-2 py-4">{title}</td>
            <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
            <td className="px-2 py-4 max-sm:hidden">
                <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>{blog.isPublished ? "Published" : "Unpublished"}</p>
            </td>
            <td className="px-2 py-4 flex flex-col md:flex-row justify-center items-center text-xs gap-3">
                <button onClick={togglePublish} className="border px-2 py-0.5 mt-1 rounded cursor-pointer ">
                    {blog.isPublished ? "Unpublish" : "Publish"}
                </button>
                {blog.isPublished ? <img onClick={deleteBlog} src={assets.cross_icon} alt="" className="w-8 hover:scale-110 transition-all cursor-pointer" /> :
                    <div className="flex items-center gap-1">
                        <Edit onClick={() => handleEdit()} size={20} className="w-8 h-8 bg-green-500/10 text-green-400 px-2 hover:scale-110 py-2.5 cursor-pointer rounded-full" />
                        <img onClick={deleteBlog} src={assets.cross_icon} alt="" className="w-8 hover:scale-110 transition-all cursor-pointer" />
                    </div>}
            </td>

        </tr>
    )
}

export default BlogTableItem

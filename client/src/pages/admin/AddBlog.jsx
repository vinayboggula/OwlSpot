import { parse } from 'marked'
import Quill from "quill"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from 'react-router-dom'
import { assets, blogCategories } from "../../assets/assets"
import { useAppContext } from "../../context/AppContext"


const AddBlog = () => {
    const { axios } = useAppContext()
    const [isAdding, setIsAdding] = useState(false)
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    const editMode = Boolean(id)


    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const [image, setImage] = useState(null)
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [category, setCategory] = useState('Startup')
    const [isPublished, setisPublished] = useState(false)



    const generateContent = async () => {
        if (!title) return toast.error('please enter a  title')
        try {
            setLoading(true)
            const { data } = await axios.post('/api/blog/generate', { prompt: title })
            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.content)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const updateBlog = async (e) => {

        try {
            e.preventDefault()
            setIsAdding(true)

            const blog = {
                title, subTitle,
                description: quillRef.current.root.innerHTML,
                category, isPublished
            }

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog))
            formData.append('image', image)

            const { data } = await axios.post(`/api/blog/update-blog/${id}`, formData)
            if (data.success) {
                toast.success(data.message)
                setImage(false)
                setTitle("")
                setSubTitle("")
                quillRef.current.root.innerHTML = ''
                setCategory('Startup')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsAdding(false)
        }
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            setIsAdding(true)

            const blog = {
                title, subTitle,
                description: quillRef.current.root.innerHTML,
                category, isPublished
            }

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog))

            if (image) {
                formData.append("image", image);
            }

            const { data } = await axios.post('/api/blog/add', formData)
            if (data.success) {
                toast.success(data.message)
                setImage(false)
                setTitle("")
                setSubTitle("")
                quillRef.current.root.innerHTML = ''
                setCategory('Startup')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsAdding(false)
        }

    }

    const fetchBlog = async (id) => {
        try {
            const { data } = await axios.get(`/api/blog/${id}`)
            if (data.success) {

                setImage(data.blog.image)
                setTitle(data.blog.title)
                setSubTitle(data.blog.subTitle)
                quillRef.current.root.innerHTML = data.blog.description
            } else {
                toast.error(data.blog.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
        if (editMode) {
            fetchBlog(id);
        }
    }, [id])


    return (

        <form onSubmit={editMode ? updateBlog : onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
            <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">

                <p>Upload thumbnail</p>
                <label htmlFor="image">
                    <img className="mt-2 h-16 rounded cursor-pointer" src={
                        image
                            ? typeof image === "string"
                                ? image
                                : URL.createObjectURL(image)
                            : assets.upload_area
                    } alt="" />
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </label>
                <p>Blog title</p>
                <input type="text" value={title} placeholder="Type here" required className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded" onChange={e => setTitle(e.target.value)} />

                <p>Sub title</p>
                <input type="text" value={subTitle} placeholder="Type here" required className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded" onChange={e => setSubTitle(e.target.value)} />

                <p>Blog Description</p>
                <div placeholder="Type here" required className="max-w-lg h-74 pb-14 sm:pb-10 pt-2 relative">
                    <div ref={editorRef}></div>
                    <button className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer " type='button' disabled={loading} onClick={generateContent}>Generate with AI</button>
                </div>

                <p className="mt-4">Blog category</p>
                <select onChange={e => setCategory(e.target.value)} name="category" className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded">
                    <option value="">select category</option>
                    {blogCategories.map((item, index) => {
                        return <option key={index} value={item.name}>{item.name}</option>
                    })}
                </select>

                <div className="flex gap-2 mt-2">
                    <p>Publish Now</p>
                    <input type="checkbox" checked={isPublished} className="scale-125 cursor-pointer" onChange={e => setisPublished(e.target.checked)} />
                </div>

                <button
                    disabled={isAdding}
                    className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
                    type="submit"
                >
                    {editMode
                        ? (isAdding ? "Updating..." : "Update Event")
                        : (isAdding ? "Adding..." : "Add Event")}
                </button>
            </div>
        </form>
    )
}

export default AddBlog

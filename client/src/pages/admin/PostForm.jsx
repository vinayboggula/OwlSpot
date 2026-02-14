import Quill from "quill"
import { useEffect, useRef, useState } from 'react'
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { assets, eventCategories } from '../../assets/assets'
import { useAppContext } from "../../context/AppContext"


const PostForm = () => {
    const { axios } = useAppContext()
    const [isAdding, setIsAdding] = useState(false)

    const editorRef = useRef(null)
    const quillRef = useRef(null)
    const [aiPrompt, setAiPrompt] = useState("");
    const [aiImage, setAiImage] = useState(null);
    const [aiPreview, setAiPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    const { id } = useParams()
    const editMode = Boolean(id)
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [image, setImage] = useState(null)
    const [videos, setVideos] = useState([])
    const [category, setCategory] = useState('Startup')
    const [isPublished, setIsPublished] = useState(false)


    const handleAiImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setAiImage(file);
        setAiPreview(URL.createObjectURL(file));
    };

    const removeAiImage = () => {
        if (aiPreview) URL.revokeObjectURL(aiPreview);
        setAiImage(null);
        setAiPreview(null);
    };

    const generateThumbnail = async () => {
        if (!aiPrompt || !title) {
            toast.error("Enter event title and prompt");
            return;
        }

        if (!aiImage) {
            toast.error("Upload a base image");
            return;
        }

        try {
            setIsGenerating(true);

            const formData = new FormData();
            formData.append("image", aiImage);   // 🔥 must be `file`
            formData.append("text", title);     // 🔥 required by backend
            formData.append("prompt", aiPrompt);

            const { data } = await axios.post(
                "/api/event/generate-thumbnail",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );

            if (data.success) {
                setGeneratedImageUrl(data.thumbnailUrl); // ✅ set event image
                setImage(data.thumbnailUrl)
                toast.success("Thumbnail generated successfully");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Generation failed");
        } finally {
            setIsGenerating(false);
        }
    };



    const handleVideoChange = (e) => {
        const files = Array.from(e.target.files);

        const newVideoItems = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }))

        const totalVideos = videos.length + newVideoItems.length;


        if (totalVideos > 5) {
            toast.error("You can upload a maximum of 5 videos only");
            e.target.value = "";
            return;
        }

        setVideos(prev => [...prev, ...newVideoItems]);

        e.target.value = "";
    };

    const removeVideo = (index) => {
        setVideos((prev) => {
            // clean preview URL to avoid memory leak
            URL.revokeObjectURL(prev[index].preview);

            return prev.filter((_, i) => i !== index);
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        // handle form submission logic here
        if (!quillRef.current) return;

        // const text = quillRef.current.root.innerHTML;
        const description = quillRef.current.root.innerHTML.trim();

        if (
            !title ||
            !description ||
            !date ||
            (!image && !generatedImageUrl && !editMode) ||
            videos.length === 0 ||
            !category
        ) {

            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setIsAdding(true);

            const event = {
                title,
                description, date,
                category, isPublished
            }

            const formData = new FormData();
            formData.append('event', JSON.stringify(event));
            if (image instanceof File) {
                formData.append('image', image); // manual upload
            } else {
                formData.append('imageUrl', generatedImageUrl); // AI image
            }
            videos.forEach((item) => {
                formData.append("videos", item.file);
            });

            const { data } = await axios.post('/api/event/add', formData)
            if (data.success) {
                toast.success(data.message);
                setTitle("");
                quillRef.current.root.innerHTML = "";
                setDate("");
                setImage(null);
                setVideos([]);
                setCategory('Startup');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("API ERROR:", error);
            toast.error(
                error.response?.data?.message ||
                "Server error. Please try again."
            );
        } finally {
            setIsAdding(false);
        }
    }

    const updateEvent = async (e) => {
        e.preventDefault()

        if (!quillRef.current) return;

        // const text = quillRef.current.root.innerHTML;
        const description = quillRef.current.root.innerHTML.trim();
        if (
            !title ||
            !description ||
            !date ||
            (!image && !generatedImageUrl && !editMode) ||
            videos.length === 0 ||
            !category
        ) {

            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setIsAdding(true);

            const event = {
                title,
                description, date,
                category, isPublished
            }

            const formData = new FormData();
            formData.append('event', JSON.stringify(event));
            if (image instanceof File) {
                formData.append('image', image); // manual upload
            } else {
                formData.append('imageUrl', generatedImageUrl); // AI image
            }
            videos.forEach((item) => {
                formData.append("videos", item.file);
            });

            const { data } = await axios.put(`/api/event/update-event/${id}`, formData)
            if (data.success) {
                toast.success(data.message);
                setTitle("");
                quillRef.current.root.innerHTML = "";
                setDate("");
                setImage(null);
                setVideos([]);
                setCategory('Startup');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("API ERROR:", error);
            toast.error(
                error.response?.data?.message ||
                "Server error. Please try again."
            );
        } finally {
            setIsAdding(false);
        }
    }

    const fetchEvent = async (id) => {
        try {
            const { data } = await axios.get(`/api/event/${id}`)
            if (data.success) {
                setTitle(data.event.title);
                quillRef.current.root.innerHTML = data.event.description;
                setDate(data.event.createdAt);
                setImage(data.event.imageUrl);
                setVideos(
                    data.event.videoUrls.map(url => ({
                        file: null,
                        preview: url
                    }))
                );

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("API ERROR:", error);
            toast.error(
                error.response?.data?.message ||
                "Server error. Please try again."
            );
        } finally {
            setIsAdding(false);
        }
    }

    useEffect(() => {
        if (!image || !(image instanceof File)) return;

        const url = URL.createObjectURL(image);
        setImagePreview(url);

        return () => URL.revokeObjectURL(url);
    }, [image]);


    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: "Write event description here...",
            })
        }
        if (editMode) {
            fetchEvent(id);
        }

    }, [])

    useEffect(() => {
        return () => {
            videos.forEach(v => {
                if (v.file) URL.revokeObjectURL(v.preview);
            });
        };
    }, []);


    return (
        <form onSubmit={editMode ? updateEvent : onSubmitHandler} className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll">
            <div className="bg-white flex flex-col w-full max-w-3xl space-y-4 p-4 md:p-10 sm:m-10 shadow rounded">
                <div>
                    <div className="mt-4">
                        <p className="font-semibold">Event title</p>
                        <input type="text" value={title} placeholder="Event title" required className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded" onChange={e => setTitle(e.target.value)} />
                    </div>

                    <p className="mt-4 font-semibold">Generate Event Thumbnail</p>
                    {/* AI Image Preview */}
                    {aiPreview && (
                        <div className="relative mt-2 w-fit">
                            <img
                                src={aiPreview}
                                className="h-28 rounded-xl border"
                                alt="preview"
                            />
                            <button
                                type="button"
                                onClick={removeAiImage}
                                className="absolute -top-2 -right-2 bg-black text-white rounded-full px-2"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* Prompt + controls */}
                    <div className="mt-4 flex items-end gap-2 max-w-lg">
                        <label className="cursor-pointer p-1 border rounded-lg">
                            <div className="text-2xl">📷</div>
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleAiImageChange}
                            />
                        </label>

                        <textarea
                            rows={1}
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="Describe the thumbnail you want..."
                            className="flex-1 resize-none p-2 border rounded outline-none"
                        />

                        <button
                            type="button"
                            disabled={isGenerating}
                            onClick={generateThumbnail}
                            className="bg-primary text-white px-4 py-2 rounded"
                        >
                            {isGenerating ? "Generating..." : "Generate"}
                        </button>
                    </div>

                    {/* Manual upload fallback */}
                    {/* Manual upload */}
                    <div className="mt-4 flex items-start gap-4">
                        {/* Upload button */}
                        <label htmlFor="image" className="cursor-pointer">
                            <img
                                className={`mt-2 h-18 rounded cursor-pointer ${videos.length >= 5 ? "opacity-80 cursor-not-allowed" : ""
                                    }`}
                                src={assets.upload_area}
                                alt="upload"
                            />
                            <input
                                onChange={(e) => {
                                    setGeneratedImageUrl(null);
                                    setAiPreview(null);
                                    setImage(e.target.files[0]);
                                }}
                                type="file"
                                accept="image/*"
                                id="image"
                                hidden
                            />
                        </label>

                        {/* Thumbnail preview */}
                        <div className="inline-block">
                            <img
                                className={image ? "mt-2 h-18 rounded cursor-pointer border-2 text-green-400" : "mt-2 h-18 rounded cursor-pointer border-2 text-red-600"}
                                src={
                                    generatedImageUrl
                                        ? generatedImageUrl
                                        : imagePreview
                                            ? imagePreview
                                            : image || assets.preview
                                }
                                alt=""
                                onDoubleClick={() => {
                                    if (generatedImageUrl || image) {
                                        setShowPreview(true);
                                    }
                                }}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Double-click to preview
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-1">
                    <p className="font-semibold">
                        Event videos{" "}
                        <span className="text-xs text-gray-500">(Max 5 videos, ≤ 20MB each)</span>
                    </p>

                    <label htmlFor="videos">
                        <img
                            className={`mt-2 h-16 rounded cursor-pointer ${videos.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            src={assets.upload_area}
                            alt="upload"
                        />
                        <input
                            type="file"
                            accept="video/*"
                            id="videos"
                            hidden
                            multiple
                            onChange={handleVideoChange}
                            disabled={videos.length >= 5}
                        />
                    </label>

                    <p className="text-xs text-gray-500 mt-1">
                        {videos.length} / 5 videos uploaded
                    </p>


                    {/* Video previews */}
                    {videos.length > 0 && (
                        <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                            {videos.map((item, index) => (
                                <div
                                    key={item.preview}
                                    className="min-w-[200px] flex-shrink-0 relative"
                                >
                                    <video
                                        src={item.preview}
                                        controls
                                        className="w-full h-28 rounded object-cover"
                                    />

                                    {/* Remove button */}
                                    <button
                                        type="button"
                                        onClick={() => removeVideo(index)}
                                        className="absolute top-1 font-bold right-1 bg-white text-black text-xs px-1.5 py-0.5 rounded-full"
                                    >
                                        ✕
                                    </button>

                                    <p className="text-xs text-gray-500 truncate mt-1">
                                        {item.file
                                            ? item.file.name.replace(/\.[^/.]+$/, "").trim()
                                            : item.preview.split("/").pop()
                                        }

                                    </p>
                                </div>
                            ))}
                        </div>
                    )
                    }
                </div>
                <div>
                    <p className="font-semibold">Event Description</p>
                    <div placeholder="Write event description here..." required className="max-w-lg h-74 pb-6 sm:pb-4 pt-2 relative">
                        <div ref={editorRef}></div>
                    </div>
                </div>

                <div className="mt-8">
                    <p className="font-semibold">Event category</p>
                    <select onChange={e => setCategory(e.target.value)} name="category" className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded">
                        <option value="">select category</option>
                        {eventCategories.map((item, index) => {
                            return <option key={index} value={item.name}>{item.name}</option>
                        })}
                    </select>
                </div>

                <div >
                    <p className="font-semibold">Event date</p>
                    <input
                        className="mt-2 border border-gray-300"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <span className="font-semibold">
                            Publish Now
                        </span>
                        <input
                            type="checkbox"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            className="scale-125 cursor-pointer accent-green-600"
                        />
                    </label>
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
            {showPreview && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center"
                    onClick={() => setShowPreview(false)}
                >
                    <div
                        className="relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute -top-3 -right-3 bg-white text-black rounded-full w-8 h-8 font-bold shadow"
                            onClick={() => setShowPreview(false)}
                        >
                            ✕
                        </button>

                        <img
                            src={generatedImageUrl || URL.createObjectURL(image)}
                            alt="Preview"
                            className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl bg-white object-contain"
                        />
                    </div>
                </div>
            )}

        </form>
    )
}

export default PostForm

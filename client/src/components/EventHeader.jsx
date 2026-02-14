import { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const EventHeader = () => {
    const { setInput, input, user, navigate } = useAppContext()
    const inputRef = useRef()
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setInput(inputRef.current.value)
    }
    const onClear = async () => {
        setInput('')
        inputRef.current.value = ''
    }

    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
            <div className="text-center mt-5 mb-8">
                <div onClick={() => user ? navigate(`/admin/addEvent`) : navigate(`/login`)} className=" inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4
                border border-amber-600 bg-amber-100 rounded-full text-sm">
                    <p>New: AI feature integrated</p>
                    <img src={assets.sun} alt="" className="w-3.5" />
                </div>

                <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
                    Your <span className="text-amber-600">Memories</span>, <br />
                    clearly documented
                </h1>

                <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500">The Memories section is a timeline of documented events — moments,
                    experiences, and milestones preserved with clarity and context.</p>

                <form onSubmit={onSubmitHandler} className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
                    <input ref={inputRef} className="w-full pl-4 outline-none" type="text" placeholder="Search for events or memories" required />
                    <button className="bg-amber-600 text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer" type="submit">Search</button>
                </form>
            </div>
            <div className="text-center">
                {input && <button onClick={onClear} className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom cursor-pointer">Clear Search</button>}
            </div>
            <img src={assets.gradientBackground} alt="" className="absolute -top-50 -z-1 opacity-50 " />
        </div>
    )
}


export default EventHeader

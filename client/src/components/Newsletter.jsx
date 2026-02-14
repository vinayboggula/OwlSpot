import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

const Newsletter = () => {
    const navigate = useNavigate()
    const { user } = useAppContext()

    return (
        <>
            {user ? null : <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
                <h1 className="md:text-4xl text-2xl font-semibold">Never miss a Blog!</h1>
                <p className="md:text-lg text-gray-500/70 pb-8">Sign Up to get the latest blog, new tech, and exclusive news</p>

                <form className="flex items-center justify-center max-w-2xl w-full md:h-13 h-12">
                    <button onClick={() => navigate(`/signup`)} type="submit" className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-l-none">Sign Up</button>
                </form>
            </div>
            }
        </>
    )
}

export default Newsletter

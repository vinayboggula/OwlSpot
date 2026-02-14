import { useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
    const { navigate, user } = useAppContext()
    const location = useLocation()

    const isEvents = location.pathname === '/events'
    const isBlogs = location.pathname === '/'

    return (
        <div className="flex justify-between items-center py-8 mx-2 sm:mx-18 xl:mx-32">
            {/* logo */}
            <div
                onClick={() => navigate('/')}
                className="logo flex items-center cursor-pointer"
            >
                <img src="/owl.svg" alt="logo" className="w-8 h-8" />
                <h2 className="font-bold text-2xl hidden sm:block">OwlSpot</h2>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-1 font-bold text-lg bg-orange-100 p-1 rounded-full md-block">
                <button
                    onClick={() => navigate('/events')}
                    className={`px-2 lg:px-4 py-1 rounded-full transition-all duration-300
            ${isEvents ? 'bg-amber-600 text-white shadow-md' : 'text-gray-700'}
          `}
                >
                    Events
                </button>

                <button
                    onClick={() => navigate('/')}
                    className={`px-2 lg:px-4 py-1 rounded-full transition-all duration-300
            ${isBlogs ? 'bg-primary text-white shadow-md' : 'text-gray-700'}
          `}
                >
                    Blogs
                </button>
            </div>

            {/* Auth Button */}
            <button
                onClick={() => navigate(user ? '/admin' : '/login')}
                className="flex items-center gap-1 rounded-full text-sm bg-stone-400 text-black font-bold px-10 py-2.5"
            >
                {user ? 'Dashboard' : 'Login'}
                <img src={assets.arrow} alt="arrow" className="w-3 invert" />
            </button>
        </div>
    )
}

export default Navbar

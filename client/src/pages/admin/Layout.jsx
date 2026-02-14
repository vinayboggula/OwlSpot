import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
    const { axios, navigate, setUser } = useAppContext()

    const location = useLocation()

    const isEvents = location.pathname === '/events'
    const isBlogs = location.pathname === '/'

    const logout = async () => {
        await axios.post("/api/auth/logout");
        setUser(null);
        navigate('/');
    }

    return (
        <>
            <div className='flex justify-between items-center py-8 mx-2 sm:mx-18 xl:mx-32'>
                <div
                    onClick={() => navigate('/')}
                    className="logo flex justify-center items-center cursor-pointer"
                >
                    <img src="/owl.svg" alt="logo" className="w-8 h-8" />
                    <h2 className='font-bold text-2xl'>OwlSpot</h2>
                </div>
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

                <button
                    onClick={logout}
                    className="flex items-center gap-1 rounded-full text-sm cursor-pointer bg-stone-400 text-black font-bold px-10 py-2.5"
                >
                    Logout
                </button>
            </div>
            <div className="flex h-[calc(100vh-70px)]">
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout

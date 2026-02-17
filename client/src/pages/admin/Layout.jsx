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

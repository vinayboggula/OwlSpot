import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
    return (
        <div className='flex flex-col border-r border-grey-200 min-h-full pt-6'>
            <NavLink end={true} to='/admin' className={({ isActive }) => `flex center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-stone-600/20 border-r-4 border-stone-600"}`}>
                <img src={assets.home_icon} alt="" className='min-w-4 w-5' />
                <p className='hidden md:inline-block'>Dashboard</p>
            </NavLink>

            <NavLink to='/admin/addBlog' className={({ isActive }) => `flex center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/20 border-r-4 border-primary"}`}>
                <img src={assets.add_icon} alt="" className='min-w-4 w-5' />
                <p className='hidden md:inline-block'>Add Blogs</p>
            </NavLink>

            <NavLink to='/admin/blogs' className={({ isActive }) => `flex center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/20 border-r-4 border-primary"}`}>
                <img src={assets.blog_icon} alt="" className='min-w-4 w-5' />
                <p className='hidden md:inline-block'>Blogs</p>
            </NavLink>

            <NavLink to='/admin/comments' className={({ isActive }) => `flex center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/20 border-r-4 border-primary"}`}>
                <img src={assets.comment_icon} alt="" className='min-w-4 w-5' />
                <p className='hidden md:inline-block'>Blog Comments</p>
            </NavLink>

            <NavLink to='/admin/addEvent' className={({ isActive }) => `flex center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-amber-600/20 border-r-4 border-amber-600"}`}>
                <img src={assets.events} alt="" className='min-w-4 w-5' />
                <p className='hidden md:inline-block'>Add Events</p>
            </NavLink>
            <NavLink to='/admin/Events' className={({ isActive }) => `flex center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-amber-600/20 border-r-4 border-amber-600"}`}>
                <img src={assets.blog_icon} alt="" className='min-w-4 w-5' />
                <p className='hidden md:inline-block'>Events</p>
            </NavLink>
            <NavLink to='/admin/Event-comments' className={({ isActive }) => `flex center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-amber-600/20 border-r-4 border-amber-600"}`}>
                <img src={assets.comment_icon} alt="" className='min-w-4 w-5' />
                <p className='hidden md:inline-block'>Event Comments</p>
            </NavLink>

        </div>
    )
}

export default Sidebar

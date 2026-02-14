import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Signup = () => {
    const { axios, navigate, setUser } = useAppContext();

    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "/api/auth/signup",
                {
                    name: userName,
                    email,
                    password
                },
                { withCredentials: true }
            );

            if (data.success) {
                toast.success("Account created");
                setUser(data.user);
                navigate("/admin");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error.response);
            toast.error(
                error.response?.data?.message || error.message
            );
        }

    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-full max-w-sm p-6 border shadow-xl rounded-lg'>
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Create Your Account
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="w-full text-gray-600">

                    <label>User Name</label>
                    <input
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        className="border-b-2 w-full p-2 mb-4"
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="border-b-2 w-full p-2 mb-4"
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="border-b-2 w-full p-2 mb-6"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white rounded"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center mt-4">
                    Already have an account?
                    <NavLink className="text-blue-500 ml-1" to="/login">
                        Sign in
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Signup;

import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Login = () => {
    const { axios, navigate, getMe } = useAppContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Normal Login
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axios.post(
                "/api/auth/login",
                { email, password },
                { withCredentials: true }
            );

            if (data.success) {
                await getMe();
                toast.success("Logged in!");
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    // ✅ Google Login
    const handleGoogleLogin = async (res) => {
        try {
            setLoading(true);

            await axios.post(
                "/api/auth/google",
                { token: res.credential },
                { withCredentials: true }
            );

            await getMe();
            toast.success("Logged in!");
            navigate("/");

        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">

                <div className="flex flex-col items-center">

                    <div className="w-full py-6 text-center">
                        <h1 className="text-3xl font-bold">
                            <span className="text-primary">Sign In</span> to OwlSpot
                        </h1>
                        <p className="font-light">
                            Enter your credentials to sign in
                        </p>
                    </div>

                    {/* ✅ Login Form */}
                    <form
                        onSubmit={handleLogin}
                        className="mt-2 w-full text-gray-600"
                    >
                        <div className="flex flex-col">
                            <label>Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your email id"
                                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="your password"
                                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <p className="text-lg text-center my-2">or</p>

                    {/* ✅ Google Login */}
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => toast.error("Google login error")}
                    />

                    <p className="text-sm text-center p-2">
                        Don't have an account?{" "}
                        <NavLink to="/SignUp" className="text-blue-500">
                            Sign Up
                        </NavLink>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;

import BlurCircle from '../components/BlurCircle'
import { assets } from '../assets/assets'
import { useNavigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { useState } from 'react'
import toast from 'react-hot-toast'

const Login = () => {
    const navigate = useNavigate();
    const { login, loginWithFacebook, loginWithGoogle } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            try {
                await login(formData);
                toast.success("Login successful!");
                navigate("/");
            } catch (error) {
                toast.error("Login failed: " + error.message);
                console.error("Login error:", error);
            }
        }
        else{
            toast.error("Please fill in all fields!");
        }
    };

    const handleFacebookLogin = async () => {
        try {
            await loginWithFacebook();
            toast.success("Facebook login successful!");
            navigate("/");
        } catch (error) {
            toast.error("Facebook login failed: " + error.message);
            console.error("Facebook login error:", error);
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            toast.success("Google login successful!");
            navigate("/");
        } catch (error) {
            toast.error("Google login failed: " + error.message);
            console.error("Google login error:", error);
        }
    }

    return (
        <div className='container relative mx-auto px-2 py-2 pb-4 bg-black-500/50 border border-primary/50 rounded-lg shadow-md my-50 w-1/3'>
            <BlurCircle top='-100px' right='-120px' />
            <BlurCircle bottom='-100px' left='-100px' />
            <h1 className="text-center text-2xl font-bold mt-5 text-primary flex gap-1 justify-center items-center">Sign in to <img src={assets.logo} alt="" /></h1>
            <h2 className="text-center text-sm text-white mt-4">Welcome back! Please sign in to continue</h2>
            <div className='mb-4 flex justify-center gap-4 mt-5 flex-col items-center'>
                <button onClick={handleFacebookLogin} className='bg-blue-500 p-2 w-1/2 rounded-md hover:bg-blue-600 cursor-pointer'>Continue with Facebook</button>
                <button onClick={handleGoogleLogin} className='bg-red-500 p-2 w-1/2 rounded-md hover:bg-red-600 cursor-pointer'>Continue with Google</button>
            </div>
            <div className="flex items-center my-4 w-2/3 mx-auto">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-white">or</span>
                <hr className="flex-grow border-gray-300" />
            </div>
            <form className="max-w-md mx-auto mt-5" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <div className='mb-4'>
                        <label className="block text-sm font-medium mb-2 text-white" htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-white" htmlFor="password">Password*</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dull text-white font-medium py-2 rounded-md transition cursor-pointer"
                >
                    Login
                </button>
            </form>
            <div className="text-center mt-4">
                <p className="text-sm text-white">Don't have an account? <a href="/register" className="text-primary hover:underline">Sign up</a></p>
            </div>
        </div>
    )
}

export default Login

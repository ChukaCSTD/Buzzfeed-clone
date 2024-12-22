import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
// import { FaArrowLeft } from 'react-icons/fa'; // Import the back arrow icon

const LoginForm = () => {
    const navigate = useNavigate();
    const { setLoggedUser } = useContext(DataContext);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            if (response.data.success) {
                console.log('Login successful:', response.data);
                setLoggedUser(response.data.data);
                localStorage.setItem("buzzfeed_user", JSON.stringify(response.data.data));
                navigate('/home');
            } else {
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in. Please try again.');
        }
    };

    return (
        <div className="Login flex items-center justify-center h-screen" style={{ backgroundImage: `url(${require('../assets/backgroundImage.png')})`, backgroundSize: 'cover' }}>
            <div className="text-center px-4 py-4 bg-white rounded-md shadow-lg w-[25%] h-[600px]">
                {/* <div className="flex items-center justify-end fade-in">
                    <FaArrowLeft className="mr-2 text-slate-400 hover:text-slate-600 text-[12px] cursor-pointer" onClick={() => navigate('/')} />
                </div> */}
                <div className="flex items-center justify-end  fade-in">
                    <img 
                        src={require('../assets/icons/esc.png')} 
                        alt="Back" 
                        className="mr-2 cursor-pointer h-8 hover:scale-[85%]" 
                        onClick={() => navigate('/')} 
                    />
                </div>
                <h2 className="text-4xl font-bold mb-4 mt-28">BuzzFeed</h2>
                <h2 className="text-xl font-bold mb-4 fade-in" style={{ fontFamily: 'Roboto, sans-serif' }}>Welcome!</h2>
                <form onSubmit={handleSubmit} className="space-y-4 px-8 fade-in" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="username"
                            placeholder=""
                            value={formData.username}
                            onChange={handleChange}
                            className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-full border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label htmlFor="username" className="peer-focus:z-10 -z-10 pl-4 peer-focus:bg-white rounded-full peer-focus:font-medium absolute text-sm left-1 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pr-2">Username</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="password"
                            placeholder=""
                            value={formData.password}
                            onChange={handleChange}
                            className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-full border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label htmlFor="username" className="peer-focus:z-10 -z-10 pl-4 peer-focus:bg-white rounded-full peer-focus:font-medium absolute text-sm left-1 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pr-2">Password</label>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-white border border-blue-50 text-gray-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
                            Login
                        </button>
                    </div>
                    <Link to="/register" className="text-center cursor-pointer text-gray-600 mt-4 text-[12px]">
                        Already have an account?{' '}
                        <span className="text-indigo-700 cursor-pointer hover:underline hover:underline-offset-2">
                            Sign Up
                        </span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;

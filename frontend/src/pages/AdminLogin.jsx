import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const AdminLogin = () => {
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
            const response = await axios.post('http://localhost:5000/api/users/adminlogin', formData);
            if (response.data.success) {
                setLoggedUser(response.data.data);
                localStorage.setItem("buzzfeed_user", JSON.stringify(response.data.data));
                navigate('/admindashboard');
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
                <h2 className="text-4xl font-bold mt-28 mb-4">Buzzfeed</h2>
                <h2 className="text-xl font-bold mb-4">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4 px-8">
                    <input type="text" name="username" onChange={handleChange} placeholder="Username" required className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-full border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600" />
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" required className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-full border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600" />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">Login</button>
                </form>
                <Link to="/adminregister" className="text-gray-600 mt-4 text-[12px]">
                    Don't have an account?{' '}
                        <span className="text-indigo-700 cursor-pointer hover:underline hover:underline-offset-2">
                            Sign Up
                        </span>
                </Link>
            </div>
        </div>
    );
};

export default AdminLogin; 
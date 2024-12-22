import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the back arrow icon

const AdminRegister = () => {
    const navigate = useNavigate();
    const { setLoggedUser } = useContext(DataContext);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        gender: '',
        password: '',
        isAdmin: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/adminregister', {
                ...formData,
                role: formData.isAdmin ? 'admin' : 'user',
            });
            if (response.data.success) {
                setLoggedUser(response.data.data);
                localStorage.setItem("buzzfeed_user", JSON.stringify(response.data.data));
                navigate('/admindashboard');
            }
        } catch (error) {
            alert('Error during registration. Please check your input.');
        }
    };

    return (
        <div className="Register flex flex-col items-center justify-center h-screen" style={{ backgroundImage: `url(${require('../assets/backgroundImage.png')})`, backgroundSize: 'cover' }}>
            <div className="flex justify-end w-[25%]">
                <Link to="/register">
                    <button
                        className="fade-in text-gray-500 px-2 py-1 rounded font-semibold hover:bg-indigo-300 hover:text-white transition duration-300">
                        <FaArrowLeft className="inline mr-1" /> To user sign up
                    </button>
                </Link>
            </div>
            <div className="flex flex-col justify-center text-center px-4 py-4 bg-white rounded-md shadow-lg w-[25%] h-[600px]">
                <h2 className="text-4xl font-bold mb-4">BuzzFeed</h2>
                <h2 className="text-xl font-bold mb-10">Admin Sign-Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4 px-8">
                    <input type="text" name="username" onChange={handleChange} placeholder="Username" required className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-full border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600" />
                    <input type="email" name="email" onChange={handleChange} placeholder="Email" required className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-full border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600" />
                    <select name="gender" onChange={handleChange} required className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-2 rounded-full border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                    <input type="password" name="password" onChange={handleChange} placeholder="Password" required className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-full border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600" />
                    <label className="flex items-center text-xs">
                        <input type="checkbox" name="isAdmin" onChange={handleChange} className="mr-2" />
                        Click here for Admin privileges
                    </label>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">Register</button>
                </form>
                <Link to="/adminlogin" className="text-gray-600 mt-4 text-[12px]">
                    Already have an account?{' '}
                    <span className="text-indigo-700 cursor-pointer hover:underline hover:underline-offset-2">
                        Log In
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default AdminRegister; 
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { FaArrowLeft } from 'react-icons/fa'; // Importing the back arrow icon

const RegisterForm = () => {
    const navigate = useNavigate();
    const { setLoggedUser } = useContext(DataContext);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        avatar: '',
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
        try {
            e.preventDefault();
            if (!formData.username || !formData.email || !formData.gender || !formData.password) { 
            }
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            console.log(response.data)
            if (response.data.success){
                setLoggedUser(response.data.data);
                localStorage.setItem("buzzfeed_user", JSON.stringify(response.data.data));
                navigate('/home');
            }
            console.log('Registration successful:', response.data);
        } catch (error) {
           alert('Check again. You are creating an invalid user.\n\nYou need to fill all fields, \nHINT: You can leave out your avatar for now, if you wish.');
        }
    };

    return (
        <div className="Register flex flex-col items-center justify-center h-screen" style={{ backgroundImage: `url(${require('../assets/backgroundImage.png')})`, backgroundSize: 'cover' }}>
            <div className="flex justify-end w-[25%]">
                <Link to="/adminregister">
                    <button
                        className="fade-in text-gray-500 px-2 py-1 rounded font-semibold hover:bg-indigo-300 hover:text-white transition duration-300">
                        <FaArrowLeft className="inline mr-1" /> To register as an admin
                    </button>
                </Link>
            </div>
            <div className="text-center px-4 py-4 bg-white rounded-md shadow-lg w-[25%] h-[600px]">
                <div className="flex items-center justify-end fade-in">
                    <img 
                        src={require('../assets/icons/esc.png')} 
                        alt="Back" 
                        className="mr-2 cursor-pointer h-8 hover:scale-[85%]" 
                        onClick={() => navigate('/')} 
                    />
                </div>
                <h2 className="text-[40px] font-bold mb-2">BuzzFeed</h2>
                {/* Learned how to imoprt font from google fonts into the project, into the public/index./html. */}
                <h2 className="text-xl font-bold mb-2 fade-in" style={{ fontFamily: 'Roboto, sans-serif' }}>Create Your Account</h2>
                <p className=" mb-4 font-light fade-in" style={{ fontFamily: 'Roboto, sans-serif' }}>Sign Up to BuzzFeed</p>
                <form onSubmit={handleSubmit} className="space-y-4 px-8 fade-in" style={{ fontFamily: 'Roboto, sans-serif' }}>                   
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="username"
                            id="floating_username"
                            onChange={handleChange}
                            className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-full border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            
                        />
                        <label htmlFor="username" className="peer-focus:z-10 -z-10 pl-4 peer-focus:bg-white rounded-full peer-focus:font-medium absolute text-sm left-1 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pr-2">Username *</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            name="email"
                            id="floating_email"
                            onChange={handleChange}
                            className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-full border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            
                        />
                        <label htmlFor="email" className="peer-focus:z-10 -z-10 pl-4 peer-focus:bg-white rounded-full peer-focus:font-medium absolute text-sm left-1 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pr-2">Email address *</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-2 rounded-full border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        >
                            <option value="" className='text-[12px] underline border text-black gap-6'>Select Gender</option>
                            <option value="male" className='text-black gap-6'>Male</option>
                            <option value="female" className='text-black gap-6'>Female</option>
                            <option value="others" className='text-black gap-6'>Others</option>
                        </select>
                        <span className="absolute right-4 top-4 text-2xl text-gray-500 pointer-events-none">&#129175;</span>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="avatar"
                            id="floating_avatar"
                            placeholder=""
                            value={formData.avatar}
                            onChange={handleChange}
                            className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-full border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label htmlFor="avatar" className="peer-focus:z-10 -z-10 pl-4 peer-focus:bg-white rounded-full peer-focus:font-medium absolute text-sm left-1 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pr-2">Avatar URL (optional) </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="password"
                            name="password"
                            id="floating_password"
                            placeholder=""
                            value={formData.password}
                            onChange={handleChange}
                            className="pl-4 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-2 rounded-full border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label htmlFor="password" className="peer-focus:z-10 -z-10 pl-4 peer-focus:bg-white rounded-full peer-focus:font-medium absolute text-sm left-1 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pr-2">Password *</label>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-white border border-blue-50 text-gray-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
                            Register
                        </button>
                    </div>
                    <Link to="/login" className="text-center cursor-pointer text-gray-600 mt-4 text-[11px]">
                        Already have an account?{' '}
                        <span className="text-indigo-700 cursor-pointer hover:underline hover:underline-offset-2">
                            Log In
                        </span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;

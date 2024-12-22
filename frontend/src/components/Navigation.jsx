import React from 'react';
import { useContext } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiSearch } from 'react-icons/fi';
import { DataContext } from "../context/DataContext";
import logo from '../assets/icons/buzzfeed.png'; // Adjust the path as necessary
import { HiSparkles } from "react-icons/hi2";
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for navigation
import { useState } from 'react'; // Import useState for managing dropdown state
import { FaSignOutAlt } from 'react-icons/fa';
import dog from '../assets/icons/dog.png'; // Adjust the path as necessary



const Navigation = () => {
    const {loggedUser, setLoggedUser} = useContext(DataContext)
    const navigate = useNavigate(); // Initialize useNavigate
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

    const handleLogout = () => {
        // First navigate to login
        navigate('/login');
        // Then clear the user data after navigation
        setTimeout(() => {
            setLoggedUser(null);
            localStorage.removeItem("buzzfeed_user");
        }, 0);
    };

    const handleCloseDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <nav className='flex flex-col justify-center mx-auto'>
            <div className="flex items-center justify-between py-3 px-[10%] bg-white border-b-2">
                <div className="menu-icon text-xl">
                    <GiHamburgerMenu />
                </div>
                <Link to={"/home"} onClick={handleCloseDropdown} className="logo">
                    <img src={logo} alt="BuzzFeed Logo" className="h-8" />
                </Link>
                <div className='flex items-center gap-2'>
                    <div className="search-icon text-xl">
                        <FiSearch />
                    </div>
                    <button className="px-2 py-1 rounded hover:bg-slate-300 transition duration-[1500ms]" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <div className="flex items-center">
                            <img src={dog} alt="Profile" className="w-8 h-8 rounded-full" />
                            {/* <p className="text-[13px] font-medium text-gray-500">Welcome, {loggedUser ? loggedUser.username + "!" : 'Sign up'}</p> */}
                        </div>
                    </button>
                    {dropdownOpen && ( // Dropdown menu
                        <div className="flex flex-col justify-between absolute bg-white w-60 h-64 rounded shadow-lg top-20 right-40 z-10 fade-in">
                            <div className="flex flex-col items-center justify-center p-2">
                                <img src={dog} alt="Profile" className="w-14 h-14 rounded-full mb-1" />
                                <p className="text-[13px] font-medium text-gray-500">{loggedUser ? loggedUser.username + "!" : 'cyberuserGuest'}</p>
                            </div>
                            <Link to="/posts/new" onClick={handleCloseDropdown} className='flex flex-col items-center justify-center'>
                                <button className="px-10 py-1 text-[13px] bg-blue-700 rounded-full text-gray-100 font-medium hover:bg-red-500">Create New Post</button>
                            </Link>
                            <div className='px-6'>
                                <button onClick={handleCloseDropdown} className="block py-1 text-[13px] text-gray-700 font-medium hover:text-red-500">Posts</button>
                                <button onClick={handleCloseDropdown} className="block py-1 text-[13px] text-gray-700 font-medium hover:text-red-500">Account Settings</button>
                                <button onClick={handleLogout} className="block  py-1 mb-2 text-[13px] text-gray-700 font-medium hover:text-red-600"> <FaSignOutAlt className="inline-block mr-2" />Log out</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between py-2 bg-white border-b-2 w-[85%] mx-auto text-[13px]">
                <div className='flex items-center pl-[7%] font-medium text-gray-500'>
                    <button className="px-4 py-2 rounded hover:text-red-500 transition duration-1000">
                        Quizzes
                    </button>
                    <button className="px-4 py-2 rounded hover:text-red-500 transition duration-1000">
                        TV & Movies
                    </button>
                    <button className="px-4 py-2 rounded hover:text-red-500 transition duration-1000">
                        Celebrity
                    </button>
                    <button className="px-4 py-2 rounded hover:text-red-500 transition duration-1000">
                        Shopping
                    </button>
                    <button className="px-4 py-2 rounded text-indigo-900 hover:text-red-500 flex items-center font-semibold transition duration-1000">
                        <HiSparkles />Arcade
                    </button>
                </div>
                <div className="text-red-500 text-[16px] hover:underline underline-offset-2" style={{ fontFamily: 'Calistoga, serif' }}>
                    <p>today we display our blog project</p>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { BiTrash } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import Comments from '../components/AdminComments';
import dog from '../assets/icons/dog.png';
import { DataContext } from '../context/DataContext';
import logo from '../assets/icons/buzzfeed.png';
import { FiUsers, FiFileText } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { loggedUser, setLoggedUser } = useContext(DataContext);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem("buzzfeed_user");
        if (!storedUser) {
            navigate('/adminlogin');
        } else {
            if (!loggedUser) {
                setLoggedUser(JSON.parse(storedUser));
            }
        }
        
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:5000/api/users');
                const postsResponse = await axios.get('http://localhost:5000/api/posts');
                
                // Map user data to posts
                const postsWithUsers = postsResponse.data.data.map(post => {
                    const user = usersResponse.data.data.find(user => user._id === post.user);
                    return {
                        ...post,
                        user: user || null
                    };
                });
                
                setUsers(usersResponse.data.data);
                setPosts(postsWithUsers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [navigate, loggedUser, setLoggedUser]);

    const handleLogout = () => {
        localStorage.removeItem("buzzfeed_user");
        navigate('/adminlogin');
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const getUsername = (post) => {
        if (!post.user) return 'Anonymous';
        return post.user.username;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-t from-indigo-500 to-gray-100">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-lg px-6 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="BuzzFeed Logo" className="h-8" />
                    </div>
                    <div className="relative">
                        <button 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-lg p-2 transition duration-200"
                        >
                            <img src={dog} alt="Profile" className="w-8 h-8 rounded-full border-2 border-indigo-200" />
                            <span className="text-gray-700 font-medium">{loggedUser?.username || 'Admin'}</span>
                            <IoMdArrowDropdown className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition duration-150"
                                >
                                    <span className="ml-2">Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard Overview</h1>
                
                <div className="grid grid-cols-2 gap-8">
                    {/* Users Section */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <FiUsers className="text-2xl text-indigo-600" />
                                    <h2 className="text-xl font-semibold text-gray-800">Users</h2>
                                </div>
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {users.length} total
                                </span>
                            </div>
                        </div>
                        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                            <ul className="divide-y divide-gray-100">
                                {users.map(user => (
                                    <li key={user._id} className="hover:bg-gray-50 transition duration-150">
                                        <div className="flex items-center justify-between p-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{user.username}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                user.role === 'admin' 
                                                    ? 'bg-purple-100 text-purple-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {user.role || 'user'}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Posts Section */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <FiFileText className="text-2xl text-indigo-600" />
                                    <h2 className="text-xl font-semibold text-gray-800">Posts</h2>
                                </div>
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {posts.length} total
                                </span>
                            </div>
                        </div>
                        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                            <ul className="divide-y divide-gray-100">
                                {posts.map(post => (
                                    <li key={post._id} className="hover:bg-gray-50 transition duration-150">
                                        <div className="p-4">
                                            <div className="flex items-center space-x-4">
                                                <img 
                                                    src={`http://localhost:5000/${post.post_cover}`} 
                                                    alt="post_cover" 
                                                    className="w-20 h-20 rounded-lg object-cover"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-medium text-gray-900">{post.title}</h3>
                                                    <p className="text-xs text-gray-500 mt-1">By {getUsername(post)}</p>
                                                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.descp}</p>
                                                </div>
                                                <button 
                                                    onClick={() => handleDeletePost(post._id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition duration-150"
                                                >
                                                    <BiTrash size={20} />
                                                </button>
                                            </div>
                                            <Comments post_id={post._id} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 
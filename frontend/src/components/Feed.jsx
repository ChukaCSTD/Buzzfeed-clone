import { Link } from "react-router-dom";
import { BiLike, BiComment } from "react-icons/bi";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContext";
import axios from "axios";

function Posts ({ posts, loading, ispostMark, removePosts }) { 
    const { category } = useContext(DataContext);
    const [commentCounts, setCommentCounts] = useState({});
    const [likeCounts, setLikeCounts] = useState({});
    
    const getCategoryName = (categoryId) => {
        const foundCategory = category.find(cat => cat._id === categoryId);
        return foundCategory ? foundCategory.name : 'Unknown Category';
    };

    useEffect(() => {
        const fetchCommentCounts = async () => {
            try {
                const counts = {};
                for (const post of posts) {
                    const response = await axios.get(`http://localhost:5000/api/comments?post_id=${post._id}`);
                    counts[post._id] = response.data.data.length;
                }
                setCommentCounts(counts);
            } catch (error) {
                console.error('Error fetching comment counts:', error);
            }
        };

        if (posts.length > 0) {
            fetchCommentCounts();
        }
    }, [posts]);

    useEffect(() => {
        const fetchLikeCounts = async () => {
            try {
                const counts = {};
                for (const post of posts) {
                    const response = await axios.get(`http://localhost:5000/api/likes/${post._id}`);
                    counts[post._id] = response.data.likes.length;
                }
                setLikeCounts(counts);
            } catch (error) {
                console.error('Error fetching like counts:', error);
            }
        };

        if (posts.length > 0) {
            fetchLikeCounts();
        }
    }, [posts]);

    return (
        <div>
            {loading && <p>Loading, please wait...</p>}
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-6 my-10" style={{ width: '70%' }}>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="group bg-white rounded-lg  overflow-hidden transition-transform hover:scale-105">
                                <div className="flex">
                                    <div className="writing-mode-vertical text-right px-2 py-4 text-xs font-medium text-blue-600 uppercase tracking-wider">
                                        {getCategoryName(post.category)}
                                    </div>
                                    
                                    {/* Main content */}
                                    <div className="flex">
                                        <Link to={`/post/${post._id}`} className="flex">
                                            <div className="">
                                                <img 
                                                    src={`http://localhost:5000/${post.post_cover}`} 
                                                    alt={post.title} 
                                                    className="w-[150px] h-48 rounded-lg object-cover"
                                                />
                                                
                                            </div>
                                            
                                            <div className="p-4">
                                                <div className="text-sm text-gray-399 px-2 py-1">
                                                    {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                                                </div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                
                                                <div className="flex items-center justify-between text-gray-600">
                                                    <div className="flex items-center space-x-4">
                                                        <button className="flex items-center space-x-1">
                                                            <BiLike className="text-xl" />
                                                            <span className="text-sm">{likeCounts[post._id] || 0}</span>
                                                        </button>
                                                        <div className="flex items-center space-x-1">
                                                            <BiComment className="text-xl" />
                                                            <span className="text-sm">{commentCounts[post._id] || 0}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : ( <p>No posts available.</p> )}
                </div>
            </div>
        </div>
    );
};

export default Posts;
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { BiLike } from "react-icons/bi";
import { TbHttpDelete } from "react-icons/tb";
import { FiDelete } from "react-icons/fi";
// import Navbar from "../components/Navbar";
// import Chapters from "../components/Chapters";
import Comment from "../components/Comments";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

function SinglePost() {
    const BASE_URL = "http://localhost:5000/api/posts";
    const url = "http://localhost:5000/api/likes";
    const { loggedUser } = useContext(DataContext);
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState([]);
    const [loader, setLoader] = useState(true);
    const [commentCount, setCommentCount] = useState(0);
    const navigate = useNavigate();

    // const addBookmark = async () => {
    //     const data = {user: loggedUser.id, book: id};
    //     const resp = await axios.post("http://localhost:5000/api/bookmark/add", data);
        
    //     if (resp.data.success) {
    //         alert("Bookmark!!!");            
    //     } else {
    //         console.log("Book Already Bookmarked");
    //     }            
    // };

    useEffect(() => {
        const getSinglePost = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/${id}`);
                if (response.data.success) {
                    setPost(response.data.data);
                    setLoader(false);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const getCommentsCount = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/comments?post_id=${id}`);
                if (response.data.success) {
                    setCommentCount(response.data.data.length);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const getLikes = async () => {
            try {
                const response = await axios.get(`${url}/${id}`);
                if (response.data.success) {
                    setLikes(response.data.likes);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getSinglePost();
        getCommentsCount();
        getLikes();
    }, [id]);


    const likePost = async () => {
        if (!loggedUser || !loggedUser.id) {
            navigate('/login');
            return;
        }
        const like_data = { post: id, user: loggedUser.id };
        try {
            const resp = await axios.post(url, like_data);
            if (resp.data.success) {
                const likesResponse = await axios.get(`${url}/${id}`);
                if (likesResponse.data.success) {
                    setLikes(likesResponse.data.likes);
                }
            }
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    const handleDelete = async () => {
        const resp = await axios.delete(`${BASE_URL}/${id}`);
        if (resp.data.success) {
            alert("Post Deleted");
        }
    };

    if (loader) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Post not found.</p>
            </div>
        );
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50">
                <div className="bg-white shadow-md rounded-sm p-6 max-w-7xl w-full">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                            <img src={`http://localhost:5000/${post.post_cover}`} alt="post_cover" className="rounded md:h-full object-cover object-right" />
                        </div>
                        <div className="md:w-2/3 md:pl-4">
                            <div className="flex flex-col justify-between items-left">
                                <button 
                                    className="bg-blue-500 hover:bg-blue-600 w-52 text-white px-2 py-2 rounded-full shadow-lg transition-all duration-300"
                                    onClick={() => document.getElementById('comments-drawer').classList.toggle('translate-y-full')}
                                >
                                    💬 View all {commentCount} comments 
                                </button>
                                <h2 className="text-4xl font-bold mt-4">{post.title || "Untitled Post"}</h2>
                            </div>
                            <div className="flex gap-1 mt-4">
                                <button className="flex items-center gap-1 text-gray-700 px-2 rounded-xl hover:bg-red-600" onClick={handleDelete}>
                                    <FiDelete /><TbHttpDelete size={30} className="font-extralight" />
                                </button>
                                <button className="flex items-center gap-1 text-black px-2 rounded-xl hover:bg-green-300" onClick={likePost}>
                                    <BiLike className="w-5 h-5" />
                                    <p>{likes.length}</p>
                                </button>
                            </div>
                            <div className="mt-4">
                                <div className="description">
                                    <h3 className="text-lg font-semibold">Description</h3>
                                    <p className="text-gray-700">{post.descp || "No description available."}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-sm text-gray-500">Tags: </span>
                                {post.tags && post.tags.map((tag, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {/* <Chapters book_id={id} /> */}
                            <div className="relative">
                                <div 
                                    id="comments-drawer"
                                    className="fixed bottom-0 right-0 w-96 h-[80vh] bg-white shadow-2xl rounded-t-2xl transform translate-y-full transition-transform duration-300 ease-in-out z-40"
                                >
                                    <Comment 
                                        post_id={id} 
                                        onCommentUpdate={(newCount) => setCommentCount(newCount)} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SinglePost;
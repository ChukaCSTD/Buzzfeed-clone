import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BiTrash } from "react-icons/bi";

const Comments = ({ post_id, onDelete }) => {
    const [comments, setComments] = useState([]);
    const [msg, setMsg] = useState("");

    const fetchComments = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/comments?post_id=${post_id}`);
            if (response.data.success) {
                setComments(response.data.data);
            } else {
                setMsg(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            setMsg("An error occurred while fetching comments");
        }
    }, [post_id]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleDeleteComment = async (commentId, parentId = null) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
            if (response.data.success) {
                if (parentId) {
                    setComments(comments.map(comment => {
                        if (comment._id === parentId) {
                            return {
                                ...comment,
                                replies: comment.replies.filter(reply => reply._id !== commentId)
                            };
                        }
                        return comment;
                    }));
                } else {
                    setComments(comments.filter(comment => comment._id !== commentId));
                }
                if (onDelete) onDelete(commentId);
                
                // Refresh comments after deletion
                fetchComments();
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            setMsg("An error occurred while deleting comment");
        }
    };

    const Comment = ({ comment, isReply, parentId = null }) => (
        <div className={`review ${isReply ? 'ml-8' : ''} grid grid-cols-2 gap-6 mt-6 hover:bg-gray-100 rounded-md p-2`}>
            <div>
                <p className="font-semibold">{comment.user?.username}</p>
                <p className="text-gray-700">{comment.content}</p>
                <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                </span>
            </div>
            <span className="flex items-center justify-end">
                <button 
                    onClick={() => handleDeleteComment(comment._id, parentId)} 
                    className="text-red-500 hover:text-red-700"
                >
                    <BiTrash />
                </button>
            </span>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow p-4 mt-4">
            <h2 className="text-xl font-semibold mb-2">Comments</h2>
            {comments.length ? (
                comments.map((comment) => (
                    <div key={comment._id}>
                        <Comment comment={comment} isReply={false} />
                        {comment.replies?.map((reply) => (
                            <Comment 
                                key={reply._id} 
                                comment={reply} 
                                isReply={true} 
                                parentId={comment._id}
                            />
                        ))}
                    </div>
                ))
            ) : (
                <p>No comments available.</p>
            )}
            {msg && <p className="text-red-500 mt-2">{msg}</p>}
        </div>
    );
};

export default Comments;

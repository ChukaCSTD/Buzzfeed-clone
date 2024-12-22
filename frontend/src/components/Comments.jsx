import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { DataContext } from "../context/DataContext";

const Comments = ({ post_id, onCommentUpdate }) => {
  const { loggedUser } = useContext(DataContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    post: post_id,
    user: loggedUser.id,
    content: "",
  });
  const [replyTo, setReplyTo] = useState(null);
  const [msg, setMsg] = useState("");
  const URL = "http://localhost:5000/api/comments";
  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleCommentChange = (e) => {
    setNewComment({ ...newComment, content: e.target.value });
    adjustTextareaHeight();
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(`${URL}?post_id=${post_id}`);
        if (response.data.success) {
          setComments(response.data.data);
        } else {
          setMsg(response.data.message);
        }
      } catch (error) {
        console.error(error);
        setMsg("An error occurred while fetching comments");
      }
    };
    getComments();
  }, [post_id]);

  const postComment = async (e) => {
    e.preventDefault();
    if (!newComment.content) return;
    try {
        const response = await axios.post(`${URL}/new`, newComment);
        if (response.data.success) {
            setComments([...comments, response.data.data]);
            setNewComment({ ...newComment, content: "" });
            // Fetch updated comment count
            const countResponse = await axios.get(`${URL}?post_id=${post_id}`);
            if (countResponse.data.success) {
                setComments(countResponse.data.data);
                // Update parent component's comment count
                onCommentUpdate && onCommentUpdate(countResponse.data.data.length);
            }
        } else {
            setMsg(response.data.message);
        }
    } catch (error) {
        console.error(error);
        setMsg("An error occurred while posting your comment");
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/reply`, {
        post_id: post_id,
        user_id: loggedUser.id,
        content: newComment.content,
        parent_comment_id: replyTo._id
      });

      if (response.data.success) {
        const updatedComments = comments.map(comment => {
          if (comment._id === replyTo._id) {
            return {
              ...comment,
              replies: [...(comment.replies || []), response.data.data]
            };
          }
          return comment;
        });
        setComments(updatedComments);
        setNewComment({ ...newComment, content: "" });
        setReplyTo(null);
      } else {
        setMsg(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMsg("An error occurred while posting your reply");
    }
  };

  const Comment = ({ comment, isReply }) => (
    <div className={`mb-4 ${isReply ? 'ml-8' : ''} bg-gray-50 rounded-lg p-3`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold">{comment.user.username}</span>
        <span className="text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="text-gray-700">{comment.content}</p>
      {!isReply && (
        <button
          onClick={() => setReplyTo(comment)}
          className="text-xs text-blue-500 mt-2 hover:text-blue-700"
        >
          Reply
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Comments</h2>
        <button 
          onClick={() => document.getElementById('comments-drawer').classList.toggle('translate-y-full')}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Comment Form */}
      <form onSubmit={replyTo ? handleReply : postComment} className="p-4">
        {replyTo && (
          <div className="flex justify-between items-center mb-2 bg-gray-100 p-2 rounded">
            <span className="text-sm">Replying to {replyTo.user.username}</span>
            <button
              type="button"
              onClick={() => setReplyTo(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        )}
        <textarea
          ref={textareaRef}
          value={newComment.content}
          onChange={handleCommentChange}
          placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
          className="overflow-hidden w-full min-h-[44px] max-h-[300px] p-2 border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows="1"
        />
        <button 
          type="submit"
          className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
        >
          {replyTo ? "Post Reply" : "Post Comment"}
        </button>
      </form>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 border-t">
        {comments.length ? (
          comments.map((comment) => (
            <div key={comment._id}>
              <Comment comment={comment} isReply={false} />
              {comment.replies?.map((reply) => (
                <Comment key={reply._id} comment={reply} isReply={true} />
              ))}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No comments yet</p>
        )}
        {msg && <p className="text-red-500 text-center">{msg}</p>}
      </div>
    </div>
  );
};

export default Comments;

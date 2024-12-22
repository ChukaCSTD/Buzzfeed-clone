import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  let form_data = new FormData();
  const URL = "http://localhost:5000/api/posts/create_post";
  const { category, loggedUser } = useContext(DataContext);
  const navigate = useNavigate();

  // Redirect if no user is logged in
  useEffect(() => {
    if (!loggedUser || !loggedUser.id) {
      navigate('/login');
    }
  }, [loggedUser, navigate]);

  const [post, setPost] = useState({
    user: loggedUser?.id || '',
    title: "",
    category: "",
    tags: [],
    descp: "",
    post_cover: "",
  });

  // function to change tag
  const change_tag = (e) => {
    let tag = e.target.value.split(",");
    setPost((prev) => ({...prev, tags: tag }))
  }

  // function to create book
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(post)

    // Validate form inputs
    if (!post.title || !post.category || !post.descp || !post.post_cover) {
      alert("Please fill in all required fields.");
      return;
    }

   // Append data to FormData
    form_data.append("user", post.user);
    form_data.append("title", post.title);
    form_data.append("category", post.category);
    form_data.append("tags", post.tags);
    form_data.append("descp", post.descp);
    form_data.append("post_cover", post.post_cover);

    try {
      const response = await axios.post(URL, form_data);
      alert("Post created successfully!");
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="min-h-[100vh] bg-white">
      <div className="max-w-2xl mx-auto bg-white {/*shadow-md rounded-lg*/} p-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Create a New Post
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="form_group">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input type="text" value={post.title}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, title: e.target.value }))
              }
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none sm:text-sm"
              placeholder="Enter post title"
            />
          </div>
          <div className="form_group">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              value={post.category}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, category: e.target.value }))
              }
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none  sm:text-sm"
            >
              <option value="">Select Category</option>
              {category.length
                ? category.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div className="form_group">
            <label
              htmlFor="descp"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              value={post.descp}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, descp: e.target.value }))
              }
              className="mt-1 p-2 block w-full h-24 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none  sm:text-sm"
              placeholder="Write a brief description"
            ></textarea>
          </div>
          <div className="form_group">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              // value={book.tags.join(",")}
              onBlur={change_tag}
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none  sm:text-sm"
              placeholder="Enter tags separated by commas"
            />
          </div>
          <div className="form_group">
            <label
              htmlFor="post_cover"
              className="block text-sm font-medium text-gray-700"
            >
              Post Cover image
            </label>
            <input
              type="file"
              id="post_cover"
              onChange={(e) =>
                setPost((prev) => ({ ...prev, post_cover: e.target.files[0] }))
              }
              className="mt-1 p-2 block w-full border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#22D3EE] hover:bg-[#95e4f0] text-white font-medium py-2 px-4 rounded-sm shadow-sm"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

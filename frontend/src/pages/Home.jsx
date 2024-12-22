import { useEffect, useState, } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdOutlineAddReaction } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { FaRegCommentAlt } from "react-icons/fa";
import Posts from "../components/Feed";
import axios from "axios";

function Home(){
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
   
    useEffect(() => {
        const getPosts = async () => {
            try {
                const resp = await axios.get("http://localhost:5000/api/posts");
                if (resp.data.success) {
                    const sortedPosts = resp.data.data.sort((a, b) => 
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setPosts(sortedPosts);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        };
        getPosts();

    }, []);

    return(
        <>
        <div className="container relative w-[85%] mt-4 mx-auto px-4">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-4">
                    <img src={require('../assets/trending3.png')} alt="Section 1" className="absolute z-10 bg-white rounded-full h-24 w-24 -left-10 -top-10 spin-animation" />
                <div className="bg-gray-200 rounded-xl relative cursor-pointer">
                    {/* Column 1 Content */}
                    <img src={require('../assets/section1-1.webp')} alt="Section 1" className="w-full rounded-xl h-auto" />
                    <div className="w-full rounded-xl h-full flex space-x-4 absolute top-0 bg-gradient-to-t from-black to-transparent text-indigo-300 hover:text-yellow-300">
                        <h2 className="text-[48px] font-bold absolute left-4 bottom-36" style={{ fontFamily: 'Calistoga, sans-serif' }}>1</h2>
                        <h2 className="text-[28px] font-bold absolute left-10 bottom-16 leading-tight" style={{ fontFamily: 'Calistoga, serif' }}>8 Times Actors Called Out Their Worst Theater Experiences With Costars, Crew, And Peers</h2>
                        <div className="flex gap-2 items-center mt-[325px] pl-10">
                            <div className="flex items-center">
                                <p className="flex text-lg rounded-full p-0 border border-gray-800">😂</p>
                                <p className="flex text-lg rounded-full p-0 border border-gray-800">🙄</p>
                            </div>
                            <p className="flex text-md text-gray-300">3</p>
                            <MdOutlineAddReaction className="text-gray-300 hover:scale-105" size={22} />
                            <p className="flex text-[10px] text-gray-300 mx-2"><GoDotFill /></p>
                            <FaRegCommentAlt className="text-gray-300 hover:scale-105" size={20} />
                            <p className="flex text-md text-gray-300">1</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl relative cursor-pointer">
                    {/* Column 2 Content */}
                    <div className='relative text-gray-500 hover:text-yellow-300'>
                        <img src={require('../assets/section1-2.webp')} alt="Section 1" className="w-full rounded-xl h-auto" />
                        <div className="w-full rounded-xl h-full flex space-x-4 absolute top-0 bg-gradient-to-t from-black via-transparent to-transparent ">
                            <h2 className="text-[48px] font-bold  absolute left-4 bottom-0" style={{ fontFamily: 'Calistoga, sans-serif' }}>2</h2>
                            <span className="text-[15px] font-bold absolute -left-4 -bottom-[85px]">18 Wholesome Posts I Saw This Week That Were So Cute They Legitimately Put Me In A Happier Mood</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center mt-24 ">
                        <div className="flex items-center">
                            <p className="flex text-lg rounded-full bg-gray-200">👍</p>
                            <p className="flex text-lg rounded-full bg-gray-200">❤️</p>
                        </div>
                        <p className="flex text-md text-gray-500">8</p>
                        <MdOutlineAddReaction className="text-gray-500 hover:scale-105" size={22} />
                        <p className="flex text-[10px] text-gray-500 mx-2"><GoDotFill /></p>
                        <FaRegCommentAlt className="text-gray-500 hover:scale-105" size={20} />
                        <p className="flex text-md text-gray-500">16</p>
                    </div>
                </div>
                <div className="rounded-xl relative cursor-pointer">
                    {/* Column 3 Content */}
                    <div className='relative text-gray-500 hover:text-yellow-300'>
                        <img src={require('../assets/section1-3.webp')} alt="Section 1" className="w-full rounded-xl h-auto" />
                        <div className="w-full rounded-xl h-full flex space-x-4 absolute top-0 bg-gradient-to-t from-black via-transparent to-transparent ">
                            <h2 className="text-[48px] font-bold  absolute left-4 bottom-0" style={{ fontFamily: 'Calistoga, sans-serif' }}>3</h2>
                            <span className="text-[15px] font-bold absolute -left-4 -bottom-[85px]">People Can’t Believe These Interviews With Inmates At The Jail Luigi Mangione Is Being Held In Are Real</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center mt-24 ">
                        <div className="flex items-center">
                            <p className="flex text-lg rounded-full bg-gray-200">🙄</p>
                            <p className="flex text-lg rounded-full bg-gray-200">👍</p>
                        </div>
                        <p className="flex text-md text-gray-500">27</p>
                        <MdOutlineAddReaction className="text-gray-500 hover:scale-105" size={22} />
                        <p className="flex text-[10px] text-gray-500 mx-2"><GoDotFill /></p>
                        <FaRegCommentAlt className="text-gray-500 hover:scale-105" size={20} />
                        <p className="flex text-md text-gray-500">18</p>
                    </div>
                </div>
                <div className="rounded-xl relative cursor-pointer">
                    {/* Column 4 Content */}
                    <div className='relative text-gray-500 hover:text-yellow-300'>
                        <img src={require('../assets/section1-4.webp')} alt="Section 1" className="w-full rounded-xl h-auto" />
                        <div className="w-full rounded-xl h-full flex space-x-4 absolute top-0 bg-gradient-to-t from-black via-transparent to-transparent ">
                            <h2 className="text-[48px] font-bold  absolute left-4 bottom-0" style={{ fontFamily: 'Calistoga, sans-serif' }}>4</h2>
                            <span className="text-[15px] font-bold absolute -left-4 -bottom-[85px]">My Lungs Are Physically Sore From Laughing So Hard At These 18 Black Twitter Tweets From The Week</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center mt-24 ">
                        <div className="flex items-center">
                            <p className="flex text-lg rounded-full bg-gray-200">😭</p>
                            <p className="flex text-lg rounded-full bg-gray-200">😂</p>
                        </div>
                        <p className="flex text-md text-gray-500">24</p>
                        <MdOutlineAddReaction className="text-gray-500 hover:scale-105" size={22} />
                        <p className="flex text-[10px] text-gray-500 mx-2"><GoDotFill /></p>
                        <FaRegCommentAlt className="text-gray-500 hover:scale-105" size={20} />
                        <p className="flex text-md text-gray-500">18</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button className="flex items-center justify-end text-indigo-500 hover:text-red-500 font-bold py-2 px-4 rounded">See All Trending <IoIosArrowForward /> </button>
            </div>
            <hr className="mb-6" />
            <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-4">
                <div className="bg-white relative cursor-pointer border-r-2">
                    {/* Column 1 Content */}
                    <h2 className="text-[16px] font-bold absolute left-12" style={{ fontFamily: 'Calistoga, serif' }}>how it feels to survive 2024</h2>
                    <img src={require('../assets/section2-1.webp')} alt="Section 1" className="rounded-lg mt-6" />
                    <div className="flex gap-2 items-center mt-2 justify-end relative right-10">
                    <div className="flex items-center">
                            <p className="flex text-lg rounded-full bg-gray-200">😭</p>
                            <p className="flex text-lg rounded-full bg-gray-200">😂</p>
                        </div>
                        <p className="flex text-lg text-gray-500">26</p>
                        <MdOutlineAddReaction className="text-gray-500 hover:scale-105" size={24} />
                        {/* <p className="flex text-[10px] text-gray-500 mx-2"><GoDotFill /></p> */}
                        {/* <FaRegCommentAlt className="text-gray-500 hover:scale-105" size={22} /> */}
                        {/* <p className="flex text-lg text-gray-500">18</p> */}
                    </div>
                </div>
                <div className=" relative cursor-pointer border-r-2">
                    {/* Column 2 Content */}
                    <div className='relative text-gray-500 h-28 w-28'>
                        <img src={require('../assets/section2-2-1.webp')} alt="Section 1" className="w-full rounded-xl h-24 mb-4" />
                        <img src={require('../assets/section1-2.webp')} alt="Section 1" className="w-full rounded-xl h-auto" />
                        <div className="w-full rounded-xl h-full flex space-x-4 absolute top-0 ">
                            <h2 className="text-[12px] font-bold hover:text-blue-500 absolute left-28 top-32 w-52 pl-4" style={{ fontFamily: 'Calistoga, sans-serif' }}><span className="text-red-500" style={{ fontFamily: 'serif' }}>SHOPPING</span> <br />43 Useful Stocking Stuffers You Still Have Time To Get</h2>
                            <h2 className="text-[12px] font-bold hover:text-blue-500 absolute left-28 top-1 w-52 pr-4" style={{ fontFamily: 'Calistoga, sans-serif' }}><span className="text-red-500" style={{ fontFamily: 'serif' }}>SHOPPING</span> <br />44 Expensive-Looking Items That'll Make Everyone Think You Spent Moneyyyyyyy On Their Gifts</h2>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="rounded-xl relative cursor-pointer">
                    {/* Column 3 Content */}
                    <div className='relative text-black'>
                        <div className="flex">
                            <img src={require('../assets/section2-3.webp')} alt="Section 1" className="w-[280px]  rounded-l-xl h-52" />
                            <div className=" rounded-r-xl flex flex-col px-4 space-y-2 bg-yellow-200 w-[300px] h-52">
                                <h2 className="pt-4 text-xl font-bold">Pop Quiz!</h2>
                                <p className="text-sm font-semibold hover:text-blue-500">These 19 Christmas Traditions Are Going Extinct, So I'm Curious If You Still Keep Them Alive</p>
                                <p className="text-sm font-semibold text-blue-500 hover:text-red-500 flex items-center">Read The Post <IoIosArrowForward size={18} /> </p>
                            </div>
                        </div>
                        <div className="flex space-x-2 mt-1">
                            <div className="w-3 h-3 rounded-full bg-blue-500 transition-colors duration-300"></div>
                            <div className="w-3 h-3 border border-blue-500 rounded-full hover:border-red-400 transition-colors duration-300"></div>
                            <div className="w-3 h-3 border border-blue-500 rounded-full hover:border-red-400 transition-colors duration-300"></div>
                            <div className="w-3 h-3 border border-blue-500 rounded-full hover:border-red-400 transition-colors duration-300"></div>
                            <div className="w-3 h-3 border border-blue-500 rounded-full hover:border-red-400 transition-colors duration-300"></div>
                        </div>
                        <div className="flex absolute -bottom-3 left-[200px] items-center mt-4 gap-2 px-4">
                            {/* Left Arrow */}
                            <button className="bg-blue-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors duration-300">
                                <IoIosArrowBack size={18} />
                            </button>
                            {/* Right Arrow */}
                            <button className="bg-blue-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors duration-300">
                                <IoIosArrowForward size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <hr className="relative w-[full] right-0 mt-8 mb-6 bg-gray-200 h-56" />
            <div className="container flex w-[85%] relative mt-4 mx-auto px-4">
                <Posts posts={posts} loading={loading} />
                <div className="bg-gray-200 h-[600px] w-72 mt-20 flex items-center justify-center text-xs absolute right-10">No one likes Ads</div>
            </div>
        </>
    );
}

export default Home;
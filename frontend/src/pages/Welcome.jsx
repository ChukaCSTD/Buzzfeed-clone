import { Link } from 'react-router-dom';

function Welcome () {
    return (
        <div className="Welcome flex items-center justify-center h-screen" style={{ backgroundImage: `url(${require('../assets/backgroundImage.png')})`, backgroundSize: 'cover' }}>
            <div className="text-center flex flex-col justify-center items-center p-10 bg-white rounded-md shadow-lg w-[25%] h-[600px] gap-16">
                <h1 className="text-5xl font-bold mb-8">Hi, Welcome to BuzzFeed!</h1>
                <h1 className="text-xl mb-8">Your online media, news and entertainment platform.</h1>
                <div className="space-x-6">
                    <Link to="/register">
                        <button
                            className="bg-gray-100 fade-in hover:text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition duration-300">
                            Register
                        </button>
                    </Link>
                    <Link to="/login">
                        <button
                            className="bg-indigo-400 fade-in text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-500 transition duration-300">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Welcome;
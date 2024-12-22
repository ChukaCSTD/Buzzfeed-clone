import React from 'react';

const Error404 = () => {
    return (
        <div className="Login flex items-center justify-center h-screen" style={{ backgroundImage: `url(${require('../assets/backgroundImage.png')})`, backgroundSize: 'cover' }}>
            <div className='gap-4 flex flex-col bg-white m-8 px-8 justify-center items-center rounded-md shadow-lg opacity-85' style={{ textAlign: 'center', marginTop: '50px', height: '30vh' }}>
                <h1 className='text-red-600 font-bold text-3xl'>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <a href="/home">Go back to a <span className=' text-indigo-700'>Safe Place 🧘‍♂️</span></a>
            </div>
        </div>
    );
};

export default Error404;

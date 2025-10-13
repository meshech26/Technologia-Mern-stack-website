import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
<div className="w-full">


      {/* Hero Section */}
      <div className="relative">
        <img
          src="/images/hero.jpg"
          alt="Hero Banner"
          className="w-full h-[500px] object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 bg-black/40">
          <p className="text-sm tracking-widest mb-2">GIFT GUIDE</p>
          <h2 className="text-5xl font-semibold mb-4">here's to joy</h2>
          <button className="bg-gray-800 hover:bg-gray-900 px-6 py-2 rounded text-white font-medium">
            SHOP GIFTS
          </button>
        </div>
      </div>


      {/* End of main container */}
    </div>
  );

}

export default Home;
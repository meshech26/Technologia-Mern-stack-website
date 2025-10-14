import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Remove the simple header since we have the main Header component */}
      
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-5xl font-bold mb-4">Welcome to Technologia</h2>
          <p className="text-xl">Your one-stop shop for electronics and warranty services</p>
          <button className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold mb-3">Warranty Services</h4>
            <p>Register and manage your product warranties with ease</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold mb-3">Product Repair</h4>
            <p>Professional repair services for all your electronics</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h4 className="text-xl font-semibold mb-3">Support</h4>
            <p>24/7 customer support for all your needs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
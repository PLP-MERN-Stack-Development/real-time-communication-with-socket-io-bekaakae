import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Socket.io Chat</h1>
          <p className="text-gray-600 mb-2">Real-time messaging application</p>
          <p className="text-sm text-gray-500">Built with React, Node.js, and Socket.io</p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Join Chat
          </Link>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Real-time messaging</p>
            <p>• Multiple chat rooms</p>
            <p>• Private messaging</p>
            <p>• Online user status</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import React from 'react';

const Message = ({ message, isOwn, currentUser }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (message.system) {
    return (
      <div className="text-center">
        <span className="inline-block bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full">
          {message.message}
        </span>
      </div>
    );
  }

  if (message.isPrivate) {
    return (
      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isOwn 
            ? 'bg-purple-500 text-white rounded-br-none' 
            : 'bg-purple-100 text-purple-800 rounded-bl-none border border-purple-200'
        }`}>
          <div className="flex items-center space-x-2 mb-1">
            {!isOwn && (
              <span className="font-semibold text-sm">{message.sender}</span>
            )}
            <span className="text-xs opacity-75">🔒 Private</span>
          </div>
          <div className="break-words">
            {message.message}
          </div>
          <div className={`text-xs mt-1 ${isOwn ? 'text-purple-100' : 'text-purple-600'}`}>
            {formatTime(message.timestamp || message.createdAt)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
        isOwn 
          ? 'bg-blue-500 text-white rounded-br-none' 
          : 'bg-gray-200 text-gray-800 rounded-bl-none'
      }`}>
        {!isOwn && (
          <div className="font-semibold text-sm mb-1">
            {message.sender}
          </div>
        )}
        <div className="break-words">
          {message.message}
        </div>
        <div className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
          {formatTime(message.timestamp || message.createdAt)}
          {message.read && isOwn && (
            <span className="ml-1">✓ Read</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
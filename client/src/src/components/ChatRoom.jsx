import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

const ChatRoom = ({ 
  messages, 
  onSendMessage, 
  onTyping, 
  typingUsers, 
  currentUser, 
  activeRoom,
  onNotification 
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Filter typing users for current room
    const roomTypingUsers = typingUsers.filter(user => user.room === activeRoom);
    if (roomTypingUsers.length > 0 && roomTypingUsers.some(user => user.username !== currentUser)) {
      onNotification({
        type: 'info',
        message: `${roomTypingUsers.map(u => u.username).join(', ')} ${roomTypingUsers.length === 1 ? 'is' : 'are'} typing...`
      });
    }
  }, [typingUsers, activeRoom, currentUser, onNotification]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage({
        message: message.trim(),
        room: activeRoom
      });
      setMessage('');
      handleStopTyping();
    }
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      onTyping({
        isTyping: true,
        room: activeRoom
      });
    }
  };

  const handleStopTyping = () => {
    if (isTyping) {
      setIsTyping(false);
      onTyping({
        isTyping: false,
        room: activeRoom
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Filter messages for current room and include private messages for current user
  const roomMessages = messages.filter(msg => {
    if (msg.isPrivate) {
      return msg.recipient === currentUser || msg.sender === currentUser;
    }
    return msg.room === activeRoom || !msg.room;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
        {roomMessages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          roomMessages.map((msg) => (
            <Message 
              key={msg.id || msg._id} 
              message={msg} 
              isOwn={msg.sender === currentUser}
              currentUser={currentUser}
            />
          ))
        )}
        
        <TypingIndicator 
          typingUsers={typingUsers} 
          activeRoom={activeRoom} 
          currentUser={currentUser}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={handleKeyDown}
              onBlur={handleStopTyping}
              placeholder="Type your message... (Press Enter to send)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;
import React, { useState } from 'react';
import { useSocketContext } from '../context/SocketContext';
import ChatRoom from '../components/ChatRoom';
import UserList from '../components/UserList';
import Notification from '../components/Notification';

const ChatPage = ({ currentUser, onLogout }) => {
  const [activeRoom, setActiveRoom] = useState('general');
  const [notifications, setNotifications] = useState([]);
  
  const {
    messages,
    users,
    typingUsers,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    joinRoom
  } = useSocketContext();

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification
    };
    setNotifications(prev => [...prev, newNotification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleSendMessage = (messageData) => {
    sendMessage({
      ...messageData,
      sender: currentUser
    });
  };

  const handlePrivateMessage = (to, message) => {
    sendPrivateMessage(to, message, currentUser);
  };

  const handleTyping = (typingData) => {
    setTyping({
      ...typingData,
      username: currentUser
    });
  };

  const handleRoomChange = (room) => {
    setActiveRoom(room);
    joinRoom(room);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <Notification 
            key={notification.id} 
            notification={notification}
            onClose={() => setNotifications(prev => 
              prev.filter(n => n.id !== notification.id)
            )}
          />
        ))}
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">Socket.io Chat</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Connected</span>
                <span>•</span>
                <span>Room: {activeRoom}</span>
                <span>•</span>
                <span>User: {currentUser}</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
          {/* Sidebar - User List */}
          <div className="lg:w-1/4 bg-white rounded-lg shadow-sm p-4">
            <UserList 
              users={users} 
              currentUser={currentUser}
              onPrivateMessage={handlePrivateMessage}
              activeRoom={activeRoom}
              onRoomChange={handleRoomChange}
            />
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col">
            <ChatRoom
              messages={messages}
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              typingUsers={typingUsers}
              currentUser={currentUser}
              activeRoom={activeRoom}
              onNotification={addNotification}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
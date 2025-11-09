import React, { useState } from 'react';
import { useSocketContext } from '../context/SocketContext';

const UserList = ({ currentUser, onPrivateMessage, activeRoom, onRoomChange }) => {
  const [showPrivateInput, setShowPrivateInput] = useState(false);
  const [privateMessage, setPrivateMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  
  const { users } = useSocketContext();

  const rooms = ['general', 'random', 'tech', 'gaming'];

  const handlePrivateMessage = (user) => {
    setSelectedUser(user);
    setShowPrivateInput(true);
  };

  const sendPrivateMessage = () => {
    if (privateMessage.trim() && selectedUser) {
      onPrivateMessage(selectedUser.socketId, privateMessage.trim());
      setPrivateMessage('');
      setShowPrivateInput(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Rooms */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">Chat Rooms</h3>
        <div className="space-y-1">
          {rooms.map(room => (
            <button
              key={room}
              onClick={() => onRoomChange(room)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeRoom === room 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              # {room}
            </button>
          ))}
        </div>
      </div>

      {/* Online Users */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">
          Online Users ({users.length})
        </h3>
        <div className="space-y-2">
          {users.map(user => (
            <div
              key={user._id || user.socketId}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className={`font-medium ${
                  user.username === currentUser ? 'text-blue-500' : 'text-gray-700'
                }`}>
                  {user.username}
                  {user.username === currentUser && ' (You)'}
                </span>
              </div>
              
              {user.username !== currentUser && (
                <button
                  onClick={() => handlePrivateMessage(user)}
                  className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition-colors"
                >
                  PM
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Private Message Input */}
      {showPrivateInput && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="font-semibold mb-2">
              Private message to {selectedUser.username}
            </h3>
            <input
              type="text"
              value={privateMessage}
              onChange={(e) => setPrivateMessage(e.target.value)}
              placeholder="Type your private message..."
              className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
              onKeyDown={(e) => e.key === 'Enter' && sendPrivateMessage()}
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={sendPrivateMessage}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors"
              >
                Send
              </button>
              <button
                onClick={() => {
                  setShowPrivateInput(false);
                  setSelectedUser(null);
                  setPrivateMessage('');
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
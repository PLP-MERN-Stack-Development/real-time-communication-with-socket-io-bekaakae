// Socket event handlers
const User = require('../models/User');
const Message = require('../models/Message');

const initializeSocketHandlers = (io) => {
  const typingUsers = new Map(); // Use Map to track typing users by room

  io.on('connection', async (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user joining
    socket.on('user_join', async (username) => {
      try {
        // Save user to database
        const user = await User.findOneAndUpdate(
          { username },
          { 
            socketId: socket.id, 
            isOnline: true,
            lastSeen: new Date()
          },
          { upsert: true, new: true }
        );

        // Add user to general room
        socket.join('general');
        
        // Notify all users
        const onlineUsers = await User.find({ isOnline: true });
        io.emit('user_list', onlineUsers);
        io.emit('user_joined', { username, id: socket.id });
        
        console.log(`${username} joined the chat`);
      } catch (error) {
        console.error('Error joining user:', error);
      }
    });

    // Handle chat messages
    socket.on('send_message', async (messageData) => {
      try {
        const message = new Message({
          sender: messageData.sender,
          senderId: socket.id,
          message: messageData.message,
          room: messageData.room || 'general'
        });

        await message.save();
        
        // Emit to room
        io.to(messageData.room || 'general').emit('receive_message', message);
        
        // Clear typing indicator for this user
        typingUsers.delete(socket.id);
        io.to(messageData.room || 'general').emit('user_stop_typing', {
          username: messageData.sender
        });
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    // Handle typing indicator
    socket.on('typing', async (data) => {
      const { isTyping, username, room = 'general' } = data;
      
      if (isTyping) {
        typingUsers.set(socket.id, { username, room });
        socket.to(room).emit('user_typing', { username, room });
      } else {
        typingUsers.delete(socket.id);
        socket.to(room).emit('user_stop_typing', { username, room });
      }
    });

    // Handle private messages
    socket.on('private_message', async ({ to, message, sender }) => {
      try {
        const recipient = await User.findOne({ socketId: to });
        if (!recipient) return;

        const privateMessage = new Message({
          sender,
          senderId: socket.id,
          message,
          isPrivate: true,
          recipient: recipient.username
        });

        await privateMessage.save();

        // Send to recipient
        socket.to(to).emit('private_message', privateMessage);
        // Send back to sender
        socket.emit('private_message', privateMessage);
      } catch (error) {
        console.error('Error sending private message:', error);
      }
    });

    // Handle read receipts
    socket.on('message_read', async (messageId) => {
      try {
        await Message.findByIdAndUpdate(messageId, { read: true });
        io.emit('message_status_update', { messageId, read: true });
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    });

    // Handle room joining
    socket.on('join_room', (room) => {
      socket.join(room);
      socket.emit('room_joined', room);
    });

    // Handle disconnection
    socket.on('disconnect', async () => {
      try {
        const user = await User.findOneAndUpdate(
          { socketId: socket.id },
          { 
            isOnline: false,
            lastSeen: new Date()
          }
        );

        if (user) {
          // Remove from typing users
          typingUsers.delete(socket.id);
          
          const onlineUsers = await User.find({ isOnline: true });
          io.emit('user_list', onlineUsers);
          io.emit('user_left', { username: user.username, id: socket.id });
          console.log(`${user.username} left the chat`);
        }
      } catch (error) {
        console.error('Error handling disconnect:', error);
      }
    });
  });
};

module.exports = initializeSocketHandlers;
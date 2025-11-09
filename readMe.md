Socket.io Real-Time Chat Application
A modern, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io. Features live messaging, multiple chat rooms, private messaging, and real-time notifications.

https://img.shields.io/badge/React-18.2.0-blue https://img.shields.io/badge/Socket.io-4.7.2-green https://img.shields.io/badge/Tailwind-CSS-38B2AC

🚀 Features
Core Features
✅ Real-time Messaging - Instant message delivery using Socket.io

✅ User Authentication - Simple username-based authentication

✅ Multiple Chat Rooms - Join different conversation spaces

✅ Private Messaging - One-on-one private conversations

✅ Online User Status - See who's currently online in real-time

Advanced Features
Typing Indicators - See when other users are typing

Read Receipts - Know when your messages are read

Real-time Notifications - Get notified of new messages and user activities

Responsive Design - Works seamlessly on desktop and mobile devices

🛠 Tech Stack
Frontend
React 18 - Modern React with hooks

Vite - Fast build tool and dev server

Tailwind CSS - Utility-first CSS framework

Socket.io Client - Real-time communication

React Router DOM - Client-side routing

Backend
Node.js - Runtime environment

Express.js - Web framework

Socket.io - Real-time bidirectional communication

MongoDB - NoSQL database

Mongoose - MongoDB object modeling

📁 Project Structure
text
socketio-chat/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ChatRoom.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── UserList.jsx
│   │   │   ├── TypingIndicator.jsx
│   │   │   └── Notification.jsx
│   │   ├── context/       # React context providers
│   │   │   ├── SocketContext.jsx
│   │   │   └── socketContext.js
│   │   ├── pages/         # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── ChatPage.jsx
│   │   ├── socket/        # Socket.io client setup
│   │   │   └── socket.js
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Application entry point
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   │   └── db.js
│   ├── models/           # MongoDB models
│   │   ├── User.js
│   │   └── Message.js
│   ├── socket/           # Socket.io server setup
│   │   └── socketHandlers.js
│   ├── server.js         # Main server file
│   └── package.json
└── README.md
⚡ Quick Start
Prerequisites
Node.js (v16 or higher)

MongoDB (local installation or MongoDB Atlas)

npm or yarn

Installation
Clone the repository

bash
git clone <repository-url>
cd socketio-chat
Setup Backend

bash
cd server
npm install
Setup Frontend

bash
cd ../client
npm install
Environment Configuration

Create server/.env:

env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/socketio-chat
NODE_ENV=development
Create client/.env:

env
VITE_SOCKET_URL=http://localhost:5000
Running the Application
Start MongoDB (if using local instance)

bash
mongod
Start the Backend Server

bash
cd server
npm run dev
Server will run on http://localhost:5000

Start the Frontend Development Server

bash
cd client
npm run dev
Client will run on http://localhost:5173

Access the Application
Open http://localhost:5173 in your browser

🎯 Usage Guide
Getting Started
Join the Chat: Open the application and enter a username (minimum 3 characters)

Send Messages: Type in the input field and press Enter or click Send

Switch Rooms: Use the sidebar to switch between different chat rooms

Private Messages: Click the "PM" button next to any user to send a private message

See Online Users: View all online users in the sidebar

Features in Detail
Real-time Messaging
Messages are delivered instantly to all users in the same room

Messages are persisted in MongoDB

Supports emojis and special characters

Multiple Chat Rooms
General: Default room for general discussions

Random: For casual conversations

Tech: Technology-related discussions

Gaming: Gaming topics and discussions

Private Messaging
Send one-on-one messages to any online user

Private messages are indicated with a lock icon 🔒

Only the sender and recipient can see private messages

Typing Indicators
See when other users are typing in the same room

Real-time updates without page refresh

Shows username(s) of typing users

User Presence
Real-time online/offline status

Automatic user list updates

Join/leave notifications

🔌 API Endpoints
REST API
Method	Endpoint	Description
GET	/api/messages	Get all messages (limited to 100)
GET	/api/users	Get all online users
GET	/	Server status check
Socket Events
Client to Server Events
user_join - Join the chat with username

send_message - Send a new message to a room

private_message - Send a private message to specific user

typing - Start/stop typing indicator

join_room - Join a specific chat room

message_read - Mark message as read

Server to Client Events
receive_message - Receive new message in room

private_message - Receive private message

user_list - Updated list of online users

user_joined - User joined notification

user_left - User left notification

user_typing - User started typing

user_stop_typing - User stopped typing

room_joined - Successfully joined room

new_message_notification - New message alert

🗄 Database Models
User Model
javascript
{
  username: String,      // Unique username
  socketId: String,      // Current socket connection ID
  isOnline: Boolean,     // Online status
  lastSeen: Date         // Last activity timestamp
}
Message Model
javascript
{
  sender: String,        // Sender's username
  senderId: String,      // Sender's socket ID
  message: String,       // Message content
  isPrivate: Boolean,    // Private message flag
  recipient: String,     // Recipient username (for private messages)
  room: String,          // Room name
  read: Boolean,         // Read status
  createdAt: Date        // Message timestamp
}
🎨 UI Components
Main Components
ChatRoom: Main chat interface with messages and input

Message: Individual message display with styling

UserList: Sidebar with online users and room selection

TypingIndicator: Shows when users are typing

Notification: Toast notifications for system events

Pages
HomePage: Landing page with project information

LoginPage: Username entry and authentication

ChatPage: Main chat application interface

🔧 Development
Scripts
Client Scripts
bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
Server Scripts
bash
npm start           # Start production server
npm run dev         # Start development server with nodemon
Adding New Features
New Socket Events:

Add event handler in server/socket/socketHandlers.js

Add event listener in client/src/socket/socket.js

Update context and components as needed

New UI Components:

Create component in client/src/components/

Export from appropriate index files

Import and use in pages

New Database Models:

Create model in server/models/

Update relevant controllers and routes

🚨 Troubleshooting
Common Issues
Connection Issues

Ensure both client and server are running

Check environment variables

Verify MongoDB connection

Socket Events Not Working

Check event names match between client and server

Verify socket connection status

Check browser console for errors

Messages Not Persisting

Verify MongoDB is running

Check database connection string

Review Mongoose model definitions

Debug Mode
Enable debug logging by setting:

env
NODE_ENV=development
📱 Browser Support
Chrome 90+

Firefox 88+

Safari 14+

Edge 90+

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow React best practices

Use meaningful component and variable names

Add comments for complex logic

Ensure responsive design

Test across different browsers

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Socket.io for real-time communication

Tailwind CSS for styling

Vite for fast development

MongoDB for database

React for UI framework

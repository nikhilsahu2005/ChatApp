# 💬 Real-Time Chat Application

A real-time chat application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** and **Socket.IO**. It enables users to communicate instantly through a responsive interface with real-time messaging and online user status.

## 🚀 Features

- 🔐 **User Authentication** – Secure user registration and login.
- 💬 **Real-Time Messaging** – Send and receive messages instantly using Socket.IO.
- 🟢 **Online User Status** – See which users are currently online.
- 🔔 **Real-Time Notifications** – Get notified when new messages arrive.
- 👥 **User Management** – View available users and start conversations.
- 📱 **Responsive UI** – Clean and user-friendly interface.
- ⚡ **Real-Time Communication** – Instant updates without refreshing the page.

## 🛠️ Tech Stack

**Frontend:**
- React.js
- JavaScript
- HTML5
- CSS3
- Axios

**Backend:**
- Node.js
- Express.js
- Socket.IO

**Database:**
- MongoDB
- Mongoose

**Tools:**
- Git & GitHub
- VS Code
- Postman
- npm

## 📂 Project Structure

```text
ChatApp/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── utils/
│       └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── socket/
│   ├── config/
│   └── index.js
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ChatApp
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=4005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The application will run locally using the Vite development server.

## 🔄 How It Works

1. Users register or log in to the application.
2. The backend handles authentication and database operations.
3. Users can view other registered users.
4. Socket.IO establishes real-time communication between connected users.
5. Messages are delivered instantly and stored in MongoDB.
6. Online user status is updated through socket connections.

## 📸 Screenshots

Add your application screenshots here.

```markdown
![Login Page](screenshots/login.png)
![Chat Dashboard](screenshots/dashboard.png)
![Chat Interface](screenshots/chat.png)
```

## 🔮 Future Improvements

- Group Chat Functionality
- Image and File Sharing
- Message Read Receipts
- Typing Indicators
- Voice and Video Calling
- Message Search Functionality

## 👨‍💻 Author

**Nikhil Sahu**

Final Year B.Tech Student | NIT Agartala
---

⭐ If you like this project, consider giving it a star!

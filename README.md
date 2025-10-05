# Real-Time Chat Application

A real-time chat app built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **Socket.io** for instant messaging.

---

## Features
- Real-time one-to-one and group chat  
- User authentication (Login / Register)  
- Online/offline user status  
- Message notifications  
- Responsive UI  

---

## Tech Stack
- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** MongoDB + Mongoose  
- **Real-time:** Socket.io  
- **Auth:** JWT  

---

## Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/ThilinaJayamal/Real-Time-Chat-application.git
cd Real-Time-Chat-application
```

### 2️⃣ Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 3️⃣ Add environment variables  
Create a `.env` file in the **server** folder:
```
MONGODB_URI=
JWT_SECRET=
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET_KEY=

```

### 4️⃣ Run the app
```bash
# Run backend
cd server
npm run dev

# Run frontend
cd client
npm run dev
```

---

## 📡 How It Works
- Backend uses Express & Socket.io for real-time communication  
- Frontend connects through sockets to send/receive messages instantly  
- Messages and user data are stored in MongoDB  

---

## 📜 License
This project is open source and available under the [MIT License](LICENSE).

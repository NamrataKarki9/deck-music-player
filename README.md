# 🎵 Deck – Full-Stack Music Player

Deck is a full-stack music player built with **React**, **Node.js**, and **Express.js** that demonstrates how fundamental data structures can power real-world applications. The application provides playlist management, music playback, song queuing, listening history, and a collaborative Party Mode, while exposing functionality through a RESTful API.

The project showcases the practical application of custom implementations of linked lists, queues, heaps, and stacks within a modern web application.

---

## 🚀 Features

- Browse and search songs
- Create and manage playlists
- Queue songs to play next
- Vote for songs in Party Mode
- Music playback controls
  - Play
  - Pause
  - Resume
  - Stop
  - Next / Previous
- View listening history
- Filter songs by artist
- RESTful backend API
- Browser audio streaming using the HTML5 Audio API

---

## 🏗 Architecture

```
            React Frontend
                  │
          REST API Requests
                  │
          Express.js Server
                  │
     ┌────────────┼────────────┐
     │            │            │
 Playlist      Queue      Party Mode
Linked List     Queue      Max Heap
     │            │            │
     └────────────┼────────────┘
                  │
          Playback Controller
                  │
          Listening History
                Stack
```

Playback priority:

```
Party Mode
      ↓
Play Next Queue
      ↓
Playlist
```

---

## 📚 Data Structures

| Feature | Data Structure | Purpose |
|----------|---------------|----------|
| Playlist | Doubly Linked List | Efficient insertion, deletion, and navigation |
| Play Next | FIFO Queue | Maintains queued playback order |
| Party Mode | Binary Max Heap | Prioritizes songs by votes |
| Listening History | Stack | Stores recently played songs |

---

## 💻 Tech Stack

### Frontend

- React
- Vite
- JavaScript (ES6)
- HTML5 Audio API
- CSS

### Backend

- Node.js
- Express.js

### Tools

- Git
- npm

---

## 📁 Project Structure

```text
Deck/
│
├── client/
│   ├── src/
│   ├── App.jsx
│   ├── api.js
│   └── package.json
│
├── server/
│   ├── dsa.js
│   ├── index.js
│   ├── songs.json
│   ├── songs/
│   └── package.json
│
├── README.md
├── package.json
└── .gitignore
```

---

## ⚙ Installation

Clone the repository

```bash
git clone https://github.com/your-username/deck.git
cd deck
```

Install backend dependencies

```bash
cd server
npm install
```

Install frontend dependencies

```bash
cd ../client
npm install
```

---

## ▶ Running the Project

Start the backend

```bash
cd server
npm run dev
```

Backend

```
http://localhost:5175
```

Start the frontend

```bash
cd client
npm run dev
```

Frontend

```
http://localhost:5173
```

---

## 🎵 Adding Songs

Place audio files inside

```
server/songs/
```

Supported formats

- MP3
- WAV
- FLAC
- OGG
- M4A

Edit

```
server/songs.json
```

to customize song titles and artist information.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/library` | Retrieve all songs |
| GET | `/api/library?artist=` | Filter by artist |
| GET | `/api/playlist` | Retrieve playlist |
| POST | `/api/playlist/add` | Add song |
| POST | `/api/playlist/remove` | Remove song |
| GET | `/api/queue` | Retrieve queue |
| POST | `/api/queue/add` | Queue song |
| GET | `/api/party` | Retrieve party queue |
| POST | `/api/party/add` | Add party song |
| POST | `/api/party/vote` | Vote song |
| GET | `/api/history` | Listening history |
| POST | `/api/player/play` | Play |
| POST | `/api/player/pause` | Pause |
| POST | `/api/player/resume` | Resume |
| POST | `/api/player/stop` | Stop |
| POST | `/api/player/next` | Next |
| POST | `/api/player/prev` | Previous |
| GET | `/api/player/state` | Playback state |

---

## ✨ Key Highlights

- Full-stack application using React and Express.js
- RESTful API architecture
- Custom implementations of linked lists, queues, heaps, and stacks
- Modular frontend with reusable React components
- Browser-based music streaming
- Priority-based playback using a Binary Max Heap
- Playlist and playback management
- Dynamic artist filtering and search

---

## 🚀 Future Improvements

- User authentication
- Persistent database storage
- Playlist sharing
- User favorites
- Shuffle and repeat modes
- Album artwork support
- Real-time collaborative Party Mode using WebSockets
- Docker deployment

---

## 📄 License

This project is intended for educational and portfolio purposes.
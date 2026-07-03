# Deck — Web-Based Music Player Powered by Data Structures

Deck is a full-stack web application built on top of a command-line music player originally developed as a **Data Structures and Algorithms (DSA)** project. While the user interface has evolved from a console application to a modern web application, the underlying algorithms and data structures remain unchanged.

The project demonstrates how fundamental data structures such as linked lists, queues, heaps, and stacks can be applied in a real-world application to manage music playback, playlists, history, and song prioritization.

---

## Overview

The application allows users to:

* Browse and search songs
* Create and manage playlists
* Queue songs to play next
* Vote for songs in Party Mode
* Control music playback (Play, Pause, Resume, Stop, Next, Previous)
* View listening history
* Filter songs by artist

Audio is streamed through the browser using the native HTML5 Audio API, while the server maintains the playback session and application state.

---

## Data Structures Used

| Feature           | Data Structure     | Purpose                                                     |
| ----------------- | ------------------ | ----------------------------------------------------------- |
| Playlist          | Doubly Linked List | Efficient insertion, deletion, and bidirectional navigation |
| Play Next Queue   | FIFO Queue         | Maintains songs in the order they are queued                |
| Party Mode        | Binary Max Heap    | Prioritizes songs based on vote count                       |
| Listening History | Stack              | Stores recently played songs in LIFO order                  |

The playback priority follows the original CLI implementation:

**Party Mode → Play Next Queue → Playlist**

---

## Technology Stack

### Frontend

* React
* Vite
* CSS
* HTML5 Audio API

### Backend

* Node.js
* Express.js

### Language

* JavaScript (ES6)

---

## Project Structure

```text
Deck/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── icons.jsx
│   └── package.json
│
├── server/
│   ├── dsa.js
│   ├── index.js
│   ├── songs.json
│   ├── songs/          (Git ignored)
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/deck.git
cd deck
```

### 2. Install Dependencies

Backend

```bash
cd server
npm install
```

Frontend

```bash
cd ../client
npm install
```

---

## Adding Songs

Place audio files inside:

```text
server/songs/
```

Supported formats include:

* MP3
* WAV
* OGG
* M4A
* FLAC

The repository intentionally excludes audio files through `.gitignore`.

To provide custom song titles and artist information, edit:

```text
server/songs.json
```

Example:

```json
{
  "shape.mp3": {
    "title": "Shape of You",
    "artist": "Ed Sheeran"
  }
}
```

Files not listed in `songs.json` automatically use the filename as the title and **Unknown Artist** as the default artist.

---

## Running the Application

Start the backend server:

```bash
cd server
npm run dev
```

Backend:

```text
http://localhost:5175
```

Open a second terminal and start the frontend:

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Open the frontend URL in your browser.

---

## API Endpoints

| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| GET    | `/api/library`         | Retrieve all songs              |
| GET    | `/api/library?artist=` | Filter songs by artist          |
| GET    | `/api/playlist`        | Retrieve playlist               |
| POST   | `/api/playlist/add`    | Add song to playlist            |
| POST   | `/api/playlist/remove` | Remove song from playlist       |
| GET    | `/api/queue`           | Retrieve play-next queue        |
| POST   | `/api/queue/add`       | Add song to queue               |
| POST   | `/api/queue/remove`    | Remove song from queue          |
| GET    | `/api/party`           | Retrieve party queue            |
| POST   | `/api/party/add`       | Add song to party queue         |
| POST   | `/api/party/vote`      | Vote for a song                 |
| GET    | `/api/history`         | Retrieve listening history      |
| POST   | `/api/player/play`     | Play a song                     |
| POST   | `/api/player/pause`    | Pause playback                  |
| POST   | `/api/player/resume`   | Resume playback                 |
| POST   | `/api/player/stop`     | Stop playback                   |
| POST   | `/api/player/next`     | Play the next song              |
| POST   | `/api/player/prev`     | Play the previous song          |
| GET    | `/api/player/state`    | Retrieve current playback state |

---

## Key Implementation Details

* Preserves the original DSA implementations from the command-line version.
* Uses custom implementations of linked lists, queues, heaps, and stacks.
* Maintains application state entirely in memory.
* Streams audio using the HTML5 Audio element.
* Implements a RESTful API using Express.js.
* Organizes the frontend into reusable React components.
* Automatically extracts song metadata when no custom mapping exists.

---

## Educational Objective

This project demonstrates how classical data structures can be integrated into a modern full-stack web application. It bridges theoretical concepts from Data Structures and Algorithms with practical software engineering by applying custom implementations of linked lists, queues, heaps, and stacks to solve real application problems.

---

## License

This project is intended for educational purposes. Feel free to modify and extend it for learning or personal use.

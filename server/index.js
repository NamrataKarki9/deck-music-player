const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { Playlist, PlayNextQueue, PartyQueue, History } = require("./dsa");

const app = express();
app.use(cors());
app.use(express.json());

const SONGS_DIR = path.join(__dirname, "songs");
const METADATA_PATH = path.join(__dirname, "songs.json");
const AUDIO_EXT = new Set([".mp3", ".wav", ".ogg", ".m4a", ".flac"]);

// -------------------------------
// Library: scan songs/ the same way the notebook did with os.listdir("songs")
// -------------------------------
function idFromFilename(filename) {
  return crypto.createHash("md5").update(filename).digest("hex").slice(0, 10);
}

function titleFromFilename(filename) {
  const base = filename.replace(path.extname(filename), "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function loadLibrary() {
  let metadata = {};
  try {
    metadata = JSON.parse(fs.readFileSync(METADATA_PATH, "utf-8"));
  } catch {
    metadata = {};
  }

  if (!fs.existsSync(SONGS_DIR)) fs.mkdirSync(SONGS_DIR, { recursive: true });

  const files = fs
    .readdirSync(SONGS_DIR)
    .filter((f) => AUDIO_EXT.has(path.extname(f).toLowerCase()))
    .sort();

  return files.map((filename) => {
    const meta = metadata[filename] || {};
    return {
      id: idFromFilename(filename),
      filename,
      title: meta.title || titleFromFilename(filename),
      artist: meta.artist || "Unknown Artist",
      url: `/songs/${encodeURIComponent(filename)}`,
    };
  });
}

// -------------------------------
// In-memory state — same shape as the notebook's globals
// -------------------------------
const playlist = new Playlist();
const playNextQueue = new PlayNextQueue();
const partyQueue = new PartyQueue();
const history = new History();

let currentSong = null;
let isPaused = false;

function findInLibrary(songId) {
  return loadLibrary().find((s) => s.id === songId) || null;
}

/** Mirrors get_next_song(): party queue > play-next queue > playlist.current.next */
function getNextSong() {
  const fromParty = partyQueue.pop();
  if (fromParty) return fromParty;

  const fromQueue = playNextQueue.dequeue();
  if (fromQueue) return fromQueue;

  return playlist.advance();
}

// -------------------------------
// Routes
// -------------------------------
app.use("/songs", express.static(SONGS_DIR));

app.get("/api/library", (req, res) => {
  const { artist } = req.query;
  const library = loadLibrary();
  if (artist) {
    return res.json(
      library.filter((s) => s.artist.toLowerCase() === String(artist).toLowerCase())
    );
  }
  res.json(library);
});

app.get("/api/playlist", (req, res) => {
  res.json(playlist.toArray());
});

app.post("/api/playlist/add", (req, res) => {
  const song = findInLibrary(req.body.songId);
  if (!song) return res.status(404).json({ error: "Song not found in library." });
  playlist.addSong(song);
  res.json(playlist.toArray());
});

app.post("/api/playlist/remove", (req, res) => {
  playlist.removeSong(req.body.songId);
  res.json(playlist.toArray());
});

app.get("/api/queue", (req, res) => {
  res.json(playNextQueue.toArray());
});

app.post("/api/queue/add", (req, res) => {
  const song = findInLibrary(req.body.songId);
  if (!song) return res.status(404).json({ error: "Song not found in library." });
  playNextQueue.enqueue(song);
  res.json(playNextQueue.toArray());
});

app.post("/api/queue/remove", (req, res) => {
  playNextQueue.remove(req.body.songId);
  res.json(playNextQueue.toArray());
});

app.get("/api/party", (req, res) => {
  res.json(partyQueue.toArray());
});

app.post("/api/party/add", (req, res) => {
  const song = findInLibrary(req.body.songId);
  if (!song) return res.status(404).json({ error: "Song not found in library." });
  const votes = Number(req.body.votes) || 1;
  partyQueue.push(song, votes);
  res.json(partyQueue.toArray());
});

app.post("/api/party/vote", (req, res) => {
  partyQueue.vote(req.body.songId, Number(req.body.delta) || 1);
  res.json(partyQueue.toArray());
});

app.get("/api/history", (req, res) => {
  res.json(history.toArray());
});

// -------------------------------
// Player controls — actual audio playback happens client-side via <audio>;
// these endpoints keep server-side state (current song, pause flag, history)
// in sync with the notebook's play_song / pause_song / resume_song / stop_song.
// -------------------------------
app.post("/api/player/play", (req, res) => {
  let song;
  if (req.body.songId) {
    song = findInLibrary(req.body.songId);
    const inPlaylist = playlist.setCurrentById(req.body.songId);
    if (inPlaylist) song = inPlaylist;
  } else {
    song = getNextSong();
  }
  if (!song) return res.status(404).json({ error: "No song to play." });

  currentSong = song;
  isPaused = false;
  history.push(song);
  res.json({ currentSong, isPaused });
});

app.post("/api/player/pause", (req, res) => {
  if (currentSong && !isPaused) isPaused = true;
  res.json({ currentSong, isPaused });
});

app.post("/api/player/resume", (req, res) => {
  if (currentSong && isPaused) isPaused = false;
  res.json({ currentSong, isPaused });
});

app.post("/api/player/stop", (req, res) => {
  currentSong = null;
  isPaused = false;
  res.json({ currentSong, isPaused });
});

app.post("/api/player/next", (req, res) => {
  const song = getNextSong();
  if (!song) return res.status(404).json({ error: "No next song available." });
  currentSong = song;
  isPaused = false;
  history.push(song);
  res.json({ currentSong, isPaused });
});

app.post("/api/player/prev", (req, res) => {
  const song = playlist.retreat();
  if (!song) return res.status(404).json({ error: "No previous song in playlist." });
  currentSong = song;
  isPaused = false;
  history.push(song);
  res.json({ currentSong, isPaused });
});

app.get("/api/player/state", (req, res) => {
  res.json({ currentSong, isPaused });
});

const PORT = process.env.PORT || 5175;
app.listen(PORT, () => {
  console.log(`Music player API running on http://localhost:${PORT}`);
});

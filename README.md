# Deck — a UI for your CLI music player

This is a proper web UI wired up to the exact logic from your notebook (`DSA__final.ipynb`):

- **Playlist** → doubly linked list (`server/dsa.js` → `Playlist`)
- **Play Next** → FIFO queue (`PlayNextQueue`)
- **Party Mode** → binary max-heap keyed by votes (`PartyQueue`, same idea as `heapq` in the notebook)
- **History** → stack, newest first (`History`)
- **Play / Pause / Resume / Stop / Next / Filter by artist** → same behavior, now buttons instead of menu numbers

No login, no signup — it's the same single-user CLI tool, just with a screen.

Real audio plays in the browser (HTML5 `<audio>`), driven by whatever files you drop into `server/songs`. The Express server holds the same in-memory state the notebook did (current song, pause flag, playlist/queue/party/history) — it's just reachable over HTTP now instead of `input()`.

## 1. Add your songs

Drop mp3 (or wav/ogg/m4a/flac) files into `server/songs/`.

Files named exactly like the notebook's originals get their title/artist for free:

```
shape.mp3     → Shape of You — Ed Sheeran
believer.mp3  → Believer — Imagine Dragons
someone.mp3   → Someone Like You — Adele
numb.mp3      → Numb — Linkin Park
closer.mp3    → Closer — Chainsmokers
```

Any other filename still works — it just gets a title guessed from the filename (`morning_drive.mp3` → "Morning Drive") and "Unknown Artist". You can fix that by adding an entry to `server/songs.json`:

```json
{
  "your-file.mp3": { "title": "Track Title", "artist": "Artist Name" }
}
```

## 2. Install

```bash
cd server && npm install
cd ../client && npm install
```

## 3. Run

Two terminals:

```bash
# terminal 1
cd server
npm run dev      # API + audio files on http://localhost:5175

# terminal 2
cd client
npm run dev      # UI on http://localhost:5173
```

Open **http://localhost:5173**.

## Project structure

```
server/
  index.js     Express API — one route per CLI menu option
  dsa.js       Playlist (linked list), queue, heap, history
  songs.json   filename → {title, artist} lookup
  songs/       put your audio files here
client/
  src/
    App.jsx              state + wiring
    api.js                fetch wrapper for the server
    components/
      Sidebar.jsx
      Library.jsx         browse + search + add to playlist/queue/party
      PlaylistView.jsx
      QueueView.jsx
      PartyView.jsx        vote tracks up/down
      HistoryView.jsx
      PlayerBar.jsx        real audio playback, transport, seek, volume
```

## Notes

- Party mode voting re-sorts the heap after every vote — small n, so this trades a little
  efficiency for clarity, same spirit as the notebook.
- "Previous track" walks the playlist's `prev` pointer (the linked list already had it, the
  original CLI menu just never exposed it).
- If the UI shows "Can't reach the server," start `server` first.

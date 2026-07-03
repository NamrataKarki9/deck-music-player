import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import Sidebar from "./components/Sidebar";
import Library from "./components/Library";
import PlaylistView from "./components/PlaylistView";
import QueueView from "./components/QueueView";
import PartyView from "./components/PartyView";
import HistoryView from "./components/HistoryView";
import PlayerBar from "./components/PlayerBar";

export default function App() {
  const [tab, setTab] = useState("library");
  const [library, setLibrary] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [queue, setQueue] = useState([]);
  const [party, setParty] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [toast, setToast] = useState(null);
  const [connectionError, setConnectionError] = useState(false);

  const notify = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast((t) => (t === msg ? null : t)), 2200);
  }, []);

  const refresh = useCallback(async () => {
    try {
      const [lib, pl, q, pt, hist, state] = await Promise.all([
        api.getLibrary(),
        api.getPlaylist(),
        api.getQueue(),
        api.getParty(),
        api.getHistory(),
        api.getState(),
      ]);
      setLibrary(lib);
      setPlaylist(pl);
      setQueue(q);
      setParty(pt);
      setHistory(hist);
      setCurrentSong(state.currentSong);
      setIsPaused(state.isPaused);
      setConnectionError(false);
    } catch {
      setConnectionError(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handlePlay = async (song) => {
    try {
      const state = await api.play(song.id);
      setCurrentSong(state.currentSong);
      setIsPaused(false);
      const [pl, hist] = await Promise.all([api.getPlaylist(), api.getHistory()]);
      setPlaylist(pl);
      setHistory(hist);
    } catch (e) {
      notify(e.message);
    }
  };

  const handleTogglePlay = async () => {
    if (!currentSong) return;
    try {
      const state = isPaused ? await api.resume() : await api.pause();
      setIsPaused(state.isPaused);
    } catch (e) {
      notify(e.message);
    }
  };

  const handleNext = async () => {
    try {
      const state = await api.next();
      setCurrentSong(state.currentSong);
      setIsPaused(false);
      const [q, pt, pl, hist] = await Promise.all([
        api.getQueue(),
        api.getParty(),
        api.getPlaylist(),
        api.getHistory(),
      ]);
      setQueue(q);
      setParty(pt);
      setPlaylist(pl);
      setHistory(hist);
    } catch (e) {
      notify("Queue and playlist are empty — nothing left to play.");
    }
  };

  const handlePrev = async () => {
    try {
      const state = await api.prev();
      setCurrentSong(state.currentSong);
      setIsPaused(false);
      const [pl, hist] = await Promise.all([api.getPlaylist(), api.getHistory()]);
      setPlaylist(pl);
      setHistory(hist);
    } catch (e) {
      notify(e.message);
    }
  };

  const handleAddPlaylist = async (song) => {
    setPlaylist(await api.addToPlaylist(song.id));
    notify(`Added "${song.title}" to playlist`);
  };

  const handleRemovePlaylist = async (song) => {
    setPlaylist(await api.removeFromPlaylist(song.id));
  };

  const handleAddQueue = async (song) => {
    setQueue(await api.addToQueue(song.id));
    notify(`Queued "${song.title}"`);
  };

  const handleRemoveQueue = async (song) => {
    setQueue(await api.removeFromQueue(song.id));
  };

  const handleAddParty = async (song) => {
    setParty(await api.addToParty(song.id, 1));
    notify(`"${song.title}" entered party mode`);
  };

  const handleVoteParty = async (song, delta) => {
    setParty(await api.voteParty(song.id, delta));
  };

  const currentPlaylistIndex = playlist.findIndex((s) => s.id === currentSong?.id);
  const hasPrev = currentPlaylistIndex > 0;

  const counts = {
    library: 0,
    playlist: playlist.length,
    queue: queue.length,
    party: party.length,
    history: 0,
  };

  return (
    <div className="app">
      <Sidebar tab={tab} setTab={setTab} counts={counts} />

      <div className="main">
        <div className="main-scroll">
          {connectionError && (
            <div className="empty-state" style={{ marginBottom: 24 }}>
              <p className="empty-title">Can't reach the server</p>
              <p>
                Start it with <code>npm run dev</code> inside <code>server/</code> — it should be
                running on <code>http://localhost:5175</code>.
              </p>
            </div>
          )}

          {tab === "library" && (
            <Library
              library={library}
              currentSong={currentSong}
              onPlay={handlePlay}
              onAddPlaylist={handleAddPlaylist}
              onAddQueue={handleAddQueue}
              onAddParty={handleAddParty}
            />
          )}
          {tab === "playlist" && (
            <PlaylistView
              playlist={playlist}
              currentSong={currentSong}
              onPlay={handlePlay}
              onRemove={handleRemovePlaylist}
            />
          )}
          {tab === "queue" && (
            <QueueView queue={queue} currentSong={currentSong} onRemove={handleRemoveQueue} />
          )}
          {tab === "party" && (
            <PartyView party={party} currentSong={currentSong} onVote={handleVoteParty} />
          )}
          {tab === "history" && <HistoryView history={history} />}
        </div>

        <PlayerBar
          currentSong={currentSong}
          isPaused={isPaused}
          onTogglePlay={handleTogglePlay}
          onNext={handleNext}
          onPrev={handlePrev}
          hasPrev={hasPrev}
        />
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

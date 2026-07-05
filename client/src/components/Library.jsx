import { useMemo, useState } from "react";
import { IconSearch, IconPlus, IconQueue, IconSpark, IconPlay, IconDisc } from "../icons";

export default function Library({ library, onPlay, currentSong, onAddPlaylist, onAddQueue, onAddParty }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return library;
    return library.filter(
      (s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
    );
  }, [library, query]);

  return (
    <>
      <div className="page-head">
        <div>
          <p className="page-eyebrow">Song Library</p>
          <h1 className="page-title">Library</h1>
          <p className="page-desc">
            Every track found in <code>server/songs</code>. Search by title or artist, then
            add tracks to your playlist, the play-next queue, or party mode.
          </p>
        </div>
        <div className="search-box">
          <IconSearch />
          <input
            placeholder="Search title or artist..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {library.length === 0 ? (
        <EmptyLibrary />
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">No matches</p>
          <p>Nothing in the library matches &ldquo;{query}&rdquo;.</p>
        </div>
      ) : (
        <div className="track-list">
          {filtered.map((song, i) => (
            <div
              key={song.id}
              className={`track-row ${currentSong?.id === song.id ? "is-current" : ""}`}
            >
              <div className="index-cell">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <button className="play" onClick={() => onPlay(song)} aria-label={`Play ${song.title}`}>
                  <IconPlay />
                </button>
              </div>
              <div className="track-main">
                <span className="track-title">{song.title}</span>
                <span className="track-artist">{song.artist}</span>
              </div>
              <span className="track-meta">{song.filename.split(".").pop().toUpperCase()}</span>
              <div className="track-actions">
                <button className="icon-btn" title="Add to playlist" onClick={() => onAddPlaylist(song)}>
                  <IconPlus />
                </button>
                <button className="icon-btn" title="Add to play-next queue" onClick={() => onAddQueue(song)}>
                  <IconQueue />
                </button>
                <button className="icon-btn" title="Add to party mode" onClick={() => onAddParty(song)}>
                  <IconSpark />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}



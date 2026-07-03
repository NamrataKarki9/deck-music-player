import { IconPlay, IconTrash, IconLayers } from "../icons";

export default function PlaylistView({ playlist, onPlay, currentSong, onRemove }) {
  return (
    <>
      <div className="page-head">
        <div>
          <p className="page-eyebrow">Doubly Linked List</p>
          <h1 className="page-title">My Playlist</h1>
          <p className="page-desc">
            Songs you've added, in order. Play Next walks this list forward from whichever
            track is current.
          </p>
        </div>
      </div>

      {playlist.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <IconLayers width={26} height={26} />
          </div>
          <p className="empty-title">Playlist is empty</p>
          <p>Add songs from the Library to build your playlist.</p>
        </div>
      ) : (
        <div className="track-list">
          {playlist.map((song, i) => (
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
              <span className="track-meta">{song.isCurrent ? "current" : ""}</span>
              <div className="track-actions">
                <button className="icon-btn danger" title="Remove from playlist" onClick={() => onRemove(song)}>
                  <IconTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

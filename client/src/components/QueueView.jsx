import { IconTrash, IconQueue } from "../icons";

export default function QueueView({ queue, currentSong, onRemove }) {
  return (
    <>
      <div className="page-head">
        <div>
          <p className="page-eyebrow">FIFO Queue</p>
          <h1 className="page-title">Play Next</h1>
          <p className="page-desc">
            First in, first out. When you hit Next, songs here play before the playlist
            continues — and before party mode gives way to them.
          </p>
        </div>
      </div>

      {queue.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <IconQueue width={26} height={26} />
          </div>
          <p className="empty-title">Queue is empty</p>
          <p>Add songs from the Library to line them up next.</p>
        </div>
      ) : (
        <div className="track-list">
          {queue.map((song, i) => (
            <div key={`${song.id}-${i}`} className={`track-row ${currentSong?.id === song.id ? "is-current" : ""}`}>
              <div className="index-cell">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="track-main">
                <span className="track-title">{song.title}</span>
                <span className="track-artist">{song.artist}</span>
              </div>
              <span className="track-meta">{i === 0 ? "up next" : ""}</span>
              <div className="track-actions">
                <button className="icon-btn danger" title="Remove from queue" onClick={() => onRemove(song)}>
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

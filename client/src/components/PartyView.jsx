import { IconChevronUp, IconChevronDown, IconSpark } from "../icons";

export default function PartyView({ party, currentSong, onVote }) {
  return (
    <>
      <div className="page-head">
        <div>
          <p className="page-eyebrow">Priority Heap</p>
          <h1 className="page-title">Party Mode</h1>
          <p className="page-desc">
            Highest votes play first — before the FIFO queue and the playlist. Vote a track up
            to move it toward the top.
          </p>
        </div>
      </div>

      {party.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <IconSpark width={26} height={26} />
          </div>
          <p className="empty-title">No votes yet</p>
          <p>Add songs to party mode from the Library to start voting.</p>
        </div>
      ) : (
        <div className="track-list">
          {party.map((entry, i) => (
            <div
              key={`${entry.song.id}-${i}`}
              className={`track-row ${currentSong?.id === entry.song.id ? "is-current" : ""}`}
            >
              <div className="index-cell">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="track-main">
                <span className="track-title">{entry.song.title}</span>
                <span className="track-artist">{entry.song.artist}</span>
              </div>
              <span className="track-meta">{i === 0 ? "leading" : ""}</span>
              <div className="track-actions">
                <div className="vote-pill">
                  <button className="icon-btn" onClick={() => onVote(entry.song, -1)} aria-label="Downvote">
                    <IconChevronDown />
                  </button>
                  <span className="vote-count">{entry.votes}</span>
                  <button className="icon-btn accent" onClick={() => onVote(entry.song, 1)} aria-label="Upvote">
                    <IconChevronUp />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

import { IconClock } from "../icons";

function timeAgo(ts) {
  const diff = Math.max(0, Date.now() - ts);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}h ago`;
}

export default function HistoryView({ history }) {
  return (
    <>
      <div className="page-head">
        <div>
          <p className="page-eyebrow">Listening History</p>
          <h1 className="page-title">History</h1>
          <p className="page-desc">Every track played this session, most recent first.</p>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <IconClock width={26} height={26} />
          </div>
          <p className="empty-title">Nothing played yet</p>
          <p>Play a track and it'll show up here.</p>
        </div>
      ) : (
        <div className="track-list">
          {history.map((song, i) => (
            <div key={`${song.id}-${song.playedAt}-${i}`} className="track-row">
              <div className="index-cell">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="track-main">
                <span className="track-title">{song.title}</span>
                <span className="track-artist">{song.artist}</span>
              </div>
              <span className="track-meta">{timeAgo(song.playedAt)}</span>
              <div className="track-actions" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

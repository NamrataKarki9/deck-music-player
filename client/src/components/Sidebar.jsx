import { IconDisc, IconLayers, IconQueue, IconSpark, IconClock } from "../icons";

const TABS = [
  { id: "library", label: "Library", icon: IconDisc },
  { id: "playlist", label: "My Playlist", icon: IconLayers },
  { id: "queue", label: "Play Next", icon: IconQueue },
  { id: "party", label: "Party Mode", icon: IconSpark },
  { id: "history", label: "History", icon: IconClock },
];

export default function Sidebar({ tab, setTab, counts }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <IconDisc width={16} height={16} />
        </div>
        <div>
          <div className="brand-name">Deck</div>
          <div className="brand-sub">Console Player</div>
        </div>
      </div>

      <nav className="nav">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`nav-item ${tab === id ? "active" : ""}`}
            onClick={() => setTab(id)}
          >
            <Icon width={16} height={16} />
            <span>{label}</span>
            {counts[id] > 0 && <span className="count">{counts[id]}</span>}
          </button>
        ))}
      </nav>

      {/* <div className="sidebar-foot">
        songs/ &rarr; drop files
        <br />
        server on :5175
      </div> */}
    </aside>
  );
}

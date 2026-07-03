const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${path}`);
  }
  return res.json();
}

export const api = {
  getLibrary: (artist) => request(`/library${artist ? `?artist=${encodeURIComponent(artist)}` : ""}`),
  getPlaylist: () => request("/playlist"),
  addToPlaylist: (songId) => request("/playlist/add", { method: "POST", body: JSON.stringify({ songId }) }),
  removeFromPlaylist: (songId) => request("/playlist/remove", { method: "POST", body: JSON.stringify({ songId }) }),

  getQueue: () => request("/queue"),
  addToQueue: (songId) => request("/queue/add", { method: "POST", body: JSON.stringify({ songId }) }),
  removeFromQueue: (songId) => request("/queue/remove", { method: "POST", body: JSON.stringify({ songId }) }),

  getParty: () => request("/party"),
  addToParty: (songId, votes = 1) => request("/party/add", { method: "POST", body: JSON.stringify({ songId, votes }) }),
  voteParty: (songId, delta) => request("/party/vote", { method: "POST", body: JSON.stringify({ songId, delta }) }),

  getHistory: () => request("/history"),

  play: (songId) => request("/player/play", { method: "POST", body: JSON.stringify(songId ? { songId } : {}) }),
  pause: () => request("/player/pause", { method: "POST" }),
  resume: () => request("/player/resume", { method: "POST" }),
  stop: () => request("/player/stop", { method: "POST" }),
  next: () => request("/player/next", { method: "POST" }),
  prev: () => request("/player/prev", { method: "POST" }),
  getState: () => request("/player/state"),
};

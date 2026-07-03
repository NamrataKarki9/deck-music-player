/**
 * Core data structures — direct ports of the logic in DSA__final.ipynb.
 * Playlist:    doubly linked list, with a `current` pointer (as in the notebook)
 * PlayNextQueue: FIFO queue (array-backed, same as the notebook's list-as-queue)
 * PartyQueue:  binary max-heap keyed by votes (heapq in the notebook used
 *              negative votes for a max-heap; this is a real binary heap)
 * History:     stack, newest first on read (notebook used reversed(list))
 */

class PlaylistNode {
  constructor(song) {
    this.song = song;
    this.next = null;
    this.prev = null;
  }
}

class Playlist {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
  }

  addSong(song) {
    const node = new PlaylistNode(song);
    if (!this.head) {
      this.head = this.tail = this.current = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    return node;
  }

  removeSong(songId) {
    let node = this.head;
    while (node) {
      if (node.song.id === songId) {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;
        if (this.current === node) this.current = node.next || node.prev || null;
        return true;
      }
      node = node.next;
    }
    return false;
  }

  toArray() {
    const out = [];
    let node = this.head;
    while (node) {
      out.push({ ...node.song, isCurrent: node === this.current });
      node = node.next;
    }
    return out;
  }

  advance() {
    if (this.current) {
      this.current = this.current.next;
      return this.current ? this.current.song : null;
    }
    return null;
  }

  retreat() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      return this.current.song;
    }
    return null;
  }

  setCurrentById(songId) {
    let node = this.head;
    while (node) {
      if (node.song.id === songId) {
        this.current = node;
        return node.song;
      }
      node = node.next;
    }
    return null;
  }
}

/** FIFO "play next" queue — mirrors play_next_queue.append / .pop(0) */
class PlayNextQueue {
  constructor() {
    this.items = [];
  }
  enqueue(song) {
    this.items.push(song);
  }
  dequeue() {
    return this.items.shift() || null;
  }
  remove(songId) {
    const idx = this.items.findIndex((s) => s.id === songId);
    if (idx !== -1) this.items.splice(idx, 1);
  }
  toArray() {
    return [...this.items];
  }
}

/** Binary max-heap keyed by votes — mirrors heapq.heappush(queue, (-votes, song)) */
class PartyQueue {
  constructor() {
    this.heap = []; // {votes, song}
  }
  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  push(song, votes) {
    this.heap.push({ votes, song });
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent].votes < this.heap[i].votes) {
        this._swap(parent, i);
        i = parent;
      } else break;
    }
  }
  pop() {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        let largest = i;
        if (l < this.heap.length && this.heap[l].votes > this.heap[largest].votes) largest = l;
        if (r < this.heap.length && this.heap[r].votes > this.heap[largest].votes) largest = r;
        if (largest === i) break;
        this._swap(i, largest);
        i = largest;
      }
    }
    return top.song;
  }
  vote(songId, delta) {
    const entry = this.heap.find((e) => e.song.id === songId);
    if (entry) entry.votes += delta;
    // re-heapify from scratch (small N, simplicity over micro-optimisation)
    const entries = [...this.heap];
    this.heap = [];
    entries.sort((a, b) => b.votes - a.votes);
    entries.forEach((e) => this.push(e.song, e.votes));
  }
  toArray() {
    return [...this.heap].sort((a, b) => b.votes - a.votes);
  }
}

/** Listening history — stack, newest first on read */
class History {
  constructor() {
    this.items = [];
  }
  push(song) {
    this.items.push({ ...song, playedAt: Date.now() });
  }
  toArray() {
    return [...this.items].reverse();
  }
}

module.exports = { Playlist, PlayNextQueue, PartyQueue, History };

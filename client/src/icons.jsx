const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconPlay = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M7 4.5v15l13-7.5-13-7.5z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPause = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <rect x="6" y="4.5" width="4" height="15" fill="currentColor" stroke="none" />
    <rect x="14" y="4.5" width="4" height="15" fill="currentColor" stroke="none" />
  </svg>
);

export const IconPrev = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M19 5v14L8 12l11-7z" fill="currentColor" stroke="none" />
    <rect x="4.5" y="5" width="2" height="14" fill="currentColor" stroke="none" />
  </svg>
);

export const IconNext = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M5 5v14l11-7L5 5z" fill="currentColor" stroke="none" />
    <rect x="17.5" y="5" width="2" height="14" fill="currentColor" stroke="none" />
  </svg>
);

export const IconStop = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <rect x="5" y="5" width="14" height="14" fill="currentColor" stroke="none" />
  </svg>
);

export const IconVolume = (p) => (
  <svg viewBox="0 0 24 24" width="17" height="17" {...base} {...p}>
    <path d="M4 9.5v5h4l5 4v-13l-5 4H4z" fill="currentColor" stroke="none" />
    <path d="M16.5 9a4.5 4.5 0 010 6" />
    <path d="M19 6.5a8 8 0 010 11" />
  </svg>
);

export const IconSearch = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M20 20l-4.8-4.8" />
  </svg>
);

export const IconPlus = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconTrash = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" {...base} {...p}>
    <path d="M5 7h14M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-8 0l1 12a1 1 0 001 1h6a1 1 0 001-1l1-12" />
  </svg>
);

export const IconChevronUp = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...base} {...p}>
    <path d="M6 15l6-6 6 6" />
  </svg>
);

export const IconChevronDown = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const IconDisc = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
  </svg>
);

export const IconLayers = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M12 3l9 4.8-9 4.8-9-4.8L12 3z" />
    <path d="M3 13.2L12 18l9-4.8" />
  </svg>
);

export const IconQueue = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M4 6h12M4 12h12M4 18h8" />
    <circle cx="19" cy="6" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconSpark = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z" />
  </svg>
);

export const IconClock = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

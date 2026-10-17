// أيقونات SVG مضمّنة. الأيقونات الاتجاهية (Prev/Next) مرسومة لاتجاه RTL:
// «التالي» يشير إلى اليسار و«السابق» إلى اليمين. لا تستعملها في سياق LTR.
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const IconHome = () => (
  <svg {...base}>
    <path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" />
  </svg>
);
export const IconPen = () => (
  <svg {...base}>
    <path d="M4 20l4-1L19 8l-3-3L5 16l-1 4zM14 7l3 3" />
  </svg>
);
export const IconTimer = () => (
  <svg {...base}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l3 2M9 2h6" />
  </svg>
);
export const IconWheel = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
  </svg>
);
export const IconTeacher = () => (
  <svg {...base}>
    <path d="M2 8l10-4 10 4-10 4L2 8z" />
    <path d="M6 10v5c0 2 12 2 12 0v-5" />
  </svg>
);
export const IconSound = ({ muted }: { muted: boolean }) => (
  <svg {...base}>
    <path d="M4 9h4l5-4v14l-5-4H4z" />
    {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M16.5 9a4 4 0 010 6" />}
  </svg>
);
export const IconFull = () => (
  <svg {...base} strokeWidth={2.4}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);
/** اتجاهية: للسابق في RTL */
export const IconPrevRtl = () => (
  <svg {...base} strokeWidth={3}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
/** اتجاهية: للتالي في RTL */
export const IconNextRtl = () => (
  <svg {...base} strokeWidth={3}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
export const IconReset = () => (
  <svg {...base}>
    <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
export const IconEraser = () => (
  <svg {...base}>
    <path d="M7 21l-4.3-4.3a2.4 2.4 0 0 1 0-3.4l9.6-9.6a2.4 2.4 0 0 1 3.4 0l5.6 5.6a2.4 2.4 0 0 1 0 3.4L13 21" />
    <path d="M22 21H7M5 11l9 9" />
  </svg>
);
export const IconStar = () => (
  <svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 2l3 6.6 7 .7-5.3 4.8 1.6 7L12 17.5 5.7 21l1.6-7L2 9.3l7-.7z" />
  </svg>
);

// ── components/Avatar.jsx ─────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "#2563eb", // blue-600
  "#4f46e5", // indigo-600
  "#7c3aed", // violet-600
  "#9333ea", // purple-600
  "#db2777", // pink-600
  "#e11d48", // rose-600
  "#f97316", // orange-500
  "#f59e0b", // amber-500
  "#059669", // emerald-600
  "#0d9488", // teal-600
  "#0891b2", // cyan-600
  "#0284c7", // sky-600
];

const getAvatarColor = (name = "") => {
  if (!name) return AVATAR_COLORS[0];
  const code = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
};

const getInitials = (name = "") => {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
};

const SIZE_MAP = {
  xs: { wrapper: "w-7 h-7",   text: "text-[10px]", dot: "w-2 h-2 border" },
  sm: { wrapper: "w-9 h-9",   text: "text-xs",     dot: "w-2.5 h-2.5 border" },
  md: { wrapper: "w-11 h-11", text: "text-sm",     dot: "w-3 h-3 border-2" },
  lg: { wrapper: "w-14 h-14", text: "text-base",   dot: "w-3.5 h-3.5 border-2" },
  xl: { wrapper: "w-20 h-20", text: "text-xl",     dot: "w-4 h-4 border-2" },
};

/**
 * Avatar — initials only, no image support.
 *
 * Props:
 *  name     {string}  — full name or username  (e.g. "John Doe" or "alexj")
 *  size     {string}  — "xs" | "sm" | "md" | "lg" | "xl"  (default "md")
 *  online   {boolean} — show green online dot
 *  className {string} — extra Tailwind classes
 *  onClick  {function} — callback for click event
 */
const Avatar = ({ name = "", size = "md", online = false, className = "", onClick }) => {
  const { wrapper, text, dot } = SIZE_MAP[size] || SIZE_MAP.md;
  const initials = getInitials(name);
  const bgColor  = getAvatarColor(name);

  return (
    <div className={`relative inline-flex shrink-0 ${className}`} onClick={onClick}>
      <div
        className={`${wrapper} rounded-full flex items-center justify-center font-bold text-white select-none`}
        style={{ backgroundColor: bgColor }}
      >
        <span className={`${text} leading-none`}>{initials}</span>
      </div>

      {online && (
        <span
          className={`absolute top-0 right-0 ${dot} rounded-full bg-emerald-400 border-gray-900`}
        />
      )}
    </div>
  );
};

export default Avatar;
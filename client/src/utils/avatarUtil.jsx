// ── utils/avatarUtils.js ──────────────────────────────────────────────────────
// Generates a 2-letter initial + consistent color from any username.
// Colors are chosen from a dark-UI-friendly palette (matches gray-900 theme).

const AVATAR_COLORS = [
  { bg: "bg-blue-600",    hex: "#2563eb" },
  { bg: "bg-indigo-600",  hex: "#4f46e5" },
  { bg: "bg-violet-600",  hex: "#7c3aed" },
  { bg: "bg-purple-600",  hex: "#9333ea" },
  { bg: "bg-pink-600",    hex: "#db2777" },
  { bg: "bg-rose-600",    hex: "#e11d48" },
  { bg: "bg-orange-500",  hex: "#f97316" },
  { bg: "bg-amber-500",   hex: "#f59e0b" },
  { bg: "bg-emerald-600", hex: "#059669" },
  { bg: "bg-teal-600",    hex: "#0d9488" },
  { bg: "bg-cyan-600",    hex: "#0891b2" },
  { bg: "bg-sky-600",     hex: "#0284c7" },
];

/**
 * Returns a stable color from the palette based on the username string.
 * Same username always gets the same color.
 */
export const getAvatarColor = (username = "") => {
  if (!username) return AVATAR_COLORS[0];
  const code = username
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
};

/**
 * Returns 2-letter initials from a name or username.
 * - "John Doe"   → "JD"
 * - "alexj"      → "AL"
 * - "j"          → "J"
 */
export const getInitials = (name = "") => {
  const trimmed = name.trim();
  if (!trimmed) return "?";

  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    // Full name: first letter of first + first letter of last word
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  // Single word / username: first two characters
  return trimmed.slice(0, 2).toUpperCase();
};
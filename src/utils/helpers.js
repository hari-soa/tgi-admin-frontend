const DAYS_OF_WEEK = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const NUMERIC_USER_FIELDS = ["classRollNumber", "entryYear", "graduationYear"];

const pad = (value) => String(value).padStart(2, "0");

// Extract class number from Matricule (e.g. TGI-25020 -> n°020)
export const extractClassNum = (matricule) => {
  if (!matricule) return "n°--";
  const parts = matricule.split("-");
  if (parts.length >= 2) {
    const rawNum = parts[1].substring(2);
    return `n°${rawNum || "01"}`;
  }
  return "n°01";
};

/** Local calendar date as YYYY-MM-DD (toISOString would shift it to UTC). */
export const getTodayIsoDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

/** Weekday name used by the API (MONDAY...SATURDAY), or null for a Sunday. */
export const getDayOfWeek = (isoDate) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  const dayName = DAYS_OF_WEEK[new Date(year, month - 1, day).getDay()];
  return dayName === "SUNDAY" ? null : dayName;
};

/** Removes empty strings, null and undefined: the API rejects "" for optional fields. */
export const omitEmptyValues = (payload) => {
  const entries = Object.entries(payload).filter(
    ([, value]) => value !== "" && value !== null && value !== undefined,
  );
  return Object.fromEntries(entries);
};

/** Builds the body of a user update from a form: cleans empty values and numbers. */
export const toUserUpdatePayload = (formData) => {
  const cleaned = omitEmptyValues(formData);
  const numericEntries = NUMERIC_USER_FIELDS.filter(
    (field) => cleaned[field] !== undefined,
  ).map((field) => [field, Number(cleaned[field])]);
  return { ...cleaned, ...Object.fromEntries(numericEntries) };
};

export const getFullName = (user) =>
  user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "";

export const isFormerStudent = (user) => user?.classGroup === "ANCIEN";

const AVATAR_BACKGROUND_COLOR = "#1e293b";
const AVATAR_TEXT_COLOR = "#94a3b8";

/** Profile picture of a user, or an SVG with their initials when there is none. */
export const getAvatarSource = (user) => {
  if (user?.profilePictureUrl) return user.profilePictureUrl;

  const initials =
    `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="${AVATAR_BACKGROUND_COLOR}"/><text x="50%" y="50%" fill="${AVATAR_TEXT_COLOR}" font-family="sans-serif" font-size="36" font-weight="bold" text-anchor="middle" dominant-baseline="central">${initials || "?"}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/** Fields of `edited` whose value differs from `original` (what a PATCH should send). */
export const getChangedFields = (original, edited) =>
  Object.fromEntries(
    Object.entries(edited).filter(
      ([field, value]) => String(value ?? "") !== String(original[field] ?? ""),
    ),
  );

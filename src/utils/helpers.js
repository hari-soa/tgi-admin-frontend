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

const CLASS_GROUP_ORDER = ["SECONDE", "PREMIERE", "TERMINALE", "ANCIEN"];

const pad = (value) => String(value).padStart(2, "0");

export const extractClassNum = (matricule) => {
  if (!matricule) return "n°--";
  const parts = matricule.split("-");
  if (parts.length >= 2) {
    const rawNum = parts[1].substring(2);
    return `n°${rawNum || "01"}`;
  }
  return "n°01";
};

export const getTodayIsoDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

export const getDayOfWeek = (isoDate) => {
  const [year, month, day] = isoDate.split("-").map(Number);
  const dayName = DAYS_OF_WEEK[new Date(year, month - 1, day).getDay()];
  return dayName === "SUNDAY" ? null : dayName;
};

export const omitEmptyValues = (payload) => {
  const entries = Object.entries(payload).filter(
    ([, value]) => value !== "" && value !== null && value !== undefined,
  );
  return Object.fromEntries(entries);
};

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

export const getAvatarSource = (user) => {
  if (user?.profilePictureUrl) return user.profilePictureUrl;

  const initials =
    `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="${AVATAR_BACKGROUND_COLOR}"/><text x="50%" y="50%" fill="${AVATAR_TEXT_COLOR}" font-family="sans-serif" font-size="36" font-weight="bold" text-anchor="middle" dominant-baseline="central">${initials || "?"}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const getChangedFields = (original, edited) =>
  Object.fromEntries(
    Object.entries(edited).filter(
      ([field, value]) => String(value ?? "") !== String(original[field] ?? ""),
    ),
  );

const getClassGroupRank = (student) => {
  const rank = CLASS_GROUP_ORDER.indexOf(student.classGroup);
  return rank === -1 ? CLASS_GROUP_ORDER.length : rank;
};

export const sortStudentsByClassAndMatricule = (students) =>
  [...students].sort(
    (first, second) =>
      getClassGroupRank(first) - getClassGroupRank(second) ||
      (first.matricule || "").localeCompare(second.matricule || "", "fr", {
        numeric: true,
      }),
  );

const MAX_GRADE = 20;

export const buildGradeValues = (session) =>
  Object.fromEntries(
    (session?.draftGrades ?? []).map((entry) => [
      entry.studentId,
      entry.value === null || entry.value === undefined
        ? ""
        : String(entry.value),
    ]),
  );

export const buildAbsenceMotifs = (session) =>
  Object.fromEntries(
    (session?.absences ?? [])
      .filter((absence) => absence.motif)
      .map((absence) => [absence.studentId, absence.motif]),
  );

export const toGradeEntries = (rosterStudents, gradeValues) =>
  rosterStudents.map((student) => {
    const rawValue = gradeValues[student.id];
    const hasValue = rawValue !== undefined && rawValue !== "";
    return { studentId: student.id, value: hasValue ? Number(rawValue) : null };
  });

export const toAbsenceMotifEntries = (rosterStudents, gradeValues, motifs) =>
  rosterStudents
    .filter(
      (student) =>
        (gradeValues[student.id] ?? "") === "" && motifs[student.id]?.trim(),
    )
    .map((student) => ({
      studentId: student.id,
      motif: motifs[student.id].trim(),
    }));

export const isValidGradeValue = (rawValue) =>
  rawValue === "" ||
  (Number(rawValue) >= 0 && Number(rawValue) <= MAX_GRADE);

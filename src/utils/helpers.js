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

import { apiFetch } from "./api";

export const getStudentById = async (studentId) => {
  return await apiFetch(`/users/${studentId}`);
};

export const createAdministrator = async (adminData) => {
  return await apiFetch("/users/admin", {
    method: "POST",
    body: JSON.stringify(adminData),
  });
};

export const createStudent = async (studentData) => {
  return await apiFetch("/users/students", {
    method: "POST",
    body: JSON.stringify(studentData),
  });
};

export const createSecretary = async (secretaryData) => {
  return await apiFetch("/users/secretary", {
    method: "POST",
    body: JSON.stringify(secretaryData),
  });
};

export const updateUser = async (userId, userData) => {
  return await apiFetch(`/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
};

export const deactivateStudent = async (studentId) => {
  return await apiFetch(`/users/${studentId}`, {
    method: "DELETE",
  });
};

import { apiFetch } from "./api";

export const getAllUsers = async () => {
  const response = await apiFetch("/users");
  return response?.data?.users || response?.users || response;
};

export const getUserById = async (userId) => {
  const response = await apiFetch(`/users/${userId}`);
  return response?.data?.user || response;
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

export const createTeacher = async (teacherData) => {
  return await apiFetch("/users/teachers", {
    method: "POST",
    body: JSON.stringify(teacherData),
  });
};

export const updateUser = async (userId, userData) => {
  return await apiFetch(`/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
};

export const deactivateStudent = async (studentId) => {
  return await apiFetch(`/users/students/${studentId}/deactivate`, {
    method: "PATCH",
  });
};

import { apiFetch, jsonBody } from "./api";

const CREATE_ENDPOINT_BY_ROLE = {
  ADMIN: "/users/admin",
  STUDENT: "/users/students",
  SECRETARY: "/users/secretary",
  TEACHER: "/users/teachers",
};

export const getAllUsers = async () => {
  const data = await apiFetch("/users");
  return data.users;
};

/** Teachers, secretaries and administrators: readable by every role. */
export const getStaffUsers = async () => {
  const data = await apiFetch("/users/staff");
  return data.users;
};

export const createUser = async (role, userData) => {
  const data = await apiFetch(CREATE_ENDPOINT_BY_ROLE[role], {
    method: "POST",
    body: jsonBody(userData),
  });
  return data.user;
};

export const updateUser = async (userId, userData) => {
  const data = await apiFetch(`/users/${userId}`, {
    method: "PATCH",
    body: jsonBody(userData),
  });
  return data.user;
};

export const deleteUser = async (userId) => {
  await apiFetch(`/users/${userId}`, { method: "DELETE" });
};

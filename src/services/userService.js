import { callOperation } from "./api";

const CREATE_OPERATION_BY_ROLE = {
  ADMIN: "createAdministrator",
  STUDENT: "createStudent",
  SECRETARY: "createSecretary",
  TEACHER: "createTeacher",
};

export const getAllUsers = async () => {
  const data = await callOperation("listUsers");
  return data.users;
};

export const getStaffUsers = async () => {
  const data = await callOperation("listStaff");
  return data.users;
};

export const createUser = async (role, userData) => {
  const data = await callOperation(CREATE_OPERATION_BY_ROLE[role], {
    body: userData,
  });
  return data.user;
};

export const updateUser = async (userId, userData) => {
  const data = await callOperation("updateUser", {
    pathParams: { id: userId },
    body: userData,
  });
  return data.user;
};

export const deleteUser = async (userId) => {
  await callOperation("deleteUser", { pathParams: { id: userId } });
};

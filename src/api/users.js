import instance from "./instance";

export const getAllUsers = async () => {
  try {
    return await instance.get("users");
  } catch (error) {
    throw new Error("failed to get users");
  }
};

export const getUserById = async ({ userId }) => {
  try {
    const { data } = await instance.get(`users/${userId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

export const createUser = async ({ userName }) => {
  try {
    const { data } = await instance.post("users", { userName });
    return data;
  } catch (error) {
    throw new Error("failed to add user");
  }
};

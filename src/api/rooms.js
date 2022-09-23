import instance from "./instance";

export const getAllRooms = async () => {
  try {
    const { data } = await instance.get("rooms");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("failed to get rooms");
  }
};

export const createRoom = async ({ roomName }) => {
  try {
    const { data } = await instance.post("rooms", { roomName });
    return data;
  } catch (error) {
    throw new Error("failed to add room");
  }
};

export const getRoomByid = async (id) => {
  try {
    const room = await instance.get(`rooms/${id}`);
    return room.data;
  } catch (error) {
    console.error(error);
    throw new Error("failed to get a room by id");
  }
};

import { faker } from "https://cdn.skypack.dev/@faker-js/faker";

export const mapRoomToChatItemComponent = (rooms) => {
  return rooms.map(({ id, roomName }) => {
    let randomImage = faker.image.avatar();
    return {
      id,
      title: roomName,
      avatar: randomImage,
      unread: 0,
    };
  });
};

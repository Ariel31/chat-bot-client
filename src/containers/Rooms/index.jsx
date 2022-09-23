import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { ChatList } from "react-chat-elements";
import { getAllRooms } from "../../api";
import { useWebSocket } from "../../hooks/useWebSocket";
import Profile from "../Profile";
import { X } from "phosphor-react";
import { createRoom } from "../../api";
import { mapRoomToChatItemComponent } from "../../helper/roomMapper";

const Rooms = ({ selectedRoom, changeSelectedRoom }) => {
  const [rooms, setRooms] = useState(["Room a", "Room b"]);
  const [isAddRoomClicked, setIsAddRommClicked] = useState(false);
  const { newQuestion } = useWebSocket();

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await getAllRooms();
      const mappedRoomsForComponent = mapRoomToChatItemComponent(rooms);
      setRooms(mappedRoomsForComponent);
    };
    fetchRooms();
  }, []);

  // if new question trigger
  /*   useEffect(() => {
    if (!newQuestion || selectedRoom === newQuestion?.roomId) return;

    const { roomId } = newQuestion;

    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) return { ...room, unread: room.unread++ };
      return room;
    });
    setRooms(updatedRooms);
  }, [newQuestion]); */

  const addRoom = async (event) => {
    if (event.key !== "Enter") return;
    const roomName = event.target.value;
    const roomAdded = await createRoom({ roomName });
    const [mappedRoomForComponent] = mapRoomToChatItemComponent([roomAdded]);
    setRooms((prevRooms) => [...prevRooms, mappedRoomForComponent]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.rooms}>
        <ChatList
          className={styles.chatList}
          dataSource={rooms}
          onClick={(room) => changeSelectedRoom(room.id)}
        />
        {!isAddRoomClicked ? (
          <button
            className={styles.btn}
            onClick={() => setIsAddRommClicked(true)}
          >
            Add Room
          </button>
        ) : (
          <span className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Enter Room Name"
              onKeyDown={addRoom}
            />
            <X
              color="white"
              className="pointer"
              onClick={() => setIsAddRommClicked(false)}
            />
          </span>
        )}
      </div>
      <Profile />
    </div>
  );
};

export default Rooms;

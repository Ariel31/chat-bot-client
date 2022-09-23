import { useEffect, useState } from "react";
import Chat from "../../containers/ChatWindow";
import QuestionThread from "../../containers/QuestionThread";
import Rooms from "../../containers/Rooms";
import styles from "./index.module.scss";

const ChatLayout = () => {
  const [selectedRoom, setSelectedRoom] = useState();
  const [selectedQuestionId, setSelectedQuestionId] = useState();

  useEffect(() => {
    setSelectedQuestionId("");
  }, [selectedRoom]);

  return (
    <div className={styles.container}>
      <div className={styles.rooms}>
        <Rooms
          changeSelectedRoom={(roomId) => setSelectedRoom(roomId)}
          selectedRoom={selectedRoom}
        />
      </div>
      <div className={styles.chat}>
        <Chat
          roomId={selectedRoom}
          onSelectQuestion={(id) => setSelectedQuestionId(id)}
        />
        {selectedQuestionId && (
          <QuestionThread
            questionId={selectedQuestionId}
            onClickExit={() => setSelectedQuestionId("")}
          />
        )}
      </div>
    </div>
  );
};

export default ChatLayout;

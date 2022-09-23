import styles from "./index.module.scss";
import { useEffect, useRef } from "react";
import Conversation from "../Conversation";
import { Input } from "react-chat-elements";
import useConversation from "../../hooks/useConversation";
import { useWebSocket } from "../../hooks/useWebSocket";
import useBot from "../../hooks/useBot";
import useUser from "../../hooks/useUser";

const Chat = ({
  roomId = null,
  isQuestionThread = false,
  onSelectQuestion,
}) => {
  const { user } = useUser();
  const { newQuestion, clearNewQuestion } = useWebSocket();
  const {
    addNewQuestion,
    questions,
    fetchRoomById,
    addBotMessage,
    addQuestion,
  } = useConversation();
  const { search, getSassyPhrase } = useBot();

  const scrollRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (!roomId) return;
    else fetchRoomById(roomId);
  }, [roomId]);

  useEffect(() => {
    if (!newQuestion) return;

    const { room, from } = newQuestion;
    if (room.id === roomId && from.id !== user.id) {
      addQuestion({ ...newQuestion, created_at: new Date() });
      clearNewQuestion();
    }
  }, [newQuestion]);

  useEffect(() => {
    if (!scrollRef) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    inputRef.current.value = "";
  }, [questions]);

  const onKeyDown = async (event) => {
    const question = event.target.value;
    if (event.key === "Enter" && question.split("").length) {
      const [_, answer] = await Promise.all([
        addNewQuestion({
          content: question,
          fromUserId: user.id,
          roomId,
        }),
        search(question),
      ]);
      addBotMessage(answer);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Chat</h2>
      <div className={styles.messagesSection} ref={scrollRef}>
        <Conversation
          messages={questions}
          isQuestionThread={isQuestionThread}
          onClickMessage={onSelectQuestion}
        />
      </div>
      <div className={styles.writingSection}>
        <Input
          placeholder="Type here..."
          multiline={true}
          onKeyDown={onKeyDown}
          autofocus
          referance={inputRef}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default Chat;

import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import Conversation from "../Conversation";
import { Input } from "react-chat-elements";
import { X } from "phosphor-react";
import { useWebSocket } from "../../hooks/useWebSocket";
import useQuestionThread from "../../hooks/useQuestionThread";
import useUser from "../../hooks/useUser";

const QuestionThread = ({ questionId, onClickExit }) => {
  const { user } = useUser();
  const { newAnswer } = useWebSocket();
  const {
    addAnswer,
    fetchQuestionById,
    answers,
    answerOnQuestion,
    voteOnAnswer,
  } = useQuestionThread(questionId);
  const scrollRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    fetchQuestionById(questionId);
  }, [questionId]);

  // new anwer trigger from websocket
  useEffect(() => {
    if (
      !newAnswer ||
      questionId !== newAnswer?.question?.id ||
      newAnswer?.from?.id === user?.id
    )
      return;
    addAnswer(newAnswer);
  }, [newAnswer]);

  useEffect(() => {
    if (!scrollRef) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    inputRef.current.value = "";
  }, [answers]);

  const onKeyDown = (event) => {
    const answer = event.target.value;
    if (event.key === "Enter") {
      answerOnQuestion({
        answer,
        questionId,
        fromUserId: user.id,
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Question Thread</h2>
      <div className={styles.messagesSection} ref={scrollRef}>
        <X
          className={styles.xButton}
          size={20}
          weight="bold"
          onClick={onClickExit}
        />
        <Conversation
          messages={answers}
          isQuestionThread
          voteOnAnswer={voteOnAnswer}
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

export default QuestionThread;

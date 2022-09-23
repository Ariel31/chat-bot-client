import styles from "./index.module.scss";
import QuestionMessage from "../../components/QuestionMessage";
import { MessageBox } from "react-chat-elements";
import { useNavigate } from "react-router";
import AnswerMessage from "../../components/Answer";
import BotMessage from "../../components/BotMessage/QuestionMessage";
import useUser from "../../hooks/useUser";

const Conversation = ({
  messages,
  onClickMessage,
  isQuestionThread,
  voteOnAnswer,
}) => {
  const { user, isMessageFromMe } = useUser();

  const renderMessageBox = (message) => {
    const {
      id,
      from,
      content,
      answer,
      isBotMessage,
      created_at,
      upvotes,
      downvotes,
      isVotedUp,
      isVotedDown,
    } = message;

    const isMineMessage = isMessageFromMe({ fromUserId: id });
    const position = isMineMessage ? "right" : "left";

    const messageBox = (
      <MessageBox
        key={id}
        type="text"
        title={from?.userName || "tempforNow"}
        text={content || answer}
        onClick={() => onClickMessage(id)}
        date={created_at}
        position={position}
      />
    );

    if (isQuestionThread)
      return (
        <AnswerMessage
          upvotes={upvotes}
          downvotes={downvotes}
          voteOnAnswer={(partialUpdateObject) =>
            voteOnAnswer({ id, partialUpdateObject })
          }
          isVotedDown={isVotedDown}
          isVotedUp={isVotedUp}
        >
          {messageBox}
        </AnswerMessage>
      );
    if (isBotMessage) return <BotMessage>{messageBox}</BotMessage>;
    else
      return (
        <QuestionMessage
          isMessageFromMe={isMineMessage}
          onClickReply={() => onClickMessage(id)}
        >
          {messageBox}
        </QuestionMessage>
      );
  };

  return (
    <div className={styles.container}>
      {console.log("messages", messages)}
      {messages?.map((message) => renderMessageBox(message))}
    </div>
  );
};

export default Conversation;

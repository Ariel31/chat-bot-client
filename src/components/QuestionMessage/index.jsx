import styles from "./index.module.scss";
import "../../index.scss";

const QuestionMessage = ({ children, onClickReply }) => {
  return (
    <div className={styles.container} onClick={onClickReply}>
      {children}
      <span className={styles.answerInteraction}>
        <span onClick={onClickReply}>Open Question Thread</span>
      </span>
    </div>
  );
};

export default QuestionMessage;

import styles from "./index.module.scss";
import "../../index.scss";
import { ThumbsUp, ThumbsDown } from "phosphor-react";

const AnswerMessage = ({
  upvotes,
  downvotes,
  isVotedUp,
  isVotedDown,
  voteOnAnswer,
  children,
}) => {
  return (
    <div className={styles.container}>
      {children}
      {Number.isInteger(upvotes) && Number.isInteger(downvotes) && (
        <div className={styles.interactions}>
          <span
            className="flex"
            onClick={() => {
              if (isVotedUp)
                voteOnAnswer({ isVotedUp: false, upvotes: upvotes - 1 });
              else voteOnAnswer({ isVotedUp: true, upvotes: upvotes + 1 });
            }}
          >
            <ThumbsUp className={styles.icon} size={20} />
            <span>{upvotes}</span>
          </span>
          <span
            className="flex"
            onClick={() => {
              if (isVotedDown)
                voteOnAnswer({ isVotedDown: false, downvotes: downvotes - 1 });
              else
                voteOnAnswer({ isVotedDown: true, downvotes: downvotes + 1 });
            }}
          >
            <ThumbsDown className={styles.icon} size={20} />
            <span>{downvotes}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default AnswerMessage;

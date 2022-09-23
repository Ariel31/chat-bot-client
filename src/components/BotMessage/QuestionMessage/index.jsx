import styles from "./index.module.scss";

const BotMessage = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default BotMessage;

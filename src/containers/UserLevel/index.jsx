import { CaretDown } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "react-chat-elements";
import styles from "./index.module.scss";

const levels = {
  1: {
    levelName: "Newb",
    avatar:
      "https://cdn2.iconfinder.com/data/icons/women-s-day-smooth-1/512/girl_baby_user_young_avatar_profile_people-512.png",
  },
  2: {
    levelName: "Morty",
    avatar:
      "https://www.pngarea.com/pngm/37/5842413_morty-png-avatar-rick-and-morty-icon-png.png",
  },
  3: {
    levelName: "Ashton Kucher",
    avatar: "https://cheszy.com/img/icon/ashton-kutcher.jpg",
  },
  4: {
    levelName: "Einsthein",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS18WHPrKyAAeRhkoC9CrPPIjTy_xN8nerNBQ&usqp=CAU",
  },
  5: {
    levelName: "Rick",
    avatar:
      "https://i.pinimg.com/originals/58/83/ca/5883cad98a74d9b8df173409c56edaa0.gif",
  },
};

const UserLevel = ({ answersAnswerd }) => {
  const [showHint, setShowHint] = useState(false);
  const avalableLevelsAre = Object.values(levels).reduce(
    (previousValue, level) => `${previousValue} | ${level.levelName}`,
    ""
  );

  const ANSWERS_FOR_NEXT_LEVEL = 20;
  const level = Math.floor(answersAnswerd / ANSWERS_FOR_NEXT_LEVEL) || 1;
  const currenteLevel = levels[level];
  const messagesForNextLevel = (level + 1) * ANSWERS_FOR_NEXT_LEVEL;
  return (
    <div className={styles.container}>
      <div className={styles.currentLevelContainer}>
        <span>Current Level</span>
        <span>
          Answers Answered {answersAnswerd} / {messagesForNextLevel}
        </span>
        <span className={styles.levelContainer}>
          <Avatar
            src={currenteLevel?.avatar}
            alt={"logo"}
            size="large"
            type="circle flexible"
          />
          <span>{currenteLevel?.levelName}</span>
        </span>
        <span className={styles.hint}>
          hint
          <CaretDown
            weight="bold"
            className="pointer"
            onClick={() => setShowHint((prev) => !prev)}
          />
        </span>
        {showHint && (
          <>
            <span>Level will Change after 25 answers you answer</span>
            <span>Availabe Levels: {avalableLevelsAre}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default UserLevel;

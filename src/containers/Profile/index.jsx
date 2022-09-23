import { Avatar } from "react-chat-elements";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";
import useUser from "../../hooks/useUser";
import styles from "./index.module.scss";
import UserLevel from "../UserLevel";
import { useMemo } from "react";

const Profile = () => {
  const { user } = useUser();
  const image = useMemo(() => {
    return faker.image.avatar();
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.profileHeader}>
        <Avatar src={image} alt={"logo"} size="large" type="circle flexible" />
        <span>{user?.userName}</span>
      </span>
      <UserLevel answersAnswerd={user?.answers?.length} />
    </div>
  );
};

export default Profile;

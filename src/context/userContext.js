import { createContext, useEffect, useState } from "react";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";
import { createUser, getUserById } from "../api";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) signUser();
    else fetchUser({ userId });
  }, []);

  const signUser = async () => {
    const randomName = faker.name.findName();
    const user = await createUser({ userName: randomName });
    localStorage.setItem("userId", user.id);
    setUser(user);
  };

  const fetchUser = async ({ userId }) => {
    const user = await getUserById({ userId });
    setUser(user);
  };

  const isMessageFromMe = ({ fromUserId }) => user?.id === fromUserId;

  return (
    <UserContext.Provider value={{ user, isMessageFromMe, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

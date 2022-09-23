import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import useUser from "../hooks/useUser";

const SocketContext = createContext();
const SOCKET_ENDPOINT = "http://localhost:8080";

const SocketContextProvider = ({ children }) => {
  const { user } = useUser();
  const [newQuestion, setNewQuestion] = useState();
  const [newAnswer, setNewAnswer] = useState();

  const clearNewQuestion = () => setNewQuestion(null);

  useEffect(() => {
    //if (!user?.id) return;

    const socket = io(SOCKET_ENDPOINT, {});
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnectrd");
    });

    socket.on("questionAdded", (data) => {
      setNewQuestion(data);
    });

    socket.on("answerAdded", (data) => {
      setNewAnswer(data);
    });

    socket.emit("identity", { userId: user?.id });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("questionAdded");
      socket.off("answerAdded");
    };
  }, [user]);

  return (
    <SocketContext.Provider
      value={{ newQuestion, newAnswer, clearNewQuestion }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };

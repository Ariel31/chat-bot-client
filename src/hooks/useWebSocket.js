import { useContext } from "react";
import { SocketContext } from "../context/socketContext";

export const useWebSocket = () => {
  const a = useContext(SocketContext);
  return a;
};

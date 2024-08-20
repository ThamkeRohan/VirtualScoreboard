import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";
import { useErrorPortalUpdate } from "../../contexts/ErrorPortalContext";

export default function useUmpireSocket() {
  const [socket, setSocket] = useState();
  const { isAuthenticated, umpire, token } = useAuth();
  const { matchId } = useParams();
  const { addError } = useErrorPortalUpdate();

  useEffect(() => {
    if (!isAuthenticated) return; 
    let newSocket;
    newSocket = io(`${import.meta.env.VITE_SOCKET_SERVER_BASE_URL}/umpire`, {
      auth: { token },
      query: { matchId },
    });
    setSocket(newSocket);
    console.log("Umpire socket connected");

    function handleConnectError(err) {
      console.log("Umpire socket disconnected");
      console.log(err.message)
      addError(err.message);
      socket.close();
      setSocket(null)
    }
    newSocket.on("connect_error", handleConnectError);

    return () => {
      if (newSocket) {
        newSocket.off("connect_error", handleConnectError);
        console.log("Umpire socket closed in cleanup");
        newSocket.close();
      }
      setSocket(null);
    };
  }, [isAuthenticated, umpire, token, matchId]);

  

  function sendUpdateToSpectators(update) {
    if (socket == null) return;
    socket.emit("overs-updated", update);
  }
  function disconnectSocketOnError(err) {
    addError(err);
    if (socket) {
      socket.close();
    }
    setSocket(null);
  }

  return { sendUpdateToSpectators, disconnectSocketOnError };
}

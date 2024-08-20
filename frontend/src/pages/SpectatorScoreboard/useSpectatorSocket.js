import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useScoreboardUpdate } from "../../contexts/ScoreboardContext";
import { useErrorPortalUpdate } from "../../contexts/ErrorPortalContext";

export default function useSpectatorSocket() {
  const [socket, setSocket] = useState(null);
  const { matchId } = useParams();
  const { pushDelivery: pushDeliveryLocally, popDelivery: popDeliveryLocally } =
    useScoreboardUpdate();
  const { addError } = useErrorPortalUpdate();

  useEffect(() => {
    let newSocket = io(
      `${import.meta.env.VITE_SOCKET_SERVER_BASE_URL}/spectator`,
      {
        query: { matchId },
      }
    );
    setSocket(newSocket);
    console.log("Spectator socket connected");

    function disconnectSocket(errMessage) {
      console.log("Spectator socket closed");
      console.log(errMessage);
      addError(errMessage);
      newSocket.close();
      setSocket(null);
    }

    function handleOversUpdated({ action, position, delivery }) {
      if (action === "push") {
        pushDeliveryLocally(delivery, position);
      } else if (action === "pop") {
        popDeliveryLocally(position);
      } else {
        disconnectSocket("Incorrect action");
      }
    }

    function handleConnectError(err) {
      disconnectSocket(err.message);
    }

    function handleUmpireDisconnected() {
      disconnectSocket("Umpire disconnected");
    }

    newSocket.on("overs-updated", handleOversUpdated);
    newSocket.on("connect_error", handleConnectError);
    newSocket.on("umpire-disconnected", handleUmpireDisconnected);

    return () => {
      if (newSocket) {
        newSocket.off("overs-updated", handleOversUpdated);
        newSocket.off("connect_error", handleConnectError);
        newSocket.off("umpire-disconnected", handleUmpireDisconnected);
        newSocket.close();
        console.log("Spectator socket closed in cleanup");
      }
      setSocket(null);
    };
  }, [matchId]);
}

import React from "react";
import { useParams } from "react-router-dom";
import { useScoreboard } from "../../contexts/ScoreboardContext";
import Delivery from "./Delivery";

export default function OverDetail() {
  const { team, overId } = useParams();
  const { match } = useScoreboard();

  return (
    <div className="over-detail">
      {match[team].oversFaced
        .find((over) => over._id === overId).deliveries
        .map((delivery) => (
          <Delivery key={delivery._id} {...delivery} />
        ))}
    </div>
  );
}

import React from "react";
import { useParams } from "react-router-dom";
import FriendListWidget from "scenes/widgets/FriendListWidget";

function MyFreinds() {
  const { userId } = useParams();
  return (
    <div>
      <FriendListWidget userId={userId} />
    </div>
  );
}

export default MyFreinds;

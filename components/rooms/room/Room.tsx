import React from "react";
import { Text } from "react-native";
import { Room } from "../Rooms";

interface RoomProps {
  room: Room;
}

export const SingleRoom = React.memo<RoomProps>(({ room }) => {
  const { name } = room;
  return <Text>{name}</Text>;
});

SingleRoom.displayName = "SingleRoom";

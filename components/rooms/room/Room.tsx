import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Button } from "react-native";
import { Room } from "../Rooms";

type NavigationParamList = {
  Home: undefined;
  ChatRoom: { chatId: string };
};
interface RoomProps {
  room: Room;
  navigation: StackNavigationProp<NavigationParamList>;
}

export const SingleRoom = React.memo<RoomProps>(({ navigation, room }) => {
  const { name, id } = room;
  return <Button title={name} onPress={() => navigation.navigate("ChatRoom", { roomId: id })} />;
});

SingleRoom.displayName = "SingleRoom";

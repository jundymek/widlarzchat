import React from "react";
import { Text } from "react-native";
import { RouteProp } from "@react-navigation/native";

interface Props {
  route: RouteProp<{ params: { chatId: string } }, "params">;
}

export const ChatRoom = React.memo<Props>(({ route }) => {
  console.log(route.params);
  return <Text>Chat room {route.params.chatId}</Text>;
});

ChatRoom.displayName = "ChatRoom";

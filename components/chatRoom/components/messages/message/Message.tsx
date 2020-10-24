import React from "react";
import { Text } from "react-native";
import { Message as SingleMessage } from "../Messages";

interface MessageProps {
  message: SingleMessage;
}

export const Message = React.memo<MessageProps>(({ message }) => {
  return (
    <Text key={message.id}>
      {message.body} - {message.user.firstName} {message.user.lastName}{" "}
    </Text>
  );
});

Message.displayName = "Message";

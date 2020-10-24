import React from "react";
import { Message as SingleMessage } from "../Messages";
import styled from "styled-components/native";

interface MessageProps {
  message: SingleMessage;
}

interface BoxProps {
  isMe: boolean;
}

const StyledView = styled.View<BoxProps>`
  height: auto;
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
  max-width: 90%;
  background-color: ${(props) => (props.isMe ? "blue" : "white")};
  align-self: ${(props) => (props.isMe ? "flex-start" : "flex-end")};
`;

const StyledText = styled.Text<BoxProps>`
  color: ${(props) => (props.isMe ? "white" : "black")};
`;

export const Message = React.memo<MessageProps>(({ message }) => {
  const myUser = "ada4d6e3-aba6-49c3-9463-d6e09f984c1b";
  return (
    <StyledView isMe={myUser === message.user.id}>
      <StyledText key={message.id} isMe={myUser === message.user.id}>
        {message.body} - {message.user.firstName} {message.user.lastName}{" "}
      </StyledText>
    </StyledView>
  );
});

Message.displayName = "Message";

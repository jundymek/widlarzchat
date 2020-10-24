import React from "react";
import { Message as SingleMessage } from "../Messages";
import styled from "styled-components/native";
import { Avatar } from "react-native-elements";
import { getInitials } from "./utils/getInitials";

interface MessageProps {
  message: SingleMessage;
}

interface BoxProps {
  isMe?: boolean;
}

const Wrapper = styled.View<BoxProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 80%;
  align-self: ${(props) => (props.isMe ? "flex-start" : "flex-end")};
`;

const StyledView = styled.View<BoxProps>`
  height: auto;
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isMe ? "blue" : "white")};
`;

const StyledDateWrapper = styled.View`
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin-bottom: 10px;
`;

const StyledText = styled.Text<BoxProps>`
  color: ${(props) => (props.isMe ? "white" : "black")};
`;

const DateText = styled.Text`
  color: gray;
  font-size: 8px;
  align-self: flex-end;
  margin-top: 6px;
`;

export const Message = React.memo<MessageProps>(({ message }) => {
  const myUser = "ada4d6e3-aba6-49c3-9463-d6e09f984c1b";

  return (
    <Wrapper isMe={myUser === message.user.id}>
      <Avatar
        rounded
        size="small"
        title={getInitials(message.user.firstName, message.user.lastName)}
        containerStyle={{ backgroundColor: "gray", marginRight: "10px" }}
      />
      <StyledDateWrapper>
        <StyledView isMe={myUser === message.user.id}>
          <StyledText isMe={myUser === message.user.id}>{message.body}</StyledText>
        </StyledView>
        <DateText>{message.insertedAt}</DateText>
      </StyledDateWrapper>
    </Wrapper>
  );
});

Message.displayName = "Message";

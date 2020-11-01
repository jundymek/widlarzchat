import React from "react";
import styled from "styled-components/native";
import { Message } from "./message/Message";

interface User {
  __typename: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: string;
}
export interface Message {
  __typename: string;
  body: string;
  id: string;
  insertedAt: string;
  user: User;
}

interface MessagesProps {
  data: Message[];
}

export const MessageWrapper = styled.View`
  padding: 10px;
`;

export const Messages = React.memo<MessagesProps>(({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <MessageWrapper>
      {data
        .slice(0)
        .reverse()
        .map((message: Message) => {
          return <Message key={message.id} message={message} />;
        })}
    </MessageWrapper>
  );
});

Messages.displayName = "Messages";

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

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
`;

export const Messages = React.memo<MessagesProps>(({ data }) => {
  if (!data) {
    return null;
  }
  console.log(data);
  return (
    <Wrapper>
      {data
        .slice(0)
        .reverse()
        .map((message: Message) => {
          return <Message key={message.id} message={message} />;
        })}
    </Wrapper>
  );
});

Messages.displayName = "Messages";

import { useSubscription } from "@apollo/client";
import React from "react";
import styled from "styled-components/native";
import { UPDATE_MESSAGES } from "../../../../helpers/databaseQueries";
import { NewMessageSubscription } from "../newMessageSubscription/NewMessageSubscription";
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
  roomId: string;
}

export const MessageWrapper = styled.View`
  padding: 10px;
`;

export const Messages = React.memo<MessagesProps>(({ data, roomId }) => {
  const { data: subscriptionData } = useSubscription(UPDATE_MESSAGES, { variables: { roomId } });
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
      <NewMessageSubscription subscription={subscriptionData && subscriptionData.messageAdded} data={data} />
    </MessageWrapper>
  );
});

Messages.displayName = "Messages";

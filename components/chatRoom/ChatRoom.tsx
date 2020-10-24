import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";

interface Props {
  route: RouteProp<{ params: { roomId: string; name: string } }, "params">;
}

export const GET_ROOM = gql`
  query Room($roomId: String!) {
    room(id: $roomId) {
      id
      name
      messages {
        body
        id
        insertedAt
        user {
          email
          firstName
          id
          lastName
          role
        }
      }
      user {
        email
        firstName
        id
        lastName
        role
      }
    }
  }
`;

export const NEW_MESSAGE = gql`
  mutation($roomId: String!, $body: String!) {
    sendMessage(roomId: $roomId, body: $body) {
      body
      id
    }
  }
`;

export const UPDATE_MESSAGES = gql`
  subscription($roomId: String!) {
    messageAdded(roomId: $roomId) {
      body
      id
      insertedAt
      user {
        email
        firstName
        id
        lastName
        role
      }
    }
  }
`;

export const TYPING_USER = gql`
  subscription($roomId: String!) {
    typingUser(roomId: $roomId) {
      email
      firstName
      id
      lastName
      role
    }
  }
`;
interface User {
  __typename: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: string;
}
interface Message {
  body: string;
  id: string;
  insertedAt: string;
  user: User;
}

export const ChatRoom = React.memo<Props>(({ route }) => {
  const [newMessage, setNewMessage] = useState<string | undefined>(undefined);
  console.log(route.params);
  const { roomId } = route.params;
  const { data, loading } = useQuery(GET_ROOM, { variables: { roomId } });

  const subscription = useSubscription(UPDATE_MESSAGES, { variables: { roomId } });
  const typingUser = useSubscription(TYPING_USER, { variables: { roomId } });
  console.log(typingUser);
  console.log(subscription);
  console.log(data && data.room.messages);
  const [sendMessage] = useMutation(NEW_MESSAGE);

  if (loading) return <Text>Loading...</Text>;
  return (
    <View>
      {subscription && subscription.data && <Text>{subscription.data.messageAdded.body}</Text>}
      {data &&
        data.room.messages.map((message: Message) => {
          return (
            <Text key={message.id}>
              {message.body} - {message.user.firstName} {message.user.lastName}{" "}
            </Text>
          );
        })}
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setNewMessage(text)}
        value={newMessage ? newMessage : ""}
      />
      <Button title="Wyślij" onPress={() => sendMessage({ variables: { roomId, body: newMessage } })} />
    </View>
  );
});

ChatRoom.displayName = "ChatRoom";

import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { gql, useMutation, useQuery } from "@apollo/client";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  route: RouteProp<{ params: { chatId: string } }, "params">;
}

export const GET_ROOM = gql`
  query Room($chatId: String!) {
    room(id: $chatId) {
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
  mutation($chatId: String!, $body: String!) {
    sendMessage(roomId: $chatId, body: $body) {
      body
      id
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
  const [message, onChangeText] = useState<string | undefined>(undefined);
  const { chatId } = route.params;
  console.log(chatId);
  const { data, loading } = useQuery(GET_ROOM, { variables: { chatId } });

  console.log(data && data.room.messages);
  const [newMessage] = useMutation(NEW_MESSAGE);

  if (loading) return <Text>Loading...</Text>;
  return (
    <View>
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
        onChangeText={(text) => onChangeText(text)}
        value={message}
      />
      <Button title="Wyślij" onPress={() => newMessage({ variables: { chatId, body: message } })} />
    </View>
  );
});

ChatRoom.displayName = "ChatRoom";

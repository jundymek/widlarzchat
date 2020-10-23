import React from "react";
import { Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";

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
  const { chatId } = route.params;
  console.log(chatId);
  const { data, loading } = useQuery(GET_ROOM, { variables: { chatId } });

  console.log(data && data.room.messages);

  if (loading) return <Text>Loading...</Text>;
  return (
    <View>
      {data &&
        data.room.messages.map((message: Message) => {
          return (
            <Text>
              {message.body} - {message.user.firstName} {message.user.lastName}{" "}
            </Text>
          );
        })}
    </View>
  );
});

ChatRoom.displayName = "ChatRoom";

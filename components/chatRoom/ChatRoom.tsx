import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Messages } from "./components/messages/Messages";
import { GET_ROOM, NEW_MESSAGE, UPDATE_MESSAGES } from "../../helpers/databaseQueries";
import { Input, Icon } from "react-native-elements";
import styled from "styled-components/native";
import { Subscriptions } from "./components/subscriptions/Subscriptions";
import { useHeaderHeight } from "@react-navigation/stack";

interface Props {
  route: RouteProp<{ params: { roomId: string; name: string } }, "params">;
}

const StyledScrollView = styled(ScrollView)`
  height: calc(100vh - 60px);
`;

const InputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

export const ChatRoom = React.memo<Props>(({ route }) => {
  const [newMessage, setNewMessage] = useState<string | undefined>(undefined);
  const { roomId } = route.params;
  const { data, loading } = useQuery(GET_ROOM, {
    variables: { roomId },
    onCompleted() {
      console.log(scrollRef);
      if (scrollRef.current) {
        console.log(scrollRef.current);
        scrollRef.current.scrollToEnd({ animated: true });
      }
    },
  });
  const { data: subscriptionData } = useSubscription(UPDATE_MESSAGES, { variables: { roomId } });
  const [sendMessage] = useMutation(NEW_MESSAGE, {
    refetchQueries: [
      {
        query: gql`
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
        `,
        variables: { roomId: roomId },
      },
    ],
  });

  const scrollRef = React.createRef<ScrollView>();

  if (loading) return <Text>Loading...</Text>;
  return (
    <StyledScrollView
      ref={scrollRef}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end", flexDirection: "column" }}
    >
      <Messages data={data.room.messages} />
      <Subscriptions subscription={subscriptionData && subscriptionData.messageAdded} />
      <InputWrapper>
        <Input
          placeholder="Type a message..."
          leftIcon={{ type: "font-awesome", name: "comment-o", color: "gray" }}
          onChangeText={(text) => setNewMessage(text)}
        />
        <Icon
          name="send"
          type="material"
          color="#f50"
          onPress={() => sendMessage({ variables: { roomId, body: newMessage } })}
        />
      </InputWrapper>
    </StyledScrollView>
  );
});

ChatRoom.displayName = "ChatRoom";

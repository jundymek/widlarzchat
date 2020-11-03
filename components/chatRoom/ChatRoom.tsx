import React, { useState } from "react";
import { ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Message, Messages } from "./components/messages/Messages";
import { GET_ROOM, NEW_MESSAGE, UPDATE_MESSAGES } from "../../helpers/databaseQueries";
import { Input, Icon } from "react-native-elements";
import styled from "styled-components/native";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";
{
}

export interface ChatRoomProps {
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

const StyledInput = styled(Input)`
  padding: 10px;
`;

export const ChatRoom = React.memo<ChatRoomProps>(({ route }) => {
  const [newMessage, setNewMessage] = useState<string>("");
  const [messagesToShow, setMessagesToShow] = useState<Message[]>([]);
  const { roomId } = route.params;
  const { data, loading } = useQuery(GET_ROOM, {
    variables: { roomId },
    pollInterval: 500,
    onCompleted() {
      setMessagesToShow(data && data.room.messages.slice(0).reverse());
      if (scrollRef.current) {
        scrollRef.current.scrollToEnd({ animated: true });
      }
    },
  });

  const { data: subscriptionData } = useSubscription(UPDATE_MESSAGES, {
    variables: { roomId },
    onSubscriptionData: (data) => {
      console.log(data);
      if (data) {
        setMessagesToShow((prevState) => [...prevState, data.subscriptionData.data.messageAdded]);
      }
    },
  });

  const [sendMessage] = useMutation(NEW_MESSAGE, {
    onCompleted() {
      setNewMessage("");
    },
  });

  const scrollRef = React.createRef<ScrollView>();

  if (loading) return <LoadingSpinner />;
  return (
    <StyledScrollView
      ref={scrollRef}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end", flexDirection: "column" }}
    >
      <Messages data={messagesToShow} roomId={roomId} />
      <InputWrapper>
        <StyledInput
          placeholder="Type a message..."
          leftIcon={{ type: "font-awesome", name: "comment-o", color: "gray" }}
          onChangeText={(text) => setNewMessage(text)}
          value={newMessage}
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

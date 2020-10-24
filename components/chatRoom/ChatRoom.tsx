import React, { useState } from "react";
import { Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Messages } from "./components/messages/Messages";
import { GET_ROOM, NEW_MESSAGE, UPDATE_MESSAGES } from "../../helpers/databaseQueries";
import { Input, Icon } from "react-native-elements";
import styled from "styled-components/native";

interface Props {
  route: RouteProp<{ params: { roomId: string; name: string } }, "params">;
}

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
  const { data, loading } = useQuery(GET_ROOM, { variables: { roomId } });
  const subscription = useSubscription(UPDATE_MESSAGES, { variables: { roomId } });
  const [sendMessage] = useMutation(NEW_MESSAGE);

  if (loading) return <Text>Loading...</Text>;
  return (
    <View>
      {subscription && subscription.data && <Text>{subscription.data.messageAdded.body}</Text>}
      <Messages data={data.room.messages} />
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
    </View>
  );
});

ChatRoom.displayName = "ChatRoom";

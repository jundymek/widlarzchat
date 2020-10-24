import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Messages } from "./components/messages/Messages";
import { GET_ROOM, NEW_MESSAGE, UPDATE_MESSAGES } from "../../helpers/databaseQueries";

interface Props {
  route: RouteProp<{ params: { roomId: string; name: string } }, "params">;
}

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

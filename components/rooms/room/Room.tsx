import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Room } from "../Rooms";
import { ListItem, Icon } from "react-native-elements";

type NavigationParamList = {
  Home: undefined;
  ChatRoom: { roomId: string; name: string };
};
interface RoomProps {
  room: Room;
  navigation: StackNavigationProp<NavigationParamList>;
}

export const SingleRoom = React.memo<RoomProps>(({ navigation, room }) => {
  const { name, id } = room;
  return (
    <>
      <ListItem bottomDivider onPress={() => navigation.navigate("ChatRoom", { roomId: id, name: name })}>
        <Icon name="input" type="material" color="#517fa4" />
        <ListItem.Content>
          <ListItem.Title>{name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </>
  );
});

SingleRoom.displayName = "SingleRoom";

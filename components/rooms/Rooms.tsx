import { useQuery } from "@apollo/client";
import React from "react";
import { Text } from "react-native";
import { SingleRoom } from "./room/Room";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import { GET_ROOMS } from "../../helpers/databaseQueries";

export interface Room {
  id: string;
  name: string;
  __typename: string;
}
type NavigationParamList = {
  Home: undefined;
  ChatRoom: { roomId: string; name: string };
};
interface Props {
  navigation: StackNavigationProp<NavigationParamList>;
}

const StyledView = styled.View`
  display: flex;
  height: 100%;
`;

export const Rooms = React.memo<Props>(({ navigation }) => {
  const { data, loading } = useQuery(GET_ROOMS);

  if (loading) return <Text>Loading...</Text>;
  return (
    <StyledView>
      {data &&
        data.usersRooms.rooms.map((room: Room) => {
          return <SingleRoom navigation={navigation} room={room} key={room.id} />;
        })}
    </StyledView>
  );
});

Rooms.displayName = "Rooms";

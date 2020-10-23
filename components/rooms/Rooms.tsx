import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, View, Button } from "react-native";
import { SingleRoom } from "./room/Room";
import { StackNavigationProp } from "@react-navigation/stack";

export const GET_ROOMS = gql`
  query Rooms {
    usersRooms {
      user {
        email
        firstName
        lastName
        id
        role
      }
      rooms {
        id
        name
      }
    }
  }
`;

export interface Room {
  id: string;
  name: string;
  __typename: string;
}
type NavigationParamList = {
  Home: undefined;
  ChatRoom: { chatId: string };
};
interface Props {
  navigation: StackNavigationProp<NavigationParamList>;
}

export const Rooms = React.memo<Props>(({ navigation }) => {
  const { data, loading } = useQuery(GET_ROOMS);

  if (loading) return <Text>Loading...</Text>;
  return (
    <>
      <View>
        {data &&
          data.usersRooms.rooms.map((room: Room) => {
            return <SingleRoom navigation={navigation} room={room} key={room.id} />;
          })}
      </View>
    </>
  );
});

Rooms.displayName = "Rooms";

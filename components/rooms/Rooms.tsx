import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, View } from "react-native";

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

interface Room {
  id: string;
  name: string;
  __typename: string;
}

export const Rooms = React.memo(() => {
  const { data, loading } = useQuery(GET_ROOMS);

  if (loading) return <Text>Loading...</Text>;
  return (
    <View>
      {data &&
        data.usersRooms.rooms.map((room: Room) => {
          return <Text key={room.id}>{room.name}</Text>;
        })}
    </View>
  );
});

Rooms.displayName = "Rooms";

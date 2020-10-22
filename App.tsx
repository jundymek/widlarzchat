import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { gql, useQuery } from "@apollo/client";

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { API_TOKEN } from "@env";

const httpLink = createHttpLink({
  uri: "https://chat.thewidlarzgroup.com/api/graphql",
});

console.log(API_TOKEN);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = `${API_TOKEN}`;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${API_TOKEN}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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

const Rooms = () => {
  const { data, loading } = useQuery(GET_ROOMS, {
    onCompleted() {
      console.log(data && data);
    },
  });
  if (loading) return <Text>Loading...</Text>;
  console.log(data);

  return (
    <View>
      <Text>{data && data.usersRooms.rooms[0].id}</Text>
    </View>
  );
};

export default function App(): ReactNode {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your appss!</Text>
        <Rooms />
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

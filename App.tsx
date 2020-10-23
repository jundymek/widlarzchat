import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { API_TOKEN } from "@env";
import { Rooms } from "./components/rooms/Rooms";

const httpLink = createHttpLink({
  uri: "https://chat.thewidlarzgroup.com/api/graphql",
});

console.log(API_TOKEN);

const authLink = setContext((_, { headers }) => {
  const token = `${API_TOKEN}`;
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

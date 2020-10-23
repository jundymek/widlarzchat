import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { API_TOKEN } from "@env";
import { Rooms } from "./components/rooms/Rooms";
import { ChatRoom } from "./components/chatRoom/ChatRoom";

const httpLink = createHttpLink({
  uri: "https://chat.thewidlarzgroup.com/api/graphql",
});

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

const Stack = createStackNavigator();

export default function App(): ReactNode {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Rooms} options={{ title: "Available rooms" }} />
          <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ title: "Chat" }} />
          {/* <View style={styles.container}>
            <Rooms />
            <StatusBar style="auto" />
          </View> */}
        </Stack.Navigator>
      </ApolloProvider>
    </NavigationContainer>
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

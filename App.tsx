import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { API_TOKEN } from "@env";
import { Rooms } from "./components/rooms/Rooms";
import { ChatRoom } from "./components/chatRoom/ChatRoom";

import { Socket as PhoenixSocket } from "phoenix";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { split } from "apollo-link";
import { hasSubscription } from "@jumpn/utils-graphql";

const httpLink = createHttpLink({
  uri: "https://chat.thewidlarzgroup.com/api/graphql",
  credentials: "same-origin",
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

const authedHttpLink = authLink.concat(httpLink);

const phoenixSocket = new PhoenixSocket("wss://chat.thewidlarzgroup.com/socket", {
  params: () => {
    return { token: `${API_TOKEN}` };
  },
});

const absintheSocket = AbsintheSocket.create(phoenixSocket);
const websocketLink = createAbsintheSocketLink(absintheSocket);

const link = split((operation) => hasSubscription(operation.query), websocketLink, authedHttpLink);

const client = new ApolloClient({
  link,
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
        </Stack.Navigator>
        <StatusBar style="auto" />
      </ApolloProvider>
    </NavigationContainer>
  );
}

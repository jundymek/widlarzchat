import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { API_TOKEN } from "@env";
import { Rooms } from "./components/rooms/Rooms";
import { ChatRoom } from "./components/chatRoom/ChatRoom";

import { Socket as PhoenixSocket } from "phoenix";
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
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
const websocketLink: any = createAbsintheSocketLink(absintheSocket);

const link = split((operation) => hasSubscription(operation.query), websocketLink, authedHttpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

type RootStackParamList = {
  Home: undefined;
  ChatRoom: { roomId: string; name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): ReactNode {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Rooms}
            options={{ title: "Available rooms", headerTitleStyle: { alignSelf: "center" } }}
          />
          <Stack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={({ route }) => ({
              title: route.params && route.params.name,
              headerTitleStyle: { fontSize: 14, fontWeight: "bold", alignSelf: "center" },
            })}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </ApolloProvider>
    </NavigationContainer>
  );
}

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { Rooms } from "./components/rooms/Rooms";
import { ChatRoom } from "./components/chatRoom/ChatRoom";

import { link } from "./helpers/configConnections";

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

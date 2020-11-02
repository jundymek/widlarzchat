import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { Message } from "../messages/message/Message";
import { Message as MessageProps } from "../messages/Messages";

interface SubscriptionsProps {
  subscription: MessageProps;
  data: MessageProps[];
}

function checkSubscription(id: string, data: MessageProps[]) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return true;
    }
  }
  return false;
}

export const NewMessageSubscription = React.memo<SubscriptionsProps>(({ subscription, data }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 5000,
      easing: Easing.bezier(0.07, 1, 0.33, 0.89),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  if (subscription && checkSubscription(subscription.id, data)) {
    return null;
  }
  return (
    <Animated.View
      style={[
        {
          opacity,
        },
      ]}
    >
      <Message message={subscription} />
    </Animated.View>
  );
});

NewMessageSubscription.displayName = "NewMessageSubscription";

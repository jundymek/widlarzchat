import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Message } from "../messages/message/Message";
import { Message as MessageProps, MessageWrapper } from "../messages/Messages";

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

export const Subscriptions = React.memo<SubscriptionsProps>(({ subscription, data }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 10000,
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
    <MessageWrapper>
      <Animated.View
        style={[
          {
            opacity,
          },
        ]}
      >
        <Message message={subscription} />
      </Animated.View>
    </MessageWrapper>
  );
});

Subscriptions.displayName = "Subscriptions";

import React from "react";
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
  if (subscription && checkSubscription(subscription.id, data)) {
    return null;
  }
  return (
    <MessageWrapper>
      <Message message={subscription} />
    </MessageWrapper>
  );
});

Subscriptions.displayName = "Subscriptions";

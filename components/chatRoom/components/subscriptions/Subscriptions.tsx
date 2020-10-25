import React from "react";
import { Message } from "../messages/message/Message";
import { Message as MessageProps } from "../messages/Messages";

interface SubscriptionsProps {
  subscription: MessageProps;
}

export const Subscriptions = React.memo<SubscriptionsProps>(({ subscription }) => {
  return <Message message={subscription} />;
});

Subscriptions.displayName = "Subscriptions";

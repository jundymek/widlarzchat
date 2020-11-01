import { createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { API_TOKEN } from "@env";
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

export const link = split((operation) => hasSubscription(operation.query), websocketLink, authedHttpLink);

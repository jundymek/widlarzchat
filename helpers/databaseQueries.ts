import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query Rooms {
    usersRooms {
      user {
        email
        firstName
        lastName
        id
        role
      }
      rooms {
        id
        name
      }
    }
  }
`;

export const GET_ROOM = gql`
  query Room($roomId: String!) {
    room(id: $roomId) {
      id
      name
      messages {
        body
        id
        insertedAt
        user {
          email
          firstName
          id
          lastName
          role
        }
      }
      user {
        email
        firstName
        id
        lastName
        role
      }
    }
  }
`;

export const NEW_MESSAGE = gql`
  mutation($roomId: String!, $body: String!) {
    sendMessage(roomId: $roomId, body: $body) {
      body
      id
    }
  }
`;

export const UPDATE_MESSAGES = gql`
  subscription($roomId: String!) {
    messageAdded(roomId: $roomId) {
      body
      id
      insertedAt
      user {
        email
        firstName
        id
        lastName
        role
      }
    }
  }
`;

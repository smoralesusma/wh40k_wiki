import { gql } from "@apollo/client";
import { GraphQLQueryNames } from "@/lib/graphql/graphql-query-enums";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Character {
    id: Int!
    name: String!
    description: String
    background: String
    role: String
  }

  type Article {
    id: Int!
    title: String!
    type: String!
    url_id: String!
    characters: [Character!]!
  }

  type Query {
    ${GraphQLQueryNames.GET_CHARACTER}(id: ID!): Article!
  }

  type Mutation {
    ${GraphQLQueryNames.USER_SIGNUP}(username: String!, email: String!, password: String!): AuthPayload!
    ${GraphQLQueryNames.USER_LOGIN}(emailOrUsername: String!, password: String!): AuthPayload!
  }
`;

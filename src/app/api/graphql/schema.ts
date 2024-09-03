import { gql } from "@apollo/client";
import { CharacterFields, GraphQLQueryNames } from "@/lib/graphql/graphql-query-enums";

export const typeDefs = gql`
  type Character {
    ${CharacterFields.ID}: ID!
    ${CharacterFields.NAME}: String!
    ${CharacterFields.DESC}: String
  }

  type Query {
    ${GraphQLQueryNames.GET_CHARACTER}(${CharacterFields.ID}: ID!): Character
    ${GraphQLQueryNames.GET_CHARACTERS}: [Character]
  }

  type Mutation {
    ${GraphQLQueryNames.CREATE_CHARACTER}(${CharacterFields.NAME}: String!, ${CharacterFields.DESC}: String): Character
    ${GraphQLQueryNames.UPDATE_CHARACTER}(${CharacterFields.ID}: ID!, ${CharacterFields.NAME}: String, ${CharacterFields.DESC}: String): Character
    ${GraphQLQueryNames.DELETE_CHARACTER}(${CharacterFields.ID}: ID!): Boolean
  }
`;

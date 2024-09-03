import getGQLStringQuery from "./graphql-query-builder";
import { CharacterFields, GraphQLQueryNames } from "./graphql-query-enums";

export const GET_CHARACTER = getGQLStringQuery(
  "query",
  GraphQLQueryNames.GET_CHARACTER,
  [CharacterFields.NAME],
  { [CharacterFields.ID]: { type: "ID!" } }
);

export const GET_CHARACTERS = getGQLStringQuery(
  "query",
  GraphQLQueryNames.GET_CHARACTERS,
  [CharacterFields.NAME]
);
import getGQLStringQuery from "./graphql-query-builder";
import { GraphQLQueryNames } from "./graphql-query-enums";

export const USER_LOGIN = getGQLStringQuery(
  "query",
  GraphQLQueryNames.GET_CHARACTERS,
  ["token", "user"],
  {
    username: { type: "String!" },
    email: { type: "String!" },
    password: { type: "String!" },
  }
);

export const USER_SIGNIN = getGQLStringQuery(
  "query",
  GraphQLQueryNames.GET_CHARACTERS,
  ["token", "user"],
  {
    emailOrUsername: { type: "String!" },
    password: { type: "String!" },
  }
);

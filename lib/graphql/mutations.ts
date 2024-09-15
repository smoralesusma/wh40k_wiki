import getGQLStringQuery from "./graphql-query-builder";
import { GraphQLQueryNames } from "./graphql-query-enums";

export const USER_LOGIN = getGQLStringQuery(
  "mutation",
  GraphQLQueryNames.USER_LOGIN,
  ["token", "user"],
  {
    username: { type: "String!" },
    email: { type: "String!" },
    password: { type: "String!" },
  }
);

export const USER_SIGNUP = getGQLStringQuery(
  "mutation",
  GraphQLQueryNames.USER_SIGNUP,
  ["token", "user"],
  {
    emailOrUsername: { type: "String!" },
    password: { type: "String!" },
  }
);

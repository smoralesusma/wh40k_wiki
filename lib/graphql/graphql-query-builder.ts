import { gql } from "@apollo/client";
import * as gql_builder from "gql-query-builder";

import { GraphQLQueryNames } from "./graphql-query-enums";

const getGQLStringQuery = (
  type: "query" | "mutation",
  operation: GraphQLQueryNames,
  fields: string[],
  variables?: any
) => {
  const query = gql(
    gql_builder[type]({
      operation,
      fields,
      variables,
    }).query
  );

  return JSON.parse(JSON.stringify(query));
};

export default getGQLStringQuery;

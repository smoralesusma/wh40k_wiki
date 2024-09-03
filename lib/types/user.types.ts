import { UserFields } from "@/lib/graphql/graphql-query-enums";

export interface User {
  [UserFields.ID]: number;
  [UserFields.USERNAME]: string;
  [UserFields.EMIAL]: string;
  [UserFields.PASSWORD_HASH]: string;
  [UserFields.ROLE]: string;
  [UserFields.CREATED_AT]: Date;
  [UserFields.UPDATED_AT]: Date;
}

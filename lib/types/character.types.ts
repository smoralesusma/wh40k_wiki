import { CharacterFields } from "@/lib/graphql/graphql-query-enums";

export interface Character {
  [CharacterFields.ID]: string;
  [CharacterFields.NAME]: string;
  [CharacterFields.DESC]?: string;
}
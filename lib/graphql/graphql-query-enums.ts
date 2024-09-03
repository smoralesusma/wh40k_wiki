export enum GraphQLQueryNames {
  GET_CHARACTER = "read_character",
  GET_CHARACTERS = "read_characters",
  CREATE_CHARACTER = "create_character",
  UPDATE_CHARACTER = "update_character",
  DELETE_CHARACTER = "delete_character",
  USER_LOGIN = "user_login",
  USER_SIGNUP = "user_signup",
}

export enum CharacterFields {
  ID = "id",
  NAME = "name",
  DESC = "description",
}

export enum UserFields {
  ID = "id",
  USERNAME = "username",
  EMIAL = "email",
  PASSWORD_HASH = "password_hash",
  ROLE = "role",
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
}

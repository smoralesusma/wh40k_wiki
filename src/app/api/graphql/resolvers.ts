import db from "@/lib/db";
import { GraphQLQueryNames } from "@/lib/graphql/graphql-query-enums";

export const resolvers = {
  Query: {
    [GraphQLQueryNames.GET_CHARACTER]: async (
      _: any,
      { id }: { id: string }
    ) => {
      const result = await db.query("SELECT * FROM characters WHERE id = $1", [
        id,
      ]);
      return result.rows[0] || null;
    },
    [GraphQLQueryNames.GET_CHARACTERS]: async () => {
      const result = await db.query("SELECT * FROM characters");
      return result.rows;
    },
  },
  Mutation: {
    [GraphQLQueryNames.CREATE_CHARACTER]: async (
      _: any,
      { name, description }: { name: string; description?: string }
    ) => {
      const result = await db.query(
        "INSERT INTO characters (name, description) VALUES ($1, $2) RETURNING *",
        [name, description]
      );
      return result.rows[0];
    },
    [GraphQLQueryNames.UPDATE_CHARACTER]: async (
      _: any,
      {
        id,
        name,
        description,
      }: { id: string; name?: string; description?: string }
    ) => {
      const result = await db.query(
        "UPDATE characters SET name = $1, description = $2 WHERE id = $3 RETURNING *",
        [name, description, id]
      );
      return result.rows[0] || null;
    },
    [GraphQLQueryNames.DELETE_CHARACTER]: async (
      _: any,
      { id }: { id: string }
    ) => {
      const result = await db.query(
        "DELETE FROM characters WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rowCount ? result.rowCount > 0 : false;
    },
    /* [GraphQLQueryNames.USER_LOGIN]: async (
      _: any,
      { email, password }: { email: string, password: string }
    ) => {
      const result = await db.query(
        "DELETE FROM characters WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rowCount ? result.rowCount > 0 : false;
    },
    [GraphQLQueryNames.USER_SIGNUP]: async (
      _: any,
      { email, password }: { email: string, password: string }
    ) => {
      const result = await db.query(
        "DELETE FROM characters WHERE id = $1 RETURNING *",
        [id]
      );
      return result.rowCount ? result.rowCount > 0 : false;
    }, */
  },
};

import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

import { GraphQLQueryNames } from "@/lib/graphql/graphql-query-enums";
import { GraphqlContext } from "@/lib/types/graphql.types";
import { users } from "@prisma/client";

export const resolvers = {
  Query: {
    /* [GraphQLQueryNames.GET_CHARACTER]: async (
      _: any,
      { id }: { id: number },
      context: GraphqlContext
    ) => context.prisma.characters.findFirst({ where: { id } }),
    [GraphQLQueryNames.GET_CHARACTERS]: async (
      _: any,
      {}: any,
      context: GraphqlContext
    ) => context.prisma.characters.findMany(), */
  },
  Mutation: {
    [GraphQLQueryNames.USER_SIGNUP]: async (
      _: any,
      args: { username: string; email: string; password: string },
      context: GraphqlContext
    ): Promise<{ token: string; user: users }> => {
      const { username, email, password } = args;
      const existingUser = await context.prisma.users.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (existingUser) throw new Error("Username or email is already in use");

      const hashedPassword = await hash(password, 10);

      const user = await context.prisma.users.create({
        data: {
          username,
          email,
          password_hash: hashedPassword,
          role: "USER",
        },
      });

      const token = sign({ userId: user.id }, process.env.NEXTAUTH_SECRET ?? "", {
        expiresIn: "1d",
      });

      context.res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 86400,
          path: "/",
        })
      );

      return {
        token,
        user,
      };
    },

    [GraphQLQueryNames.USER_LOGIN]: async (
      _: any,
      args: { emailOrUsername: string; password: string },
      context: GraphqlContext
    ): Promise<{ token: string; user: users }> => {
      const { emailOrUsername, password } = args;
      const user = await context.prisma.users.findFirst({
        where: {
          OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
        },
      });

      if (!user) {
        throw new Error("No user found with this email or username");
      }

      const valid = await compare(password, user.password_hash);
      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = sign({ userId: user.id }, process.env.NEXTAUTH_SECRET ?? "", {
        expiresIn: "1d",
      });

      context.res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 86400,
          path: "/",
        })
      );

      return {
        token,
        user,
      };
    },
  },
};

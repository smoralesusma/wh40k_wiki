import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";

import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const prisma = new PrismaClient();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export { handler as GET, handler as POST };

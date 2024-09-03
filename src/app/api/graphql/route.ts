import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
// import allowCors from "../../../../lib/cors";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export { handler as GET, handler as POST };

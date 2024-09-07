import { PrismaClient } from "@prisma/client";

export interface GraphqlContext {
  prisma: PrismaClient;
  req: any;
  res: any;
}

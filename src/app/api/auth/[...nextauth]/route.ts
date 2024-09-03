import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Client } from "pg";
import bcrypt from "bcrypt";

const client = new Client({
  connectionString: `postgresql://${process.env.DB_USER}:${
    process.env.DB_PASSWORD
  }@${process.env.DB_HOST}:${parseInt(process.env.DB_PORT as string, 10)}/${
    process.env.DB_NAME
  }?sslmode=require`,
});
client.connect();

const maxAge = 24 * 60 * 60;

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await client.query(
          "SELECT * FROM users WHERE username = $1",
          [credentials?.username]
        );
        const user = res.rows[0];

        if (
          user &&
          bcrypt.compareSync(credentials?.password ?? "", user.password_hash)
        ) {
          return { id: user.id, username: user.username, role: user.role };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge,
  },
  jwt: {
    maxAge,
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const POST = NextAuth(authOptions);
export const GET = NextAuth(authOptions);

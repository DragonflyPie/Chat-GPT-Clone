import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "Guest" },
        password: { label: "password", type: "password" },
      },
      authorize: (credentials) => {
        return {
          id: "guest",
          email: "guest",
          name: "guest",
          image: "/guest.png",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
  pages: {
    // signIn: "/auth/signIn",
  },
};
export default NextAuth(authOptions);

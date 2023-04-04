import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // username: { label: "username", type: "text", placeholder: "Guest" },
        // password: { label: "password", type: "password" },
      },
      authorize: () => {
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
  ],
};
export default NextAuth(authOptions);

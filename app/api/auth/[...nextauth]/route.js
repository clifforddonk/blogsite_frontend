import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Use @next-auth/prisma-adapter
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Use bcryptjs instead of bcrypt

// Initialize Prisma Client
const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma), // Use the Prisma adapter
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000, // Increase timeout for OAuth requests
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If user doesn't exist or doesn't have a password, return null
        if (!user || !user.password) return null;

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // If passwords don't match, return null
        if (!passwordMatch) return null;

        // Return the user object if everything is valid
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add the user ID to the session
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Add the user ID to the JWT token
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your .env file
  debug: true, // Enable debugging for development
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

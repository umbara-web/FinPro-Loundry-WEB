import NextAuth, { DefaultSession, User as NextAuthUser } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends NextAuthUser {
    email: string;
    name: string;
    role: string;
    accessToken: string;
    refreshToken: string;
    isVerified?: boolean;
  }

  interface Session extends DefaultSession {
    user: {
      email: string;
      name: string;
      role: string;
      image?: string | null;
      isVerified: boolean;
    } | null;
    accessToken?: string | null;
    error?: string | null;
  }

  type AdapterUser = User;
}

declare module 'next-auth/jwt' {
  interface JWT {
    email?: string | null;
    name?: string | null;
    role?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    error?: string | null;
    isVerified?: boolean;
  }
}

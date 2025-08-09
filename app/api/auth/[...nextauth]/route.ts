import NextAuth, { AuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';
import { compare, hashSync } from 'bcrypt';
import { UserRole } from '@prisma/client';

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'E-mail', type: 'email' },
        password: { label: 'Пароль', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!findUser) {
          return null;
        }

        const isPasswordsValid: boolean = await compare(credentials.password, findUser.password);

        if (!isPasswordsValid || !findUser.verified) {
          return null;
        }

        return {
          id: findUser.id,
          name: findUser.fullName,
          email: findUser.email,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [{ provider: account?.provider, providerId: account?.providerAccountId }, { email: user.email }],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || 'User №' + user.id,
            password: hashSync(user.id.toString(), 10), // TODO лучше не передавать id в качестве пароля
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        return true;
      } catch (err) {
        console.error('Error signing', err);
        return false;
      }
    },
    async jwt({ token }) {
      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email || '',
        },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.fullName = findUser.fullName;
        token.email = findUser.email;
        token.role = findUser.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

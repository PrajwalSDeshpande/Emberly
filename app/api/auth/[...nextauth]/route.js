import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import connectDb from '@/db/connectDb';
import User from '@/models/User';

export const authoptions = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "github") {
                await connectDb()
                const userEmail = user.email || `${profile?.login || "user"}@github.com`
                const username = (profile?.login || (user.email ? user.email.split("@")[0] : "user")).toLowerCase()

                let currentUser = await User.findOne({ email: userEmail })
                if (!currentUser) {
                    currentUser = await User.create({
                        email: userEmail,
                        username: username,
                        name: user.name || username,
                        profilepic: user.image || "",
                    })
                }
                return true
            }
            return true
        },

        async session({ session, user, token }) {
            await connectDb()
            if (session?.user?.email) {
                const dbUser = await User.findOne({ email: session.user.email })
                if (dbUser) {
                    session.user.name = dbUser.username
                }
            }
            return session
        },
    }
})

export { authoptions as GET, authoptions as POST }
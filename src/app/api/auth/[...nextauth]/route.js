// api/auth/dynamic of auth
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@/utils/database';

// call thew function NextAuth and provider the optiion object
const handler = NextAuth({
    // first have providers is array
    providers: [
        // call function and provide options object (client Id and client secret)
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    // get session first and only
    async session({session}){

    },
    // get profile right here
    async signIn({profile}){

    }
})

export { handler as GET, handler as POST};



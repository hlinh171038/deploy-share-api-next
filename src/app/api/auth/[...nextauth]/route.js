// api/auth/dynamic of auth
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@/utils/database';
import User from '../../../../models/user';


// call thew function NextAuth and provider the optiion object
const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    // first have providers is array
    providers: [
        // call function and provide options object (client Id and client secret)
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
         // get session first and only
        // get data to use  
        async session({session}){
            const sessionUser = await User.findOne({
                email:session.user.email
            })
            session.user.id = sessionUser._id.toString();
            return session;
        },
        // get profile right here
        // signIn function automatically create to db
        async signIn({profile}){
            try {
                await connectToDB();

                // check if a user already esixts
                const userExsits  =  await User.findOne({
                    email:profile.email
                });
                // if not, create a new user
                if(!userExsits) {
                    await User.create({
                        email:profile.email,
                        username:profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
                    })
                }
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        }
    }
   
})

export { handler as GET, handler as POST};



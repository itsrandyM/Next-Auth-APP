import prisma from "@/lib/prisma"
import { AuthOptions } from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import * as bcrypt from 'bcrypt'
import NextAuth from "next-auth"
import { User } from "@prisma/client"
//import { Session } from "inspector"

export const authOptions : AuthOptions = {
    pages:{
        signIn:"/auth/signin"
    },
    session: {
        strategy: "jwt",
      },
      jwt: {
        secret: process.env.NEXTAUTH_SECRET,
      },
    providers : [

        CredentialsProvider({
            name:"Credentials",
            credentials:{

                 username: {
                    label:"User Name",
                    type: "text",
                    placeholder: "Your user name"
                 },
                 password: {
                    label:"Password",
                    type: "password"
                 }
            },
            async authorize(credentials){
                const user= await prisma.user.findUnique({
                    where:{
                        email: credentials?.username
                    }
                })
             
                if(!user) throw new Error("User name or password not correct")
               
                if(!credentials?.password) throw new Error("Please provide your password")
                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
            
                if(!isPasswordCorrect) throw new Error("User name or password incorrect")
                
                const {password, ...userWithoutPass} = user
                console.log("Authorized User:", userWithoutPass)
                return userWithoutPass
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
          if (user) 
          console.log("Setting token.user:", user)
          token.user = user as User
          return token
        },
    
        async session({ token, session }) {
          session.user = token.user
          console.log("Setting session.user:", session.user)
          return session
        },
      },
}



const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


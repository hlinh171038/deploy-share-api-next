// connect to db
import {connectToDB} from '../../../../utils/database'
import Prompt from '../../../../models/prompt'

export const POST = async (req,res) => {
    const {userId, prompt, tag} = await req.json()
    //return new Response(JSON.stringify(tag))
    try {
        await connectToDB()
         const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
         })  
         await newPrompt.save();
         // status 201 :success
         return new Response(JSON.stringify(newPrompt), {
            status: 201
         })
    } catch (error) {
        // server fail
        return new Response("Failed to create a new prompt",{status:500})
    }
}
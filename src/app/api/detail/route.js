import { connectToDB } from "@/utils/database";
import Prompt from '../../../models/prompt'


export const GET = async (reqest) =>{
    try {
        await connectToDB()
        const prompts = await Prompt.find()
        return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        return new Response('fails to fetch ',{status: 500})
    }
}
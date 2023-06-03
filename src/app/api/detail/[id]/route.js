import { connectToDB } from "@/utils/database";
import Prompt from '../../../../models/prompt'


export const GET = async (reqest,{params}) =>{
    try {
        await connectToDB()
        const prompts = await Prompt.findById(params.id).populate('creator')
        return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        return new Response('fails to fetch ',{status: 500})
    }
}
import {connectToDB } from '../../../../utils/database'
import Prompt from '../../../../models/prompt'


//GET (read)
// get specific one by id
export const GET = async (request, {params}) =>{
    try {
        await connectToDB();

        const prompts = await Prompt.findById(params.id).populate('creator')

        if(!prompts) return new Response("Prompt not foound",{status:404})

        return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        return new Response('fails to fetch ',{status: 500})
    }
}
// PATCH (update)

export const PATCH = async (request,{params}) =>{
    const {prompt,tag} = await request.json();
    try {
        await connectToDB();

        const existPrompt = await Prompt.findById(params.id);

        if(!existPrompt) return new Response('Prompt not exist',{status:404})

        existPrompt.prompt = prompt;
        existPrompt.tag = tag;

        await existPrompt.save()

        return new Response(JSON.stringify(existPrompt),{status:200})
    } catch (error) {
        return new Response('fails to fetch ',{status: 500})
    }
}

//DELETE (delete)

export const DELETE = async (requset, {params}) =>{
    try {
        await connectToDB()
        await Prompt.findByIdAndRemove(params.id);

        return new Response(" Prompt delete successfully", {status:200})
    } catch (error) {
        return new Response('fails to fetch ',{status: 500})
    }
}
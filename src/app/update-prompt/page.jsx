'use client'
import React, { useEffect } from 'react'
import { useState} from 'react'
import {useSession} from 'next-auth/react'
import { useRouter, useSearchParams} from 'next/navigation'
import Form from '@/components/Form'

const page = () => {
  const router = useRouter();
  const {data:session}  = useSession();
  const [submitting,setSubmitting] = useState(false)
  // const [post,setPost]=useState({
  //   prompt:'',
  //   tag:'',
  // })
  const [prompt,setPrompt] = useState('')
  const [tag,setTag] = useState('')
 
  // use search params to get query from link
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

    const updatePrompt =async(e) =>{
        e.preventDefault()
        setSubmitting(true)
        // check prompt Id is exist or not
            if(!promptId) return alert('Prompt Id not found')

        // fectch (trycatch)
        try {
            const response = await fetch(`/api/prompt/${promptId}`,{
                method:"PATCH",
                body:JSON.stringify({
                    prompt:prompt,
                    tag:tag
                })
            })
            const data = await response.json()

           if(response.ok){
            router.push('/');
           }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }
    }
 
  useEffect(()=>{
    const getPromptDetails = async () =>{
        const response = await fetch(`api/prompt/${promptId}`)
        const data = await response.json();

       setPrompt(data.prompt)
       setTag(data.tag)
    }
    if(promptId) getPromptDetails()
  },[promptId])
  return (
    <Form
    type="Edit"
    // post={post}
    // setPost={setPost}
    prompt={prompt}
    setPrompt={setPrompt}
    tag={tag}
    setTag={setTag}
    submitting={submitting}
    handleSubmit = {updatePrompt}
    >

    </Form>
  )
}

export default page




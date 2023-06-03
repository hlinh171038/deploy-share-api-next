'use client'
import React from 'react'
import { useState} from 'react'
import {useSession} from 'next-auth/react'
import { useRouter} from 'next/navigation'
import Form from '@/components/Form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const createPrompt = async (e) =>{
    e.preventDefault()
 

   // check amount of charector
   if(prompt.length<70){
   // alert('Prompt at lesest 200 charector');
      toast.warn('Prompt at lesest 70 charector', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    return ;
   }
   if( tag[0] !=='#'){
    console.log('try')
    toast.warn('Tag must have # charactor', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return 
   }
   if(tag.length<2 ){
    console.log('try')
    //alert('Tag  at lesest 3 charector ')
    toast.warn('Tag  at lesest 3 charector', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return 
   }
     // turn setSubmiting is true because i want to use that loader
     setSubmitting(true)
    // create the first prompt
     try {
      // call some kind of API endpoint
      const response = await fetch('api/prompt/new',{
        method: "POST",
        body:JSON.stringify({
          prompt:prompt,
          userId:session?.user.id,
          tag:tag
        })
      })
      console.log(tag)
      console.log(prompt)
       // check if response ok -->home page
       if(response.ok) {
        router.push('/')
       }

     } catch (error) {
        console.log(error)
     } finally {
      setSubmitting(false);
    
     }

  }

  return (
    <Form
    type="CREATE"
    // post={post}
    // setPost={setPost}
    prompt={prompt}
    setPrompt={setPrompt}
    tag={tag}
    setTag={setTag}
    submitting={submitting}
    handleSubmit = {createPrompt}
    >

    </Form>
  )
}

export default page


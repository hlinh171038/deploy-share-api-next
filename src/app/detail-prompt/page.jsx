'use client'
import PromptCard from '@/components/PromptCard'
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [details,setDetails] =useState([])
    const [posts,setPosts] = useState([])


   const searchParams = useSearchParams();
   const promptId = searchParams.get('id');

  //  console.log(promptId)
  //  console.log(details)
  //  console.log(posts)


    // useEffect(()=>{
    //     console.log(promptId)
    //     axios.get(`/api/detail`)
    //     .then(res =>{
    //         console.log(res.data)
    //         setDetails(res.data)
    //     }).catch(error =>{
    //         console.log(error)
    //     })
    // },[promptId])

    // users
    useEffect(() => { 
      console.log(promptId)
       const fetchPosts = async () => {
         console.log(promptId)
         const response = await fetch(`/api/users/${promptId}/posts`);
         const data = await response.json();
        
         setPosts(data);
       };
   
       if (promptId){
         fetchPosts()
       }else{
         console.log(promptId)
       }
     }, [promptId]);
  return (
    <div className='mt-10  space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
      {posts && posts.filter(item => item.creator._id === promptId).map(item =>{
        return <PromptCard post={item} />
      })}
    </div>
  )
}

export default page

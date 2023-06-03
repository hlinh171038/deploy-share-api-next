'use client'

import React from 'react'
import {useState,useEffect} from 'react'
import {useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import Profile from '../../components/Profile'
import axios from 'axios'


const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [posts,setPosts] = useState([]);
    
   
    // console.log(posts)
    // console.log(linh)
    console.log(typeof(session?.user.id))
    console.log(session?.user.id)
    
    const handleEdit =(post)=>{
      console.log('try')
      router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async(post)=>{
      const hasConfirmed = confirm("Are you sure you want to delete this prompt ?");

      if(hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id}`,{
            method: 'DELETE'
          });

          const filteredPosts = posts.filter((p)=>p._id !== post._id)
          setPosts(filteredPosts)
        }catch(error){
          console.log(error)
        }
      }
    }
    //handle detail
    const detail = (id) =>{
      console.log(id)
      console.log('detail')
    }
    useEffect(() => { 
       console.log(session?.user.id)
        const fetchPosts = async () => {
          console.log(session?.user.id)
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        };
    
        if (session?.user.id){
          fetchPosts()
        }else{
          console.log(session?.user.id)
        }
      }, [session?.user.id]);
  return (
    <Profile name="My " 
            desc="Webcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            detail='linh'
            />
  )
}

export default MyProfile

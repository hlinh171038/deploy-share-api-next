'use client'

import React from 'react'
import {useState,useEffect} from 'react'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import { usePathname,useRouter } from 'next/navigation'

const PromptCard = ({post,handleTagClick,handleEdit,handleDelete,handleDetail,handleDetailId}) => {
  const {data:session} = useSession()
  const pathName = usePathname();
  const router = useRouter();
  const [copied,setCopied] = useState('')


  const handleCoppy =() =>{
    console.log(post.prompt)
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    //reset the state
    setTimeout(()=>setCopied(''),3000)
  }

  // const detail2 =() =>{
  //   console.log('detail')
  // }
  console.log(post)
  // console.log(pathName)
  // console.log(session?.user.id)
  // console.log(post.creator._id)
  return (
    <div className='flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit mb-3'>
      <div className='flex jsutify-between items-start gap-5'>
        {/* <Image
          src={post.creator.image}
          alt="user_image"
          width={40}
          height={40}
          className='rounded-full object-contain'
          /> */}

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold
            text-gray-900' onClick={handleDetail}>
              {post.creator.username} 
            </h3>
            <p className='fontinter text-sm text-grey-500' >
              {post.creator.email}
              </p>
          </div>
          <div 
              className=" w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
              onClick={handleCoppy}
          >
              <Image 
                src={copied === post.prompt
                    ? '/assets/icons/tick.svg'
                    : '/assets/icons/copy.svg'
                }
                width={12}
                height={12}
              />
          </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700' onClick={handleDetailId}>{post.prompt.substring(0,60)}...</p>
      <p 
        onClick={()=> handleTagClick && handleTagClick(post.tag)}
        className='font-inter text-sm bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent cursor-pointer'>
         {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-3 flex gap-4 justify-center border-t border-grey-100 pt-3'>
          <p 
            onClick={handleEdit}
            className='font-inter text-sm bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent'>
            Edit
          </p>
          <p 
            onClick={handleDelete}
            className='font-inter text-sm bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard

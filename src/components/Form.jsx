 import React from 'react'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Form = ({type,post,setPost,submitting,handleSubmit,prompt,setPrompt,tag,setTag}) => {
  
  return (
   
    <section className='w-full max-w-full flex-start flex-col'>
       <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left'>
        <span className='bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>{type} POST</span>
      </h1>
      <p className='desc text-left max-w-md '>
        {type } and share amazing prompt with the world, and let your
        imagination run eild with any AI-powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >
          <label htmlFor="">
            <span className='font-satoshi font-semibold
            text-bold text-gray-500'>
              Your AI Prompt (at lesest 100 character)
            </span>
            <textarea
              value={prompt}
              onChange={e=>setPrompt(e.target.value)}
              placeholder='write your prompt here ...'
              required
              className=' w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0'>

            </textarea>
          </label>
          <label htmlFor="">
            <span className='font-satoshi font-semibold
            text-bold text-gray-500'>
              Tag {` `}
              <span>(#product,#webdevelopment, #idea)</span>
            </span>
            <input
              value={tag}
              onChange={e=>setTag(e.target.value)}
              placeholder='#tag'
              required
              className='w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0 '/>
          </label>
          <div className='flex-end mx-3 mb-5 gap-4'>
            <Link href='/' className='text-gray-600 text-sm bg-slate-200 rounded-full px-5 py-1.5' >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className='px-5 py-1.5 text-sm bg-orange-600 rounded-full text-white ml-5'
              >
                {submitting ? `${type}...`:type}
              </button>
          </div>
        </form>
    </section>
  )
}

export default Form

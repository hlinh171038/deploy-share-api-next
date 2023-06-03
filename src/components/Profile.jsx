import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({name,desc, data, handleEdit, handleDelete}) => {
  const detail2 =()=>{
    console.log('detsaio')
  }
  console.log(data)
  return (
    <section className='w-full'>
        <h1 className=' mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl'>
          <span className='bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>{name} Profile </span>
        </h1>
        <p className='desc text-left'>{desc}</p>
        <div className='mt-10  space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
        {data && data.map(item =>{
          return <PromptCard 
                      key={item._id} 
                      post={item} 
                      handleEdit={()=> handleEdit && handleEdit(item)}
                      handleDelete={()=>handleDelete && handleDelete(item)}
                     
                  />
        })}
    </div>
    </section>
  )
}

export default Profile

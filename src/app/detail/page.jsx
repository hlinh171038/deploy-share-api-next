'use client'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'

const page = () => {
    const [detailsData, setDetailsData] = useState([])
    const searchParms = useSearchParams()
    const id = searchParms.get('id')

    console.log(id)
    console.log(detailsData.creator && detailsData.creator._id)
    useEffect
    useEffect(()=>{
        axios.get(`/api/detail/${id}`)
        .then(res =>{
            console.log(res.data)
            setDetailsData(res.data)
        }).catch(error =>{
            console.log(error)
        })
    },[])
  return (
    <div className='container'>
        <div className='w-full border border-solid border-1 rounded-full  text-gray-600 p-2'>
           <span className='block'> {detailsData.creator && detailsData.creator.email}</span>
            <span>{detailsData.creator && detailsData.creator.username}</span>
            
        </div>
        <div className='w-full border border-solid border-1 text-gray-600 p-2'>
            <p className='text'>{detailsData && detailsData.prompt}</p>
            <div>{detailsData && detailsData.tag}</div>
        </div>
    </div>
  )
}

export default page

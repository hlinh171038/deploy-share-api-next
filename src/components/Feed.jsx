'use client'
import React,{useState,useEffect, useRef}  from 'react'
import PromptCard from './PromptCard'
import { useRouter } from 'next/navigation'
import CancelIcon from '@mui/icons-material/Cancel';

const PromptCardList = ({data, handleTagClick,handleDetail,handleDetailId}) =>{
  console.log(data)
  return (
    <div className='mt-16  space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
        {data && data.map(item =>{
          return <PromptCard key={item._id} post={item} handleTagClick={handleTagClick} handleDetail={() =>handleDetail(item.creator._id)} handleDetailId={()=>handleDetailId(item._id)}/>
        })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] =useState('')
  const [rootData,setRootdata] = useState([])
  const [posts,setPosts] =useState([])
  const [crossReset,setCrossReset] = useState(false)
  const [select,setSelect] =useState('')
  const searchRef = useRef()
  const router = useRouter();

  const handleSearchChange = (e) =>{
    e.preventDefault()
    
    console.log('try')
    if(searchText ===''){
      setCrossReset(false)
      return;
    }
    console.log(searchText)
    let contentSearch = searchText;

    const result =[...rootData].filter(item =>{
      return item.prompt.toLowerCase().includes(contentSearch) 
            || item.tag.includes(contentSearch) 
            || item.creator.username.toLowerCase().includes(contentSearch);
    })
    console.log(result)
     if(result.length>0 ){
      setCrossReset(true)
      setPosts(result)
      return 
     }else{
      setCrossReset(false)
      alert('not found')
      setPosts(rootData)
     }
    
  }
  // serch with tag
  const handleSearchTag = (tag) =>{
    setCrossReset(true)
    const result = [...rootData].filter(item =>{
      return  item.tag === tag 
    })
    console.log(result)
    setPosts(result)
    
  }

  const handleTagClick = (tag) =>{
    setSearchText(tag)
    console.log(searchRef.current.value)
    searchRef.current.value = tag
    //search with key = tag
    handleSearchTag(tag)
  }

  // handle detail
  const handleDetail =(id) =>{
    console.log(id)
    router.push(`/detail-prompt?id=${id}`)
  }

  // handle reset search
  const handleResetSearch =() =>{
    console.log('try')
    setCrossReset(false)
    setSearchText('')
    setPosts(rootData)
  }
  // handle select to filter
  const handleSelectToFilter = (value) =>{
    setSelect(value)
    console.log(value)
  }
  // handle detail by id '
  const handleDetailId = (id) =>{
    console.log('id');
    console.log(id);
    router.push(`/detail?id=${id}`)
  }
  useEffect(()=>{
    const fectchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();

      setPosts(data)
      setRootdata(data)
    }
    fectchPosts()
  },[])
  return (
    <section>
      <form className='relative w-full flex-center flex '>
        <input type="text"
                placeholder='Search for a tag or a username'
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
                required
                className='search_block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 peer'
                ref ={searchRef}
                />
        <button onClick={handleSearchChange} className='bg-slate-800 px-1.5 py-2 rounded-lg text-white cursor-pointer'>Search</button>
        {/* <select 
          class="form-select mt-3"
          value={select}
          onChange={(e)=>handleSelectToFilter(e.target.value)}
        >
          <option value="">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>*/}
      </form> 
      {crossReset && 
      <div className="mx-2 my-3">
        <span className=''>There are {posts.length} items </span>
        <span onClick={handleResetSearch} className='text-sm'><CancelIcon className="text-red-500 "/></span>
      </div> }
      <PromptCardList
        data={posts}
        handleTagClick ={handleTagClick}
        handleDetail ={handleDetail}
        handleDetailId={handleDetailId}
      />
    </section>
  )
}

export default Feed

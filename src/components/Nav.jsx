'use client'

import React from 'react'
import Link from 'next/link'
// automatically update ima
import Image from 'next/image'
// use some hook
import {useState, useEffect} from 'react'
import  {signIn, signOut, useSession, getProviders} from 'next-auth/react'


const Nav = () => {
    // use nest sessin hook to get current data
    const {data: session } =useSession();

    const [providers,setProviders] = useState(null)
    const [toggleDropDown,setToggleDropDown] = useState(false)

    useEffect(()=>{
        const setUpProvider = async () =>{
            const response = await getProviders();
            setProviders(response)
        }
        setUpProvider();
    },[])
  return (
    <nav className='flex justify-between w-full mb-16 pt-3'>
        <Link href="/" className="flex gap-2 flex-center" >
            <Image 
                src="/assets/images/logo.svg"
                alt="Promptopia Logo"
                width={30}
                height={30}
                className='object-contain'
            />
            <p className='logo_text'>Promptopia</p>
        </Link>
      
        {/*Desktop Navigation*/ }
        <div className='sm:flex hidden'>
            {session?.user ? (
           
                <div className='flex gap-3 md:gap-5 mr-5 text-white   '>
                    <Link href="/create-prompt" className='mr-1  bg-slate-900  px-3 py-1 rounded-lg' >
                        Create Post
                    </Link>

                    <button type="button" onClick={signOut} className='outline_btn bg-slate-900  px-3 py-1 rounded-lg'>
                        Sign out
                    </button>
                    <Link href="/profile">
                        <Image 
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt="profile"
                        />
                    </Link>
                    
                </div>
            ):(
                <>
                {providers && Object.values(providers).map((provider)=>{
                    return (
                        <button 
                            type="button"
                            key={provider.name}
                            className="bg-slate-900 rounded-lg text-white p-1"
                            onClick={()=>signIn(provider.id)}
                        >
                            Sign In 
                        </button>
                    )
                })}
                </>
            )}
        </div>
        
          {/*Mobile Navigation*/ }
          <div className='sm:hidden flex relative'>
            {session?.user ? (
                <div className="flex">
                    <Image 
                            src="/assets/images/logo.svg"
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt="profile"
                            onClick={()=>{setToggleDropDown((pre)=>!pre)}}
                        />

                        {toggleDropDown && (
                            <div className="absolute bg-slate-300 top-9 right-1 p-1 w-100">
                                <Link href='/profile' className='dropdown_link' onClick={()=> setToggleDropDown(false)
                                }> 
                                    My Profile
                                </Link>
                                <br/>
                                <Link href='/create-prompt' className='dropdown_link' onClick={()=> setToggleDropDown(false)
                                }> 
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={()=>{
                                        setToggleDropDown(false)
                                        signOut()
                                    }}
                                    className='mt-5 w-full bg-slate-900  px-3 py-1 rounded-lg text-white '
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                </div>
            ):(
                <>
                {providers && Object.values(providers).map((provider)=>{
                    return (
                        <button 
                            type="button"
                            key={provider.name}
                            classname="black_btn"
                            onClick={()=>signIn(provider.id)}
                        >
                            Sign In
                        </button>
                    )
                })}
                </>
            )}
          </div>
    </nav>
  )
}

export default Nav

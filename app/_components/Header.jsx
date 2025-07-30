'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import { CartContext } from '../_context/CartContext'
import CartApis from '../_utils/CartApis'
import Cart from './Cart'
import Link from 'next/link'
import './Header.css'
function Header() {
  const [openCart , setOpenCart] = useState(false)
  const {user} = useUser()
  const [openMenu , setOpenMenu] = useState(false)
  useEffect(()=>{
      user&&getCartItems()
  },[user])
  const {cart , setCart}= useContext(CartContext)
  console.log(cart);
  const navList =()=>{
    openMenu ? setOpenMenu(false) : setOpenMenu(true)
  }
  

  const getCartItems =()=>{
      CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(res=>{
        console.log('response fom cart' , res.data.data);
        res?.data?.data.forEach(cartItem => {
          
          setCart((oldCart)=>[
            ...oldCart,
            {
              id :cartItem.documentId,
              product : cartItem.products[0]
            }
          ])
        });
        
      })
  }

  
  return <>
 <header className="bg-white dark:bg-gray-400">
  <div className="shadow-md mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Image src='/logo.svg' alt='logo' width={50} height={50} />

    <div className="flex flex-1 items-center justify-end md:justify-between position-relative">
      <nav aria-label="Global" className="">
        <ul className={`md:flex items-center gap-6 ${openMenu ? 'openlist' :''}` }>

        <li>
            <a
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="/"
            >
              Home
            </a>
          </li>

          <li>
            <a
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="#"
            >
              Explore
            </a>
          </li>

          <li>
            <a
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="#"
            >
              Projects
            </a>
          </li>

          <li>
            <a
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="#"
            >
              About Us
            </a>
          </li>

          <li>
            <a
              className="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
              href="#"
            >
              Contact Us
            </a>
          </li>




        </ul>
      </nav>

      <div className="flex items-center gap-4">
      {!user ?
          <div className="flex  gap-4 ">

          <a
            className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500"
            href="#"
          >
            <SignInButton/>
          </a>

          <a
            className=" rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
            href="#"
          >
            <SignUpButton/>
          </a>
        </div> :
                  <div
                  className=" rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                  href="#"
                >
                  <UserButton/>
                </div>
        }
        

        <button
          className="block nav-icon rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
        onClick={navList}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>

</>

}

export default Header

'use client'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from './_components/Header'
import Footer from './_components/Footer'
import { CartContext } from './_context/CartContext'
import { useState } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

export default function RootLayout({
  children,}) {
    const [cart,setCart]=useState([])
  return (
    <ClerkProvider>
      <CartContext.Provider value={{cart , setCart}}>
      <html lang="en">
        <body className={`${geistSans.variable}  antialiased`}>
          <Header/>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            {/* <SignedOut> */}
              {/* <SignInButton /> */}
              {/* <SignUpButton /> */}
            {/* </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
          </header>
          {children}
          
          <Footer/>
          
        </body>
      </html>
      </CartContext.Provider>
    </ClerkProvider>
  )
}
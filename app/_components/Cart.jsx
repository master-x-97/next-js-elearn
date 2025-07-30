import React, { useContext } from 'react'
import { CartContext } from '../_context/CartContext'
import Link from 'next/link';
import Image from 'next/image';

function Cart() {
    const {cart ,setCart} = useContext(CartContext);
    console.log(cart);
    
  return <>
  <div className='h-[300px] w-[250px]
  bg-gray-100 z-10 rounded-md border shadow-sm absolute mx-10 right-20 top-12 p-5 overflow-auto '>

<div className="mt-4 space-y-6">
    <ul className="space-y-4">
        {cart?.map((item)=>{
            return (
                <li key={item.id} className="flex items-center gap-4">
                    <Image
                        src={item.product?.banner[0]?.url || "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"}
                        alt="img"
                        width={40}
                        height={40}
                        className="size-16 rounded-sm object-cover"
                    />

                    <div>
                    <h3 className="text-sm text-gray-900">{item.product?.title}</h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                                <dt className="inline">Price:</dt>
                                <dd className="inline">${item.product?.price}</dd>
                            </div>
                        </dl>                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                                <dt className="inline">Category:</dt>
                                <dd className="inline">{item.product?.category}</dd>
                            </div>
                        </dl>
                    </div>
                </li>
            );
        })}
    
      </ul>
      </div>
      <div className="space-y-4 text-center mt-5">
      <Link
        href="/cart"
        className="block rounded-sm border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
      >
        View my cart {(cart.length)}
      </Link>



      <a
        href="#"
        className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
      >
        Continue shopping
      </a>
    </div>
  </div>
  
  </>
}

export default Cart

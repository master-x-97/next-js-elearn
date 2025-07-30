'use client'
import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react';
import React, { useContext } from 'react'
import SkeletonProductInfo from './SkeletonProductInfo';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CartApis from '../../../_utils/CartApis';
import { CartContext } from '../../../_context/CartContext';

function ProductInfo({product}) {
    console.log(product);
    const {user} =useUser()
    const router = useRouter()
    const {cart , setCart}=useContext(CartContext)
    const handleAddToCart= ()=>{
        if(!user){
            router.push('/sign-in')
        }else{
            const data={
                data :{
                    username:user.fullName,
                    email:user.primaryEmailAddress.emailAddress,
                    products:[product?.documentId]
                }
            };
            CartApis.addToCart(data).then(res=>{
                console.log('success', res.data.data);
                setCart(oldCart=>[
                    ...oldCart,
                    {
                        id :res?.data?.data?.documentId,
                        product
                    }
                ])
                
            }).catch(error=>{
                console.log('error',error);
                
            })
        }
    }
    
    
  return <>
{product?.description[0].children[0].text ?   <div className='ms-10'> 
  <h3 className='text-[20px] ' >{product?.title}</h3>
  <h3 className='text-[15px] text-gray-400'>{product?.category}</h3>
  <h4 className='text-[15px]'>{product?.description[0].children[0].text}
  </h4>
  <h6 className='flex gap-2 text-gray-400'> {product?.instantDelivery ? <BadgeCheck className='text-green-500 w-5 h-5'/>:<AlertOctagon/>} Eligible For Instant Drlivery</h6>
    <h3 className='text-[32px] font-bold ' >${product?.price}</h3>  
  <button onClick={handleAddToCart} className='p-4  flex gap-2 bg-teal-400 text-white font-bold rounded-lg hover:bg-teal-600'><ShoppingCart/> Add to cart</button>
  </div> : <SkeletonProductInfo/> }


  </>
}

export default ProductInfo


// function ProductInfo({product}) {
//     const {user} =useUser()
//     const router = useRouter()
//     const handleAddToCart= ()=>{
//         if (!user) {
//             router.push('/sign-in');
//             return;
//         }

//         if (!product?.documentId) {
//             console.error('Product ID is missing');
//             return;
//         }

//         console.log('User fullName:', user.fullName);
//         console.log('User email:', user.primaryEmailAddress.emailAddress);
//         console.log('Product ID:', product.documentId);

//         const data = {
//             data: {
//                 username: user.fullName,
//                 email: user.primaryEmailAddress.emailAddress,
//                 products: [product.documentId]
//             }
//         };

//         console.log('Final data being sent:', JSON.stringify(data, null, 2));

//         CartApis.addToCart(data)
//             .then(res => {
//                 console.log('Success:', res);
//             })
//             .catch(error => {
//                 if (error.response?.data?.error) {
//                     console.log('Error details:', error.response.data.error);
//                     console.log('Full error details:', JSON.stringify(error.response.data.error, null, 2));
//                 }
//                 console.log('Error response:', error.response?.data);
//                 console.log('Error status:', error.response?.status);
//             });
//     }

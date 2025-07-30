import Image from 'next/image'
import React from 'react'

function ProductBanner({product}) {
    // console.log(product);
    
  return <>
  { product?.banner[0].url ?    <div className='me-2'>
      <Image
      src={product?.banner[0].url}
      alt='product-details-banner'
      width={700}
      height={700}
      className='rounded-lg min-w-80'
      />
    </div> :    <div className='w-[600px] h-[600px] bg-slate-200 rounded-lg animate-pulse'>

    </div> }


    </>
    
  
}

export default ProductBanner

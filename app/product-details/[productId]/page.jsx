'use client'
import BreadCrumb from '../../_components/BreadCrumb';
import ProductApis from '../../_utils/ProductApis'
import React, { use, useEffect, useState } from 'react'
import ProductBanner from './_components/ProductBanner';
import ProductInfo from './_components/ProductInfo';
import ProductList from '../../_components/ProductList';
import {  usePathname } from 'next/navigation';

function ProductDetails({params , }) {
    const resolvedParams = use(params); // unwrap الـ params
  const productId = resolvedParams.productId;
  const [productDetails,setProductDetails]=useState()
  const [productList,setProductList]=useState([])
  const path = usePathname();
  console.log(path);
  
  
    useEffect(()=>{
        getProductById_()
    },[productId])


    const getProductById_=()=>{
        ProductApis.getProductById(productId).then(res=>{
          setProductDetails(res?.data?.data)
          getProdutListByCategory(res?.data?.data)
            console.log(res.data.data);
            console.log(productId);
            
            
        })

    const getProdutListByCategory = (product)=>{
      ProductApis.getProductByCategory(product?.category).then(res=>{
        console.log(res?.data?.data);
        setProductList(res?.data?.data)
        
      })
    }    
    }
  return <>
  <div className='px-10 md:px-28 py-20'>
  <BreadCrumb path={path}/>
  <div className='mt-10 sm:grid justify-around grid-cols-2 sm:grid-cols-2 gap-5 sm:gap-0'>
    <ProductBanner product={productDetails} />
    <ProductInfo  product={productDetails}/>
  </div>
  </div>
  <h2 className=' mb-5 text-center font-bold text-2xl'>Similar product</h2>
  <ProductList productList={productList}/>
  </>
}

export default ProductDetails

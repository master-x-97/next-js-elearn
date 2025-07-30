import {  List } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from 'next/link'
import { useParams } from "next/navigation";

function ProductItem({ product  }) {

  return (
    <>  

      
      <Link href={`/product-details/${product.documentId}`}
        
        className="group relative block overflow-hidden hover:border hover:shadow-lg my-10"
      >
        <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
          <span className="sr-only">Wishlist</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        <Image
          src={product?.banner[0]?.url}
          alt="banner"
          width={400}
          height={350}
          className="h-60 w-full rounded-t-3xl  px-2 has-[170px] object-cover"
        />

        <div className="relative border border-gray-100 bg-white p-6">
          <p className="text-gray-700">
            {product?.price}
            <span className="text-gray-400 line-through">$80</span>
          </p>

          <h3 className="mt-1.5 text-lg font-medium text-gray-900 line-clamp-1">
            {product?.title}
          </h3>

          <p className="mt-1.5 line-clamp-3 text-gray-700">
            {product?.description[0].children[0].text}
          </p>
          <h3 className="flex gap-1">
            <List className="w-5" />
            {product?.category}
          </h3>

          <form className="mt-4 flex gap-4">
            {/* <button className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
              Add to Cart
            </button> */}

            {/* <button
              type="button"
              className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
            >
              Buy Now
            </button> */}
          </form>
        </div>
      </Link>

    </>
  );
}

export default ProductItem;

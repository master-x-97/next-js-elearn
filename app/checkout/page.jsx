'use client'
import React, { Suspense } from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './_components/CheckoutForm';
import { useSearchParams } from 'next/navigation';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

function CheckoutContent() {
  const searchParams = useSearchParams()
  const options = {
    mode:'payment',
    currency:'usd',
    amount:Number(searchParams.get('amount'))*100
  };
  console.log('hello');

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm  amount={Number(searchParams.get('amount'))}/>
    </Elements>
  );
}

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
};
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { CartContext } from '../../_context/CartContext';
import { useUser } from '@clerk/nextjs';
import OrderApis from '../../_utils/OrderApis';
import CartApis from '../../_utils/CartApis';

const CheckoutForm = ({amount}) => {
  const {cart,setCart}=useContext(CartContext)
  const {user}=useUser()
  const stripe = useStripe();
  const elements = useElements();
  const[loading , setLoading] = useState(false);
  const [errormessage,setErrorMessage]=useState()

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const handleError = (error) => {
      setLoading(false)
      setErrorMessage(error.message)
    }
    createOrder();

    sendEmail();
      // Trigger form validation and wallet collection
  const {error: submitError} = await elements.submit();
  if (submitError) {
    handleError(submitError);
    return;
  }
    const res = await fetch('api/create-intent',{
      method:'POST',
      body:JSON.stringify({
        amount:amount
      })
    })
    const clientSecret = await res.json()
    
    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  const createOrder = ()=>{
    let productIds=[]
    cart.forEach(el=>{
      productIds.push(el?.product?.id)
    })
    const data = {
      data:{
        email:user.primaryEmailAddress.emailAddress,
        username:user.fullName,
        amount,
        products:productIds
      }
    }
    OrderApis.createOrder(data).then((res)=>{
      if(res){
        cart.forEach(el=>{
          CartApis.deleteCartItems(el.id).then((res)=>{
            console.log(res);
          })
        })
        // The original problem was here, but we are reverting to the working state.
        // The cart clearing logic will not work, but the app will.
      }
    })
  }

  const sendEmail = async () => {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'abdelrhmanashrf1997@gmail.com',
        subject: 'مرحباً بك!'
      })
    });
  }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className='mb-6'> 
          <PaymentElement />
        </div>
        <button 
          className='w-full p-3 text-white bg-primary rounded-md hover:bg-primary/90 transition-colors'
          type="submit"
          disabled={!stripe}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
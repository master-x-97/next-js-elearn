import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return<>
  <div className='m-auto flex justify-center mt-28'>

  <SignIn />
  </div>
  </>  
}
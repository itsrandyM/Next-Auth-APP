import SignupForm from "@/app/components/SignupForm"
import { Link } from "@nextui-org/react"
import Image from 'next/image'


function SignupPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-3'>
   <div className='md:col-span-2 flex justify-center items-center'>

<p className='md:col-span-2 p-2'>Already signed up?</p>
<Link href={'/auth/signin'}>Sign In</Link>
</div>
<SignupForm />
<Image src='/login.png' alt='Login Form' width={400} height={400} />
    </div>
  )
}

export default SignupPage
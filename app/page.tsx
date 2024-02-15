'use client'
import Image from "next/image";
import './styles/index.scss'
import Nav from "@/components/Nav";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [regform, setregform] = useState(false)
  const [regtype, setregtype] = useState('')

  const regModul =  (type : string) => {
    type == "signup" ? setregtype('signup') : setregtype("signin")
    setregform(true)
  }


  
  type TPrivateDetailsSchema = z.infer<typeof PrivateDetailsSchema>
  type TKnownAsSchema = z.infer<typeof KnownAsSchema>

  const PrivateDetailsSchema = z.object({
    email: z.string().email('enter valid email'),
    password: z.string().min(8, 'passwords must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'confirm passwords must be at least 8 characters')
  }).refine((data) => data.confirmPassword == data.password, {
    message : "Passwords doesn't match",
    path : ['confirmPassword']
  })

  const KnownAsSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    NickName: z.string().min(5, 'NickName must be at least 5 characters'),
  })

  const validationSchema = nextstep ? PrivateDetailsSchema : KnownAsSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<TPrivateDetailsSchema>({
    resolver : zodResolver(validationSchema),
  })

  const Fsubmit = (data: TPrivateDetailsSchema | TKnownAsSchema) => {
    dispatch(setUserInfo(data))
    dispatch(nextStep(true))
    reset()
  }

  return (
    <main className="w-full min-h-[100vh] bg-[#181818] flex flex-col items-center justify-center">
      {/* <Nav/> */}
      {regform && (
        <>
        <div className="w-full h-full bg-black bg-opacity-55 top-0 left-0 absolute"></div>
        <div className="flex flex-col items-center justify-center absolute left-1/2 py-1 md:py-6 top-1/2 translate-x-[-50%] translate-y-[-50%] w-5/6 h-2/3 rounded-lg bg-[#8CADA7] md:w-[450px]">
          <p onClick={() => {
            setregform(false)
            setregtype('')
          }} className="absolute right-4 top-2 cursor-pointer">X</p>
          <h1 className="text-3xl text-white">{regtype == "signup" ? "Sign up" : "Sign in"}</h1>
          {regtype == "signup" ? (
            <>
          <div className="flex flex-col h-[50%] justify-between w-full px-10 md:gap-12 mt-3 md:mt-12">
          <input className="h-10 md:h-12 rounded-lg outline-none px-2 text-black shadow-lg shadow-black" placeholder="Enter NickName" type="text" />
          <input className="h-10 md:h-12 rounded-lg outline-none px-2 text-black shadow-lg shadow-black" placeholder="Enter email" type="text" />
          <input className="h-10 md:h-12 rounded-lg outline-none px-2 text-black shadow-lg shadow-black" placeholder="Enter password" type="password" />
          <input className="h-10 md:h-12 rounded-lg outline-none px-2 text-black shadow-lg shadow-black" placeholder="Confirm password" type="password" />
          </div>
          <button className="w-fit px-2 md:px-9 h-fit py-3 mt-6 md:py-5 rounded-xl shadow-lg shadow-[#181818] bg-[#181818] text-white">Create Account</button>
          <p onClick={() => setregtype('signin')} className="cursor-pointer text-[15px] text-blue-900 underline mt-4">already have an account?</p>
            </>
          ) : (<>
           <div className="flex flex-col h-3/5 md:h-2/5 w-full px-10 gap-12 mt-12 md:mt-24 py-7">
          <input className="h-12 rounded-lg outline-none px-2 text-black shadow-lg shadow-black" placeholder="Enter email" type="text" />
          <input className="h-12 rounded-lg outline-none px-2 text-black shadow-lg shadow-black" placeholder="Enter password" type="password" />
          </div>
          <button className="w-fit px-9 py-3 md:px-9 h-fit md:py-5 mt-2 rounded-xl shadow-lg shadow-[#181818] bg-[#181818] text-white">LogIn</button>
          <p onClick={() => setregtype('signup')} className="cursor-pointer text-[15px] text-blue-900 underline mt-4">Do not have an account?</p>
          </>)}
        </div>
        </>
      )}
      <h1 id="head_txt" className="text-[#F2F4CB] text-4xl text-center px-3 xl:text-[70px]">Register to Gugatweet for amazing experience</h1>
      <div className="w-full lg:w-[60%] flex items-center justify-center gap-11 xl:gap-32 mt-8 xl:mt-24">
        <button onClick={() => regModul('signup')} className="xl:w-48 xl:h-16 xl:text-[25px] w-32 h-12 bg-[#F2F4CB] rounded-xl shadow-2xl shadow-black">Sign up</button>
        <button onClick={() => regModul('signin')}  className="xl:w-48 xl:h-16 xl:text-[25px] w-32 h-12 bg-[#F2F4CB] rounded-xl shadow-2xl shadow-black">Sign in</button>
      </div>
    </main>
  );
}

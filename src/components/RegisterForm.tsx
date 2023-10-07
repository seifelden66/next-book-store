"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !email || !password) {
            setError('fill all inputs')
            return
        }

        try {
            const res = await fetch('api/userExists', {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                     email
                })
            })

            const {user} = await res.json()
            if(user){
                setError('user already exists')
                return
            }

            await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            const form = e.target
            form.reset();
            console.log(name)
            router.push("/")
            setError("")


        } catch (error) {

        }

    }
    return (
        <div className='flex items-center justify-center h-screen text-xs sm:text-sm md:text-base'>
            <form onSubmit={handleSubmit} className="flex flex-col mx-auto
             rounded-lg gap-6 p-5 shadow-lg border-t-4 border-green-500">

                <div className='flex justify-between gap-3 items-center'>
                    <label htmlFor="name">name</label>
                    <input id="name" placeholder='name' className='border p-1' onChange={e => setName(e.target.value)} />
                </div>
                <div className='flex justify-between gap-3 items-center'>
                    <label htmlFor="email">email</label>
                    <input id="email" placeholder='email' className='border p-1' onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='flex justify-between gap-3 items-center'>
                    <label htmlFor="password">password</label>
                    <input id="password" placeholder='password' className='border p-1' onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="bg-green-500 p-1 w-full text-white"> submit </button>
                {error && <h1 className="text-red-700">{error}</h1>}
                <Link href={'/'}>login</Link>
            </form>
        </div>
    )
}

export default RegisterForm
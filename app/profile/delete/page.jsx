'use client'

import Link from "next/link"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DeleteUser = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {

        if (session?.user.email === email) return setIsDisabled(false);

        return setIsDisabled(true)

    }, [username, email])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`/api/users/${session?.user.id}/delete`, { method: 'DELETE' });

            if (response.ok) {
                router.push('/');
            }
            
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <section className="w-full">
            <div className="w-full">
                <h1 className='head_text text-left orange_gradient'>Account Deletion</h1>

                <p className="desc">
                    <span className="text-red-600 font-bold text-2xl">
                        Warning!
                    </span> Deleting your account will delete all your data from our servers. It will also erase all the prompts that you created. Are you sure you want to delete your account ?</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
            >
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Enter Your Username
                    </span>

                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter your Username'
                        required
                        className='form_input'
                    />
                </label>

                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Enter your email to confirm
                    </span>

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter your email'
                        required
                        className='form_input'
                    />
                </label>

                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href='/' className='text-gray-500 text-sm' >
                        Cancel
                    </Link>

                    <button type='submit' disabled={isDisabled} className={`px-5 pb-1.5 pt-1 text-sm ${isDisabled ? 'bg-primary-orange/60' : 'bg-primary-orange'} rounded-full text-white`}>
                        Delete
                    </button>
                </div>
            </form>
        </section>
    )
}

export default DeleteUser

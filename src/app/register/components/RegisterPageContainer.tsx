"use client"
import React, { useState } from 'react'
import RegisterUserForm from './RegisterUserForm'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Check, CheckCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const RegisterPageContainer = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    console.log(isSuccess)
    return (
        <div className="w-screen h-screen grid place-items-center">
            <div className="max-w-[1500px] w-full mx-auto space-y-5 px-4">
                {
                    isSuccess ? <Card className="p-7 h-full max-w-[500px] mx-auto grid gap-5">
                        <div className="size-24 rounded-full bg-green-600  mx-auto grid place-items-center p">
                            <Check className="size-16 text-white" strokeWidth={4} />
                        </div>
                        <p className="text-lg text-center text-neutral-800">You have <span className="font-semibold">successfully</span> created your account. Please wait for the administrator to approve your account. Thank you!</p>
                        <Link href="/sign-in">
                            <Button variant={"success"} className="w-full">
                                Sign In
                            </Button>
                        </Link>
                    </Card> : <>
                        <Image src="/logo/seer-tracker.svg" height={300} width={450} alt="app logo" className='object-contain mx-auto w-60 sm:w-80 lg:w-96' />
                        <h1 className="text-3xl font-semibold">
                            Register
                        </h1>
                        <RegisterUserForm setIsSuccess={setIsSuccess} />
                    </>

                }
            </div>
        </div>
    )
}

export default RegisterPageContainer
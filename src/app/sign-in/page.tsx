"use client";
import Image from 'next/image'
import React from 'react'
import SigInForm from './components/SigInForm'
import { useUserSession } from '@/context/session.context'
import { ROLES_OBJ } from '@/constants/index.types'
import { useRouter } from 'next/navigation';

const SignInPage = () => {
    const { user } = useUserSession();
    const router = useRouter();

    if([ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN].includes(user?.role)) {
        router.push("/admin")
        return;
    } else if(user?.role) {
        router.push("/")
        return;
    }

    return (
        <div className='w-screen h-screen flex items-center'>
            <div className="mx-auto max-w-lg flex-1 space-y-7">
                <Image src="/logo/seer-tracker.svg" height={400} width={550} alt="app logo" className='object-contain' />
                <SigInForm />
            </div>
        </div>
    )
}

export default SignInPage
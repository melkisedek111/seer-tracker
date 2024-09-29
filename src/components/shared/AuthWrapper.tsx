"use client";
import { useUserSession } from '@/context/session.context'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'
import LoadingPage from './LoadingPage';
import Unauthorized from './Unauthorized';

type TAuthWrapperProps = {
    children: ReactNode;
    roles: string[]
}

const AuthWrapper = ({ roles, children }: TAuthWrapperProps) => {
    const { isLoadingUser, session, role } = useUserSession();
    const router = useRouter();
    
    console.log(session, isLoadingUser)
    if(isLoadingUser) return <LoadingPage />
    
    if(!session) {
        router.push("/sign-in");
        return;
    }

    if(!roles.some(r => role?.includes(r))) {
        return <Unauthorized /> 
    }

    return children
}

export default AuthWrapper
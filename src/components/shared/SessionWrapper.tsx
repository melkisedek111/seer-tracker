"use client";
import { useUserSession } from '@/context/session.context'
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'
import LoadingPage from './LoadingPage';

type TSessionWrapperProps = {
    children: ReactNode;
}

const SessionWrapper = ({ children }: TSessionWrapperProps) => {
    const { isLoadingUser, session } = useUserSession();
    const router = useRouter();
    
    if(isLoadingUser) return <LoadingPage />
    
    if(!session) {
        router.push("/sign-in");
    }

    return children
}

export default SessionWrapper
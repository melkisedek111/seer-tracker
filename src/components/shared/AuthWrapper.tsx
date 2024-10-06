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
    const { role } = useUserSession();

    if(!roles.some(r => role?.includes(r))) {
        return <Unauthorized /> 
    }

    return children
}

export default AuthWrapper
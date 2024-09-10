"use client";
import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import { usePathname } from 'next/navigation';

const PageContainer = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const NO_SIDEBAR = [
        "/sign-in"
    ]

    if (!NO_SIDEBAR.includes(pathname)) {
        return <Sidebar>
            {children}
        </Sidebar>
    }

    return children
}

export default PageContainer
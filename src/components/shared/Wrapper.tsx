"use client";
import React, { ReactNode } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ArrowLeftFromLine, ChevronLeft } from 'lucide-react';
import { useUserSession } from '@/context/session.context';
import { ROLES_OBJ } from '@/constants/index.types';

type TWrapperProps = {
    title: string;
    children: ReactNode;
    extraElement?: any
}

const Wrapper = ({ title, children, extraElement }: TWrapperProps) => {
    const pathname = usePathname();
    const { user } = useUserSession();
    const router = useRouter();
    const paths = pathname.split("/");
    const isAdmin = [ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN].includes(user?.role || "");
    const [_, dashboard, second, third] = paths;

    const dashboardPath = isAdmin ? "admin" : "";
    const secondPath = isAdmin ? second : dashboard;
    const thirdPath = isAdmin ? third : second;
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-2 lg:p-6 !pb-10">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/${dashboardPath}`}>Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {
                        secondPath && <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`${dashboardPath ? "/" : ""}/${secondPath || ""}`} className="capitalize">{(secondPath)?.split("-").join(" ")}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    }
                    {
                        thirdPath && <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`${dashboardPath ? "/" : ""}/${secondPath}/${thirdPath || ""}`} className="capitalize">{(thirdPath)?.split("-").join(" ")}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    }
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {
                        paths.length > 2 && <span onClick={() => router.back()} className="cursor-pointer"><ChevronLeft strokeWidth={1.5} className="mt-1 text-muted-foreground" /></span>
                    }
                    <h1 className="text-lg font-semibold md:text-2xl capitalize">{title}</h1>
                </div>
                {extraElement && extraElement}
            </div>
            <hr />
            <div className="flex-1 items-center justify-center w-full">
                {children}
            </div>
        </main >
    )
}

export default Wrapper
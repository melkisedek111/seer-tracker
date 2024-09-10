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

type TWrapperProps = {
    title: string;
    children: ReactNode;
    extraElement?: any
}

const Wrapper = ({ title, children, extraElement }: TWrapperProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const paths = pathname.split("/");
    const [_, dashboard, secondPath, thirdPath] = paths;

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-2 lg:p-6 !pb-10">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={`/${dashboard}`}>Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {
                        secondPath && <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`/${dashboard}/${secondPath}`} className="capitalize">{secondPath.split("-").join(" ")}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    }
                    {
                        thirdPath && <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`/${dashboard}/${secondPath}/${thirdPath}`} className="capitalize">{thirdPath.split("-").join(" ")}</Link>
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
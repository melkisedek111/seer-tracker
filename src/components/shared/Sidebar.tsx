"use client"
import { Bell, CircleUser, Cog, FileText, Home, LineChart, ListCheck, Menu, Package, Package2, Search, ShoppingCart, User, Users } from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode } from 'react'
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import TopBar from './Topbar';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type TSidebarProps = {
    children: ReactNode;
}

const Sidebar = ({ children }: TSidebarProps) => {
    const pathname = usePathname();

    const ADMIN_LINKS = [
        {
            link: "/admin",
            title: "Dashboard",
            Icon: Home
        },
        {
            link: "/admin/users",
            title: "Users",
            Icon: User
        },
        {
            link: "/admin/requests",
            title: "Requests",
            Icon: ListCheck
        },
        {
            link: "/admin/settings",
            title: "Settings",
            Icon: Cog
        },
        {
            link: "/admin/designations",
            title: "Designations",
            Icon: FileText
        },
    ]

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Image src="/logo/seer-tracker.svg" height={100} width={200} className="object-contain" alt="app logo" />
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {
                                ADMIN_LINKS.map(link => (
                                    <Link
                                        href={link.link}
                                        className={
                                            cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", pathname.startsWith(link.link) && "text-primary")
                                        }
                                    >
                                        <link.Icon className="h-4 w-4" />
                                        {link.title}
                                    </Link>
                                ))
                            }
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card x-chunk="dashboard-02-chunk-0">
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <CardTitle>Upgrade to Pro</CardTitle>
                                <CardDescription>
                                    Unlock all features and get unlimited access to our support
                                    team.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <TopBar />
                {children}
            </div>
        </div>
    )
}

export default Sidebar
"use client";
import Wrapper from '@/components/shared/Wrapper'
import { Card } from '@/components/ui/card'
import { APP_LINKS } from '@/constants/links'
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();

    const settingLings = [
        {
            link: APP_LINKS.ADMIN.SETTINGS.MAIN,
            title: "General",
        },
        {
            link: APP_LINKS.ADMIN.SETTINGS.SERVICE_CATEGORIES,
            title: "Service Categories",
        },
        {
            link: APP_LINKS.ADMIN.SETTINGS.ROLES,
            title: "Roles",
        },
        {
            link: APP_LINKS.ADMIN.SETTINGS.POSITIONS,
            title: "Positions",
        },
        {
            link: APP_LINKS.ADMIN.SETTINGS.DEPARTMENTS,
            title: "Departments",
        },
    ]
    return (
        <Wrapper title={"Settings"}>
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
                <div className="grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[150px_1fr]">
                    <nav
                        className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                    >
                        {
                            settingLings.map(link => (
                                <Link key={link.title} href={link.link} className={cn("font-semibold", (pathname === link.link || pathname.startsWith(`${link.link}/`)) && "text-primary")}>
                                    {link.title}
                                </Link>
                            ))
                        }
                    </nav>
                    <Card className="grid gap-6 p-4">
                        {children}
                    </Card>
                </div>
            </main>
        </Wrapper>

    )
}

export default layout
import React from 'react'
import MetricCards from './MetricCards'
import RequestsTable from './RequestsTable'
import LatestRequestCard from '@/app/admin/components/LatestRequestCard'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import RequestCard from '@/components/shared/RequestCard'
import RequestCardInsight from '@/components/shared/RequestCardInsight'

const HomePageContainer = () => {
    return (
        <main className="grid grid-cols-6 gap-3">
            <div className="col-span-4 space-y-3">
                <MetricCards />
                <div className="grid grid-cols-4 space-y-3">
                    <div className="flex items-center justify-between w-full col-span-4">
                        <h1 className="text-xl font-bold">Latest Requests</h1>
                        <Link href="/requests" className="text-primary">
                            See more
                        </Link>
                    </div>
                    <RequestsTable />
                </div>
            </div>
            <div className="col-span-2 relative">
                <div className=" top-0 sticky">
                    <RequestCardInsight />
                </div>
            </div>
        </main>
    )
}

export default HomePageContainer
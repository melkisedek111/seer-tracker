import React from 'react'
import MetricCards from './MetricCards'
import RequestsTable from './RequestsTable'
import LatestRequestCard from '@/app/admin/components/LatestRequestCard'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

const ServicePageContainer = () => {
    return (
        <main className="grid grid-cols-4 gap-3">
            <div className="col-span-3 space-y-3">
                <MetricCards />
                <div className="grid grid-cols-4 space-y-3">
                    <div className="flex items-center justify-between w-full col-span-4">
                        <h1 className="text-xl font-bold">Latest Requests</h1>
                        <Link href="/service/requests" className="text-primary">
                            See more
                        </Link>
                    </div>
                    <RequestsTable />
                </div>
            </div>
            <Card className="cols-span-1 p-4 space-y-5">
                <h1 className="text-xl font-bold">Latest High Priority</h1>
                <div className="overflow-y-auto max-h-[500px] space-y-4">
                    <LatestRequestCard />
                    <LatestRequestCard />
                    <LatestRequestCard />
                    <LatestRequestCard />
                    <LatestRequestCard />
                </div>
            </Card>
        </main>
    )
}

export default ServicePageContainer
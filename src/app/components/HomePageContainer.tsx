"use client";
import React, { useState } from 'react'
import MetricCards from './MetricCards'
import RequestsTable from './RequestsTable'
import LatestRequestCard from '@/app/admin/components/LatestRequestCard'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import RequestCard from '@/components/shared/RequestCard'
import RequestCardInsight, { TRequestCardInsightProps } from '@/components/shared/RequestCardInsight'
import { getRequestAction } from '../actions/request.actions';

const HomePageContainer = () => {
    const [request, setRequest] = useState<TRequestCardInsightProps>();

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
                    <RequestsTable setRequestDetails={setRequest}/>
                </div>
            </div>
            <div className="col-span-2 relative">
                <div className=" top-0 sticky">
                    {
                        !request && <div className="w-full text-muted-foreground text-center">
                            No Selected Request
                        </div>
                    }
                    {
                        (request && request?._id) && <RequestCardInsight {...request} />
                    }
                </div>
            </div>
        </main>
    )
}

export default HomePageContainer
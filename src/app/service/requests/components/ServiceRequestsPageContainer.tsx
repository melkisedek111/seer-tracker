import RequestFilters from '@/components/shared/RequestFilters'
import React from 'react'
import RequestCard from './RequestCard'

const ServiceRequestsPageContainer = () => {
    return (
        <main className="grid space-y-5">
            <RequestFilters />
            <div className="grid grid-cols-4 gap-6">
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
            </div>
        </main>
    )
}

export default ServiceRequestsPageContainer
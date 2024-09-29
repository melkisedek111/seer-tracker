import React from 'react'
import RequestFilters from './RequestFilters'
import RequestCard from '@/components/shared/RequestCard'

const RequestPageContainer = () => {
    return (
        <main className="grid space-y-5">
            <RequestFilters />
            <div className="grid grid-cols-3 gap-6">
                <RequestCard />
                <RequestCard />
                <RequestCard />
                <RequestCard />
            </div>
        </main>
    )
}

export default RequestPageContainer
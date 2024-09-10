import React from 'react'
import RequestsTable from './RequestsTable'
import { Card } from '@/components/ui/card'
import LatestRequestCard from '@/components/shared/LatestRequestCard'

const RequesterPageContainer = () => {
  return (
    <main className="grid grid-cols-4 gap-3">
      <div className="col-span-3 space-y-3">
        <div className="grid grid-cols-4 space-y-3">
          <div className="flex items-center justify-between w-full col-span-4">
            <h1 className="text-xl font-bold">Your Requests</h1>
          </div>
          <RequestsTable />
        </div>
      </div>
      <Card className="cols-span-1 p-4 space-y-5">
        <h1 className="text-xl font-bold">Department's Requests</h1>
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

export default RequesterPageContainer
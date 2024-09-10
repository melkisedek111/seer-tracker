import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'
import PositionsTable from './PositionsTable'
import { CreatePositionFormDialog } from './CreatePositionFormDialog'

const PositionPageContainer = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Positions</h1>
                <CreatePositionFormDialog />
            </div>
            <hr />
            <Card className="p-4">
                <PositionsTable />
            </Card>
        </div>
    )
}

export default PositionPageContainer
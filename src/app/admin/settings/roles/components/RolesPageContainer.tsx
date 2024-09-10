import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'
import RolesTable from './RolesTable'

const RolesPageContainer = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Roles</h1>
                <Button size="sm" className="flex items-center gap-2">
                    <Plus />
                    Create Roles
                </Button>
            </div>
            <hr />
            <Card className="p-4">
                <RolesTable />
            </Card>
        </div>
    )
}

export default RolesPageContainer
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'
import DepartmentsTable from './DepartmentsTable'
import CreateDepartmentFormDialog from './CreateDepartmentFormDialog'

const DepartmentPageContainer = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Departments</h1>
                <CreateDepartmentFormDialog />
            </div>
            <hr />
            <Card className="p-4">
                <DepartmentsTable />
            </Card>
        </div>
    )
}

export default DepartmentPageContainer
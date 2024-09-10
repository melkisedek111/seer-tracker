import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'
import ServicesTable from './ServicesTable'
import CreateServiceCategoryDialog from './CreateServiceCategoryDialog'

const ServicesPageContainer = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Services</h1>
                <CreateServiceCategoryDialog />
            </div>
            <hr />
            <Card className="p-4">
                <ServicesTable />
            </Card>
        </div>
    )
}

export default ServicesPageContainer
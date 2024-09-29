import { Card } from '@/components/ui/card'
import { CheckSquare, Clock, Flag, List } from 'lucide-react'
import React from 'react'

const MetricCards = () => {
    return (
        <div className="grid grid-cols-4 gap-3">
            <Card className="p-4">
                <div className="flex items-center justify-between">
                    <p>Total Completed Request</p>
                    <CheckSquare />
                </div>
                <h1 className="text-3xl font-bold">320</h1>
                <p className="text-sm text-muted-foreground">+20% from the last month</p>
            </Card>
            <Card className="p-4">
                <div className="flex items-center justify-between">
                    <p>Total Current Request</p>
                    <Clock />
                </div>
                <h1 className="text-3xl font-bold">25</h1>
                <p className="text-sm text-muted-foreground">+20% from the last month</p>
            </Card>
            <Card className="p-4">
                <div className="flex items-center justify-between">
                    <p>Total High Priority</p>
                    <Flag />
                </div>
                <h1 className="text-3xl font-bold">30</h1>
                <p className="text-sm text-muted-foreground">+10% from the last month</p>
            </Card>
            <Card className="p-4">
                <div className="flex items-center justify-between">
                    <p>Total Request</p>
                    <List />
                </div>
                <h1 className="text-3xl font-bold">300</h1>
                <p className="text-sm text-muted-foreground">+40% from the last month</p>
            </Card>
        </div>
    )
}

export default MetricCards
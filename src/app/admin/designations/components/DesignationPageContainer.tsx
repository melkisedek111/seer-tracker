
import React from 'react'
import DesignationCard from './DesignationCard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const DesignationPageContainer = () => {
    const data = [
        {
            "fullName": "John Smith",
            "position": "Instructor III",
            "employeeNumber": "2023-20123",
            "homeAddress": "123 Maple Street, Cityville",
            "designation": "Recommending Approver",
            "isDisabled": false
        },
        {
            "fullName": "Jane Doe",
            "position": "Professor II",
            "employeeNumber": "2023-19876",
            "homeAddress": "456 Oak Avenue, Townsville",
            "designation": "Service Approver",
            "isDisabled": true
        },
        {
            "fullName": "Mark Johnson",
            "position": "Instructor I",
            "employeeNumber": "2024-30567",
            "homeAddress": "789 Pine Road, Villagetown",
            "designation": "Unit Approver",
            "isDisabled": false
        }
    ]
    return (
        <main className="grid space-y-8">
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h5 className="text-xl font-semibold">College of Information Communication and Technology</h5>
                    <Button size="sm" className="flex items-center gap-2">
                        <Plus />
                        Add Designation
                    </Button>
                </div>
                <div className="grid grid-cols-5 gap-4">
                    {
                        data.map(item => (
                            <DesignationCard {...item} />
                        ))
                    }
                </div>
            </div>
        </main>
    )
}

export default DesignationPageContainer
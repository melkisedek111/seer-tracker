import { Label } from '@/components/ui/label'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import RequestDateRangeCalendar from './RequestDateRangeCalendar'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { Card } from '@/components/ui/card'

const RequestFilters = () => {
    return (
        <Card className="w-full flex items-end flex-wrap gap-3 p-4">
            <div className="space-y-2 flex-1">
                <Label>
                    Service Type
                </Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2 flex-1">
                <Label>
                    Service Keyword Type
                </Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2 flex-1">
                <Label>
                    Search Keyword
                </Label>
                <Input />
            </div>
            <div className="space-y-2 flex-1">
                <Label>
                    Request Status
                </Label>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2 flex-1">
                <Label>
                    Request Date Ranges
                </Label>
                <RequestDateRangeCalendar />
            </div>
            <div className="space-y-2 flex-1">
                <Button className="flex items-center gap-2">
                    <Filter />
                    Filter
                </Button>
            </div>
        </Card>
    )
}

export default RequestFilters
"use client";
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import MISRequestForm from './MISRequestForm'
import BAGSRequestForm from './BAGSRequestForm'
import useCustomSWR from '@/hooks/useCustomSWR'
import { ENDPOINTS } from '@/constants/endpoints.types'
import { getServiceCategoryAction } from '@/app/actions/service-category.action'
import { Loader, Loader2 } from 'lucide-react';
import FormLoader from '@/components/shared/FormLoader';
import ErrorContent from '@/components/shared/ErrorContent';
import { useNotify } from '@/context/notification.context';
import { StatusCodes } from 'http-status-codes';
import { SERVICE_TYPES } from '@/constants/index.constants';

const CreatePageContainer = () => {
    const { notify, simpleNotify } = useNotify();
    const { data, isLoading, error } = useCustomSWR(ENDPOINTS.GET_SERVICE_CATEGORIES, getServiceCategoryAction);
    const [selectedServiceCategoryName, setSelectedServiceCategoryName] = useState<string>("");
    const [selectedServiceCategoryId, setSelectedServiceCategoryId] = useState<string>("");
    const serviceTypes: { label: string; value: string }[] = [];

    if (isLoading) return <FormLoader />
    if (error) return <ErrorContent />

    if (data?.data) {
        const serviceTypeOptions = data?.data?.map(service => ({ label: service.name, value: service._id }));
        serviceTypes.push(...serviceTypeOptions);
    }

    const handleSelectedCServiceCategory = (value: string) => {
        const serviceCategoryType = serviceTypes.find(service => service.value === value );
        if(serviceCategoryType) {
            setSelectedServiceCategoryName(serviceCategoryType.label);
            setSelectedServiceCategoryId(serviceCategoryType.value);
        } else {
            simpleNotify("Selecting service category failed.", StatusCodes.BAD_REQUEST)
        }
    }

    return (
        <main className="grid space-y-5">
            <div className="w-[800px] grid grid-cols-4 place-items-center gap-4">
                <Label className="text-nowrap col-span-1">
                    Service Category
                </Label>
                <Select onValueChange={handleSelectedCServiceCategory}>
                    <SelectTrigger className="w-full col-span-3">
                        <SelectValue placeholder="Select a service type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Service Type</SelectLabel>
                            {
                                serviceTypes.map(service => (
                                    <SelectItem value={service.value}>{service.label}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {
                    selectedServiceCategoryName === SERVICE_TYPES.BAGS && <BAGSRequestForm serviceCategory={selectedServiceCategoryId} />
                }
                {
                    selectedServiceCategoryName === SERVICE_TYPES.MIS && <MISRequestForm serviceCategory={selectedServiceCategoryId} />
                }
                
                {/* <Label className="text-nowrap col-span-1">
                    Problem Type
                </Label>
                <Select>
                    <SelectTrigger className="w-full col-span-3">
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
                <Label className="text-nowrap col-span-1">
                    Problem (Others)
                </Label>
                <Input className="w-full col-span-3" />
                <Label className="text-nowrap col-span-1">
                    Problem Details
                </Label>
                <Textarea className="w-full col-span-3" rows={5} />
                <Label className="text-nowrap col-span-1 flex flex-col">
                    Attachments <span className="text-sm text-muted-foreground">Files / Media</span>
                </Label>
                <div className="col-span-3 w-full">
                    <Input type="file" className="" />
                    <div className="grid grid-cols-3 mt-3">
                        <span className="text-sm text-muted-foreground">No Selected Files / Media</span>
                    </div>
                </div>
                <Label className="text-nowrap col-span-1">
                    Priority Level
                </Label>
                <Select>
                    <SelectTrigger className="w-full col-span-3">
                        <SelectValue placeholder="Select a priority level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="high" className="text-destructive">High</SelectItem>
                            <SelectItem value="normal" className="text-primary">Normal</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="col-span-4 w-full flex justify-end">
                    <Button>
                        Create
                    </Button>
                </div> */}
            </div>
        </main>
    )
}

export default CreatePageContainer
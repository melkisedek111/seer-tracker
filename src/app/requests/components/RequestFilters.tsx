"use client";
import { Label } from '@/components/ui/label'
import React, { ChangeEvent, useEffect, useState } from 'react'
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
import { Filter, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import useCustomSWR from '@/hooks/useCustomSWR';
import { ENDPOINTS } from '@/constants/endpoints.types';
import { getServiceCategoryAction } from '@/app/actions/service-category.action';
import { DESIGNATIONS, PRIORITY_LEVEL, REQUEST_PROCESS, SERVICE_CATEGORIES } from '@/constants/index.constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useQueryParams from '@/hooks/useQueryParams';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { useUserSession } from '@/context/session.context';
import { getFilterPositionsAndDepartmentsAction } from '@/app/actions/general.actions';

const RequestFilters = () => {
    const pathname = usePathname();
    const query = useQueryParams();
    const router = useRouter();
    const params = useSearchParams();
    const { data: serviceCategories } = useCustomSWR(ENDPOINTS.GET_SERVICE_CATEGORIES, getServiceCategoryAction);
    const { data: departmentAndPosition, isLoading } = useCustomSWR(ENDPOINTS.GET_POSITIONS_AND_DEPARTMENTS, getFilterPositionsAndDepartmentsAction);

    const { user } = useUserSession();
    const [keywords, setKeywords] = useState<string>("");
    const [serviceType, setServiceType] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [requestProcess, setRequestProcess] = useState<string>("");
    const [priorityLevel, setPriorityLevel] = useState<string>("");
    const [date, setDate] = useState<DateRange | undefined>(undefined);

    const isServiceType = [SERVICE_CATEGORIES.BUILDING_AND_GROUNDS_SERVICES, SERVICE_CATEGORIES.MANAGEMENT_INFORMATION_SYSTEM].includes(user?.departmentName || "");

    const handleFilter = () => {
        const filters = {
            keywords,
            serviceType,
            requestProcess,
            priorityLevel,
            department,
            from: date?.from?.toISOString(),
            to: date?.to?.toISOString()
        }
        const params = {}
        for (const param in filters) {
            const value = filters[param as keyof typeof params];
            if (value) {
                params[param as keyof typeof params] = value;
            }
        }
        const url = new URLSearchParams(params);
        router.replace(`${pathname}?${url.toString()}`);
    }

    const handleClearFilters = () => {
        setKeywords("");
        setServiceType("");
        setRequestProcess("");
        setPriorityLevel("");
        setDepartment("");
        setDate(undefined);
        router.replace(pathname);
    }

    useEffect(() => {
        if (query?.keywords) {
            setKeywords(query?.keywords);
        }
        if (query?.serviceType) {
            setServiceType(query?.serviceType);
        }
        if (query?.requestProcess) {
            setRequestProcess(query?.requestProcess);
        }
        if (query?.priorityLevel) {
            setPriorityLevel(query?.priorityLevel);
        }
        if (query?.department) {
            setDepartment(query?.department);
        }
        if (query?.from && query?.to) {
            setDate({
                from: new Date(query?.from),
                to: new Date(query?.to)
            });
        }
    }, [])

    return (
        <Card className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 p-4">
            <div className="space-y-2 flex-1">
                <Label>
                    Search Keyword
                </Label>
                <Input
                    value={keywords}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}
                />
            </div>
            {
                isServiceType ? <div className="space-y-2 flex-1">
                    <Label>
                        Department
                    </Label>
                    <Select value={department} onValueChange={(value: string) => {
                        const val = value === "Select a department" ? "" : value;
                        setDepartment(val)
                    }} >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    departmentAndPosition?.data?.departments.map(department => (
                                        department._id !== user?.department && <SelectItem value={department._id}>{department.name}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div> : <div className="space-y-2 flex-1">
                    <Label>
                        Service Type
                    </Label>
                    <Select value={serviceType} onValueChange={(value: string) => {
                        const val = value === "Select a Service Type" ? "" : value;
                        setServiceType(val)
                    }} >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Service Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Services</SelectLabel>
                                {
                                    serviceCategories?.data?.map(service => (
                                        <SelectItem value={service._id}>{service.name}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            }
            <div className="space-y-2 flex-1">
                <Label>
                    Request Process
                </Label>
                <Select value={requestProcess} onValueChange={(value: string) => {
                    const val = value === "Select a Request Process" ? "" : value;
                    setRequestProcess(val)
                }} >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Request Process" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Request Process</SelectLabel>
                            {
                                Object.values(REQUEST_PROCESS).map(process => (
                                    <SelectItem value={process}>{process}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2 flex-1">
                <Label>
                    Service Priority Level
                </Label>
                <Select value={priorityLevel} onValueChange={(value: string) => {
                    const val = value === "Select a Priority Level" ? "" : value;
                    setPriorityLevel(val)
                }}>
                    <SelectTrigger className="w-full !capitalize">
                        <SelectValue placeholder="Select a Priority Level" className="!capitalize" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Priority Level</SelectLabel>
                            <SelectItem value={PRIORITY_LEVEL.HIGH} className="capitalize">{PRIORITY_LEVEL.HIGH}</SelectItem>
                            <SelectItem value={PRIORITY_LEVEL.NORMAL} className="capitalize">{PRIORITY_LEVEL.NORMAL}</SelectItem>
                            <SelectItem value={PRIORITY_LEVEL.LOW} className="capitalize">{PRIORITY_LEVEL.LOW}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2 flex-1">
                <Label>
                    Request Date Ranges
                </Label>
                <RequestDateRangeCalendar setDate={setDate} date={date} />
            </div>
            <div className="space-y-2 flex-1 flex flex-col justify-end">
                <div className="flex items-center gap-2">
                    <Button className="flex items-center gap-2 flex-1" onClick={handleFilter}>
                        <Filter />
                        Filter
                    </Button>
                    <Button variant={"destructive"} className="flex items-center gap-2 flex-1" onClick={handleClearFilters}>
                        <X size={14} />
                        Clear
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default RequestFilters
"use client";
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
import { Button } from '@/components/ui/button'
import { Filter, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ROLES } from '@/constants/index.types';
import { ENDPOINTS } from '@/constants/endpoints.types';
import useCustomSWR from '@/hooks/useCustomSWR';
import { getFilterPositionsAndDepartmentsAction } from '@/app/actions/general.actions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useQueryParams from '@/hooks/useQueryParams';

const UserFilter = () => {
    const pathname = usePathname();
    const query = useQueryParams();
    const router = useRouter();
    const [keywords, setKeywords] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const { data, isLoading } = useCustomSWR(ENDPOINTS.GET_POSITIONS_AND_DEPARTMENTS, getFilterPositionsAndDepartmentsAction);

    const handleFilter = () => {
        const filters = {
            keywords,
            department,
            position,
            role
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
        setDepartment("");
        setPosition("");
        setRole("");
        router.replace(pathname);
    }

    useEffect(() => {
        if(query?.department) {
            setDepartment(query?.department);
        }
        if(query?.position) {
            setPosition(query?.position);
        }
        if(query?.role) {
            setPosition(query?.role);
        }
        if(query?.role) {
            setPosition(query?.keyword);
        }
    }, [query])

    return (
        <Card className="w-full flex items-end flex-wrap gap-3 p-4">
            <div className="space-y-2 flex-1">
                <Label>
                    Search Keywords
                </Label>
                <Input placeholder="Search for the name e.g. Juan Dela Cruz"
                    value={keywords}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}
                    disabled={isLoading}
                />
            </div>
            <div className="space-y-2 flex-1">
                <Label>
                    Departments
                </Label>
                <Select value={department} onValueChange={(value: string) => {
                    const val = value === "Select a department" ? "" : value;
                    setDepartment(val)
                }} disabled={isLoading}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                department && <SelectItem value={"Select a department"} className="text-muted-foreground">Select a department</SelectItem>
                            }
                            {
                                data?.data?.departments.map(department => (
                                    <SelectItem value={department._id}>{department.name}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2 flex-1">
                <Label>
                    Positions
                </Label>
                <Select value={position} onValueChange={(value: string) => {
                    const val = value === "Select a position" ? "" : value
                    setPosition(val);
                }} disabled={isLoading}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                position && <SelectItem value={"Select a position"} className="text-muted-foreground">Select a position</SelectItem>
                            }
                            {
                                data?.data?.positions.map(position => (
                                    <SelectItem value={position._id}>{position.name}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2 flex-1">
                <Label>
                    Roles
                </Label>
                <Select value={role} onValueChange={(value: string) => {
                    const val = value === "Select a role" ? "" : value;
                    setRole(val);
                }} disabled={isLoading}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                role && <SelectItem value={"Select a role"} className="text-muted-foreground">Select a role</SelectItem>
                            }
                            {
                                ROLES.map(role => (
                                    <SelectItem value={role}>{role}</SelectItem>

                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex-1 flex items-center gap-1">
                <Button className="flex items-center gap-2" onClick={handleFilter} disabled={isLoading}>
                    <Filter size={14} />
                    Filter
                </Button>
                <Button variant={"destructive"} className="flex items-center gap-2" onClick={handleClearFilters} disabled={isLoading}>
                    <X size={14} />
                    Clear
                </Button>
            </div>
        </Card>
    )
}

export default UserFilter
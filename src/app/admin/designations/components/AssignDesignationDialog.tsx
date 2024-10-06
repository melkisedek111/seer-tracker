"use client";
import { getDepartmentByIdAction, getDepartmentsAction, getUsersWithDesignationByDepartmentIdAction } from "@/app/actions/department.actions"
import { CustomComboBox } from "@/components/shared/CustomComboBox";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ENDPOINTS } from "@/constants/endpoints.types"
import useCustomSWR from "@/hooks/useCustomSWR"
import { Plus } from "lucide-react"
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import DepartmentListTable from "./DepartmentListTable";
import { useNotify } from "@/context/notification.context";
import { TGetUsersWithDesignationByDepartmentIdReturn } from "@/types/department.types";

export default function AssignDesignationDialog() {
    const { data } = useCustomSWR(ENDPOINTS.GET_ALL_DEPARTMENTS, getDepartmentsAction);

    const [selectedDepartment, setSelectedDepartment] = useState<string>("");
    const departmentList = data?.data?.map(department => ({ value: department._id, label: department.name })) || [];

    const handleUsersByDepartment = async (departmentId: string) => {
        setSelectedDepartment(departmentId)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus />
                    Add Designation
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-lg max-h-[750px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <Select onValueChange={handleUsersByDepartment}>
                        <SelectTrigger className="w-auto">
                            <SelectValue placeholder="Select a Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Colleges</SelectLabel>
                                {
                                    departmentList.map(department => (
                                        <SelectItem value={department.value}>{department.label}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <DepartmentListTable departmentId={selectedDepartment} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

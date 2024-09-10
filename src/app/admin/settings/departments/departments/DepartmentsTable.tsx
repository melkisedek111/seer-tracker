"use client";
import { getDepartmentByIdAction, getDepartmentsAction } from "@/app/actions/department.actions";
import ButtonLoader from "@/components/shared/ButtonLoader";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ENDPOINTS } from "@/constants/endpoints.types";
import { useNotify } from "@/context/notification.context";
import useCustomSWR, { useSWRTrigger } from "@/hooks/useCustomSWR";
import { DepartmentType } from "@/models/department.model";
import { TGetDepartmentByIdParams } from "@/types/department.types";
import { formateDate } from "@/utils/format-date";
import { Loader, Pencil } from "lucide-react";
import { UpdateDepartmentDialog } from "./UpdateDepartmentFormDialog";



export default function DepartmentsTable() {
    const { notify } = useNotify();
    const { data, isLoading } = useCustomSWR(ENDPOINTS.GET_ALL_DEPARTMENTS, getDepartmentsAction);
    const { trigger, isMutating, data: department } = useSWRTrigger<DepartmentType, TGetDepartmentByIdParams>(ENDPOINTS.GET_DEPARTMENT, getDepartmentByIdAction)

    const handleGetDepartment = async (departmentId: string) => {
        const response = await trigger({ departmentId });
        notify(response);
    }
    return (
        <>
            <Table>
                <TableCaption>A list of your departments.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Initials</TableHead>
                        <TableHead>Date Created</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        isLoading ? <TableRow>
                            <TableCell colSpan={4}>
                                <Loader className="animate-spin" />
                            </TableCell>
                        </TableRow> : data?.data.length ? data?.data.map((department) => (
                            <TableRow key={department._id}>
                                <TableCell className="font-medium capitalize">{department?.name}</TableCell>
                                <TableCell className="font-medium uppercase">{department?.initials}</TableCell>
                                <TableCell>{formateDate(department?.createdAt.toString())}</TableCell>
                                <TableCell>
                                    <ButtonLoader isLoading={isMutating} size="xs" className="flex items-center gap-2" onClick={() => handleGetDepartment(department._id)}>
                                        <Pencil size={12} />
                                        Update
                                    </ButtonLoader>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No Data Found
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
            <UpdateDepartmentDialog
                selectedDepartmentId={department?.data?._id}
                selectedDepartmentName={department?.data?.name}
                selectedDepartmentInitials={department?.data?.initials}
            />
        </>
    )
}

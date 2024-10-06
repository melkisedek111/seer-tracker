import TableRowLoader from "@/components/shared/TableRowLoader";
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
import { TGetUsersWithDesignationByDepartmentIdReturn } from "@/types/department.types";
import moment from "moment";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DESIGNATION_COLOR, DESIGNATION_LIST } from "@/constants/index.constants";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotify } from "@/context/notification.context";
import { assignDesignationAction } from "@/app/actions/designation.actions";
import useCustomSWR from "@/hooks/useCustomSWR";
import { ENDPOINTS } from "@/constants/endpoints.types";
import { getDepartmentsAction, getUsersWithDesignationByDepartmentIdAction } from "@/app/actions/department.actions";
import { mutate } from "swr";

type TUserByDepartmentListTableProps = {
    departmentId: string;
}

export default function UserByDepartmentListTable({ departmentId }: TUserByDepartmentListTableProps) {
    const { data, isLoading } = useCustomSWR(departmentId ? ENDPOINTS.GET_ALL_USER_DESIGNATION + "/" + departmentId : null , getUsersWithDesignationByDepartmentIdAction, { departmentId: departmentId });

    const { notify } = useNotify();

    const handleAssignDesignation = async (value: string, userId: string) =>{
        const response = await assignDesignationAction({ userId: userId, designation: value });
        notify(response)
        if(response?.ok && response?.data?.isUserAssigned) {
            mutate(ENDPOINTS.GET_ALL_USER_DESIGNATION + "/" + departmentId);
            mutate(ENDPOINTS.GET_ALL_DESIGNATIONS)
        }
    }

    return (
        <div className="overflow-y-auto max-h-[455px]">
            <Table containerClassName="overflow-visible">
                <TableHeader>
                    <TableRow>
                        <TableHead className="sticky top-0 bg-white z-10">Designation</TableHead>
                        <TableHead className="sticky top-0 bg-white z-10">Name</TableHead>
                        <TableHead className="sticky top-0 bg-white z-10">Position</TableHead>
                        <TableHead className="sticky top-0 bg-white z-10 text-right">Date Designated</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRowLoader isLoading={isLoading} isEmpty={!data?.data?.length} colSpan={4}>
                        {data?.data.map((user) => (
                            <TableRow key={user.userId}>
                                <TableCell className="max-w-[150px]">
                                    <Select defaultValue={user.designation || "none"} onValueChange={(value) => handleAssignDesignation(value, user.userId)}>
                                        <SelectTrigger className="w-full pl-0 !text-xs">
                                            <div className="flex items-center">
                                                <SelectValue placeholder="Select a Designation" className="!text-xs" />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel className="!text-xs">Designation</SelectLabel>
                                                <SelectItem className="!text-xs" value={"none"}>
                                                    <div className="flex items-center">
                                                        <Dot strokeWidth={5} className={cn(
                                                            "p-0 text-gray-600",
                                                        )} />
                                                        None
                                                    </div>
                                                </SelectItem>
                                                {
                                                    DESIGNATION_LIST.map(designation => (
                                                        <SelectItem className="!text-xs cursor-pointer" value={designation}>
                                                            <div className="flex items-center">
                                                                <Dot strokeWidth={5} className={cn(
                                                                    "p-0",
                                                                    DESIGNATION_COLOR[designation]
                                                                )} />
                                                                {designation}
                                                            </div>
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="w-auto font-semibold">{user.name}</TableCell>
                                <TableCell className="w-auto">{user.position}</TableCell>
                                <TableCell className="text-right">{user.designatedAt ? moment(user.designatedAt).format('llll') : ""}</TableCell>
                            </TableRow>
                        ))}
                    </TableRowLoader>
                </TableBody>
            </Table>
        </div>
    )
}

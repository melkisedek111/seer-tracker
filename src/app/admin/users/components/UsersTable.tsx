"use client";
import { getAllUsersActions, getUserDetailsAction } from "@/app/actions/user.actions";
import CustomPagination from "@/components/shared/CustomPagination";
import TableRowLoader from "@/components/shared/TableRowLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card"
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
import useCustomSWR from "@/hooks/useCustomSWR";
import useQueryParams from "@/hooks/useQueryParams";
import path from "path";
import { useEffect, useState } from "react";
import SetUserStatus from "./SetUserStatus";
import ApprovedUser from "./ApprovedUser";
import { Badge } from "@/components/ui/badge";
import { UserActionDropdown } from "./UserActionDropdown";
import { TUser } from "@/types/user.types";
import { useNotify } from "@/context/notification.context";
import { UpdateRoleDialog } from "./UpdateRoleDialog";

export const DIALOGS_TO_OPEN = {
    UPDATE_ROLE_DIALOG: "UPDATE_ROLE_DIALOG"
}

export default function UsersTable() {
    const urlParams = useQueryParams();
    const queries = new URLSearchParams(urlParams);
    const { data, isLoading, mutate } = useCustomSWR(`${ENDPOINTS.GET_ALL_USERS}?${queries.toString()}`, getAllUsersActions, urlParams);
    const [selectedUser, setSelectedUser] = useState<TUser | undefined>(undefined);
    const [selectedDialog, setSelectedDialog] = useState<string>("");
    const { notify } = useNotify();
    useEffect(() => {
        mutate()
    }, [urlParams]);

    const handleGetUserDetails = async (userId: string, selectedDialog: string) => {
        const response = await getUserDetailsAction({ userId: userId });
        notify(response);
        console.log(response)
        if(response?.ok && response?.data?._id) {
            setSelectedUser(response.data);
            setSelectedDialog(selectedDialog);
        }
    }

    const handleResetDialog = () => {
        setSelectedUser(undefined);
        setSelectedDialog("");
    }

    return (
        <>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Employee Number</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead className="text-right">Department</TableHead>
                            <TableHead className="text-right">Role</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Approved</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRowLoader colSpan={7} isLoading={isLoading} isEmpty={!data?.data?.docs?.length}>
                            {
                                data?.data?.docs?.map((user: any) => (
                                    <TableRow key={user._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <Avatar>
                                                    {/* <AvatarImage src={`https://api.dicebear.com/9.x/open-peeps/svg?seed=${[user.firstName, user.middleName, user.lastName].join(" ")}`} /> */}
                                                    <AvatarImage src={user.avatar} className="object-cover" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h5 className="font-medium">{[user.firstName, user.middleName, user.lastName].join(" ")}</h5>
                                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.employeeNumber}</TableCell>
                                        <TableCell>{user.position?.name}</TableCell>
                                        <TableCell className="text-right">{user.department?.initials}</TableCell>
                                        <TableCell className="text-right">{user.role && user.role.join(", ") || <span className="text-sm text-muted-foreground italic">No roles assigned</span>}</TableCell>
                                        <TableCell >
                                            <SetUserStatus userId={user.id} isActive={user.isActive} />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {
                                                user.isApproved || user.isRegisteredByAdmin ? <Badge className="bg-green-600">
                                                    Approved
                                                </Badge> : <ApprovedUser userId={user.id} isApproved={user.isApproved} />
                                            }
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <UserActionDropdown handleUpdateUserRole={async () => await handleGetUserDetails(user.id, DIALOGS_TO_OPEN.UPDATE_ROLE_DIALOG)}/>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableRowLoader>
                    </TableBody>
                </Table>
                <div className="p-4">
                    {data?.data && <CustomPagination {...data.data} />}
                </div>
            </Card>
            {
                (selectedUser && selectedDialog === DIALOGS_TO_OPEN.UPDATE_ROLE_DIALOG) && <UpdateRoleDialog handleResetDialog={handleResetDialog} userId={selectedUser._id} roles={selectedUser.role} fullName={selectedUser.fullName} />
            }
        </>
    )
}

"use client";
import { getAllUsersActions } from "@/app/actions/user.actions";
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

export default function UsersTable() {
    const urlParams = useQueryParams();
    const { data, isLoading, mutate } = useCustomSWR(ENDPOINTS.GET_ALL_USERS, getAllUsersActions, urlParams);
    useEffect(() => {
        mutate()
    }, [urlParams]);

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Employee Number</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead className="text-right">Department</TableHead>
                        <TableHead className="text-right">Role</TableHead>
                        <TableHead className="text-right">Status</TableHead>
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
                                    <TableCell className="text-right">{user.role}</TableCell>
                                    <TableCell className="text-right">{user.isActive ? "Active" : "Disabled"}</TableCell>
                                    <TableCell className="text-right">...</TableCell>
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
    )
}

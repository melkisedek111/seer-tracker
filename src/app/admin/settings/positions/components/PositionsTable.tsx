"use client";
import { getPositionByIdAction, getPositionsAction } from "@/app/actions/position.actions";
import ButtonLoader from "@/components/shared/ButtonLoader";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ENDPOINTS } from "@/constants/endpoints.types";
import { useNotify } from "@/context/notification.context";
import useCustomSWR, { useSWRTrigger } from "@/hooks/useCustomSWR";
import { PositionType } from "@/models/position.model";
import { TGetPositionByIdParams } from "@/types/position.types";
import { formateDate } from "@/utils/format-date";
import { Loader, Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import { UpdatePositionFormDialog } from "./UpdatePositionFormDialog";

export default function PositionsTable() {
    const { notify } = useNotify();
    const { data, isLoading } = useCustomSWR(ENDPOINTS.GET_ALL_POSITIONS, getPositionsAction);
    const { trigger, isMutating, data: position } = useSWRTrigger<PositionType, TGetPositionByIdParams>(ENDPOINTS.GET_POSITION, getPositionByIdAction)

    const handleGetPosition = async (positionId: string) => {
        const response = await trigger({ positionId });
        notify(response);
    }

    return (
        <>
            <Table>
                <TableCaption>A list of positions.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Position</TableHead>
                        <TableHead>Date Created</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        isLoading ? <TableRow>
                            <TableCell colSpan={3}>
                                <Loader className="animate-spin" />
                            </TableCell>
                        </TableRow> : data?.data.length ? data?.data.map((position) => (
                            <TableRow key={position._id}>
                                <TableCell className="font-medium">{position?.name}</TableCell>
                                <TableCell>{formateDate(position?.createdAt.toString())}</TableCell>
                                <TableCell>
                                    <ButtonLoader isLoading={isMutating} size="xs" className="flex items-center gap-2" onClick={() => handleGetPosition(position._id)}>
                                        <Pencil size={12} />
                                        Update
                                    </ButtonLoader>
                                </TableCell>
                            </TableRow>
                        )) : <TableCell colSpan={3}>
                            No Data Found
                        </TableCell>
                    }
                </TableBody>
            </Table>
            <UpdatePositionFormDialog selectedPositionId={position?.data?._id} selectedPositionName={position?.data?.name}/>
        </>
    )
}

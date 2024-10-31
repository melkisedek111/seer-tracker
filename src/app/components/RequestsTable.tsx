"use client";
import { Card } from '@/components/ui/card'
import React from 'react'
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
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import useCustomSWR from '@/hooks/useCustomSWR'
import { ENDPOINTS } from '@/constants/endpoints.types'
import { getRequestAction, getRequestsByDepartmentAction } from '../actions/request.actions'
import TableRowLoader from '@/components/shared/TableRowLoader';
import { getInitials } from '@/lib/string.helper';
import { cn } from '@/lib/utils';
import { PRIORITY_LEVEL } from '@/constants/index.constants';
import moment from 'moment';
import { useNotify } from '@/context/notification.context';
import { TRequestCardInsightProps } from '@/components/shared/RequestCardInsight';
const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
];

export type TRequestsTableProps = {
    setRequestDetails: (params: TRequestCardInsightProps) => void;
}

const RequestsTable = ({ setRequestDetails }: TRequestsTableProps) => {
    const { data } = useCustomSWR(ENDPOINTS.GET_REQUESTS_BY_DEPARTMENT, getRequestsByDepartmentAction);
    const { notify } = useNotify();

    const handleGetRequest = async (requestId: string) => {
        const response = await getRequestAction({requestId});

        notify(response);
        if(response?.ok && response?.data) {
            setRequestDetails(response?.data as TRequestCardInsightProps);
        }
    }

    return (
        <Card className="p-0 col-span-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Requester</TableHead>
                        <TableHead>Request Title</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Requested At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRowLoader colSpan={6}>
                        {
                            data?.data?.requests.map(request => (
                                <TableRow key={request._id} className="cursor-pointer" onClick={() => handleGetRequest(request._id)}>
                                    <TableCell className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={request.avatar || ""} />
                                            <AvatarFallback>{getInitials(request.requestorName)}</AvatarFallback>
                                        </Avatar>
                                        {request.requestorName}
                                    </TableCell>
                                    <TableCell className="text-orange-600">{request.title}</TableCell>
                                    <TableCell>{request.serviceCategory}</TableCell>
                                    <TableCell>
                                        <Badge className={cn(
                                            "text-sm capitalize",
                                            request.priorityLevel === PRIORITY_LEVEL.HIGH && "bg-red-600 hover:bg-red-600/90",
                                            request.priorityLevel === PRIORITY_LEVEL.NORMAL && "bg-blue-600 hover:bg-blue-600/90",
                                            request.priorityLevel === PRIORITY_LEVEL.LOW && "bg-gray-600 hover:bg-gray-600/90",
                                        )}>
                                            {request.priorityLevel}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {moment(request.createdAt).fromNow()}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant={"secondary_a"} size="xs" className="flex items-center gap-1" onClick={(e) => {
                                            e.stopPropagation();
                                        }}>
                                            <Eye size={12} />
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableRowLoader>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total Requests</TableCell>
                        <TableCell className="text-right font-semibold">{data?.data?.totalRequests}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Card>
    )
}

export default RequestsTable
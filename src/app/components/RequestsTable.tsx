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
]
const RequestsTable = () => {
    return (
        <Card className="p-0 col-span-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Requester</TableHead>
                        <TableHead>Request Title</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Requested At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Nico" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            Nico David
                        </TableCell>
                        <TableCell className="text-orange-600">No Network connection on my pc</TableCell>
                        <TableCell>DICT</TableCell>
                        <TableCell>
                            <Badge className="text-sm" variant={"secondary"}>
                                Low
                            </Badge>
                        </TableCell>
                        <TableCell>7 Minutes ago</TableCell>
                        <TableCell>
                            <Button variant={"secondary_a"} size="xs" className="flex items-center gap-1">
                                <Eye size={12} />
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Edward" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            Edward Garcia
                        </TableCell>
                        <TableCell className="text-orange-600">No display on my screen</TableCell>
                        <TableCell>CAS</TableCell>
                        <TableCell>
                            <Badge className="text-sm" variant={"default"}>
                                Medium
                            </Badge>
                        </TableCell>
                        <TableCell>21 Minutes ago</TableCell>
                        <TableCell>
                            <Button variant={"secondary_a"} size="xs" className="flex items-center gap-1">
                                <Eye size={12} />
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=sandro" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            Sandro Dela Cruz
                        </TableCell>
                        <TableCell className="text-orange-600">Printer does not work</TableCell>
                        <TableCell>CAS</TableCell>
                        <TableCell>
                            <Badge className="text-sm" variant={"destructive"}>
                                High
                            </Badge>
                        </TableCell>
                        <TableCell>21 Minutes ago</TableCell>
                        <TableCell>
                            <Button variant={"secondary_a"} size="xs" className="flex items-center gap-1">
                                <Eye size={12} />
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=sandro" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            Sandro Dela Cruz
                        </TableCell>
                        <TableCell className="text-orange-600">Printer does not work</TableCell>
                        <TableCell>CAS</TableCell>
                        <TableCell>
                            <Badge className="text-sm" variant={"destructive"}>
                                High
                            </Badge>
                        </TableCell>
                        <TableCell>21 Minutes ago</TableCell>
                        <TableCell>
                            <Button variant={"secondary_a"} size="xs" className="flex items-center gap-1">
                                <Eye size={12} />
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=sandro" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            Sandro Dela Cruz
                        </TableCell>
                        <TableCell className="text-orange-600">Printer does not work</TableCell>
                        <TableCell>CAS</TableCell>
                        <TableCell>
                            <Badge className="text-sm" variant={"destructive"}>
                                High
                            </Badge>
                        </TableCell>
                        <TableCell>21 Minutes ago</TableCell>
                        <TableCell>
                            <Button variant={"secondary_a"} size="xs" className="flex items-center gap-1">
                                <Eye size={12} />
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=sandro" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            Sandro Dela Cruz
                        </TableCell>
                        <TableCell className="text-orange-600">Printer does not work</TableCell>
                        <TableCell>CAS</TableCell>
                        <TableCell>
                            <Badge className="text-sm" variant={"destructive"}>
                                High
                            </Badge>
                        </TableCell>
                        <TableCell>21 Minutes ago</TableCell>
                        <TableCell>
                            <Button variant={"secondary_a"} size="xs" className="flex items-center gap-1">
                                <Eye size={12} />
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Card>
    )
}

export default RequestsTable
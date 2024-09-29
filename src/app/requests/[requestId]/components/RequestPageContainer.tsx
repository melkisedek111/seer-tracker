import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { CheckCircle, CheckSquare, Info, Plane, User, UserCheck, UserCog, UserPen, UserSquare, UserSquare2 } from 'lucide-react'
import React from 'react'

const RequestPageContainer = () => {

    const process = [
        {
            title: "Request Details",
            isRejected: false,
            approvedAt: "01/14/2024 5:45PM",
            Icon: Info
        },
        {
            title: "Unit Approval",
            isRejected: false,
            approvedAt: "01/14/2024 5:45PM",
            Icon: User
        },
        {
            title: "MIS Approval",
            isRejected: false,
            approvedAt: "01/14/2024 5:45PM",
            Icon: UserCog
        },
        {
            title: "Recommending Approval",
            isRejected: false,
            approvedAt: undefined,
            Icon: UserPen
        },
        {
            title: "Service Approval",
            isRejected: false,
            approvedAt: undefined,
            Icon: UserSquare
        },
        {
            title: "Assigned Person",
            isRejected: false,
            approvedAt: undefined,
            Icon: UserSquare2
        },
        {
            title: "Checked By",
            isRejected: false,
            approvedAt: undefined,
            Icon: UserCheck
        },
        {
            title: "Completed",
            isRejected: false,
            completedAt: undefined,
            Icon: CheckSquare
        }]
    return (
        <Card className="p-4 grid grid-cols-4 gap-4">
            <div className="col-span-3 space-y-4">
                <div className="flex gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Callie" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <h1 className="text-orange-600 text-2xl font-semibold">No network connection on my PC</h1>
                            <div className="flex gap-2">
                                <Badge variant={"destructive"}>
                                    High Priority
                                </Badge>
                                <Badge variant={"success"}>
                                    Active
                                </Badge>
                                <p>7 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Card className="py-2 px-3 text-center">
                                <p className="text-sm text-muted-foreground">Start Datetime</p>
                                <h1 className="text-base font-semibold">01/14/2024 5:45PM</h1>
                            </Card>
                            <Card className="py-2 px-3 text-center">
                                <p className="text-sm text-muted-foreground">End Datetime</p>
                                <h1 className="text-base font-semibold">To be determined</h1>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="space-y-5">
                    <div className="space-y-2">
                        <h1 className="border-b-[1px] border-muted-foreground font-semibold">Description/Problem</h1>
                        <p className="text-destructive">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit quidem doloremque porro quia officiis iure dolore esse eligendi vero aut assumenda animi minus, eaque expedita, quod voluptatum exercitationem reprehenderit deleniti. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit quidem doloremque porro quia officiis iure dolore esse eligendi vero aut assumenda animi minus, eaque expedita, quod voluptatum exercitationem reprehenderit deleniti. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit quidem doloremque porro quia officiis iure dolore esse eligendi vero aut assumenda animi minus, eaque expedita, quod voluptatum exercitationem reprehenderit deleniti.</p>
                    </div>
                    <div className="space-y-2">
                        <h1 className="border-b-[1px] border-muted-foreground font-semibold">Request Details</h1>
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Request ID</p>
                                <h5 className="font-semibold">20230115-0001</h5>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Requester</p>
                                <h5 className="font-semibold">Evelyn Rodriguez</h5>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Department</p>
                                <h5 className="font-semibold">Collect of Information and Communication Technology</h5>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Service Category</p>
                                <h5 className="font-semibold">Management Information System</h5>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="border-b-[1px] border-muted-foreground font-semibold">Process Details</h1>
                        <div className="grid grid-cols-4 gap-4">
                            <div>
                                <div className="flex items-center gap-1">
                                    <Info size={12} />
                                    <p className="text-sm text-muted-foreground">Request Details</p>
                                </div>
                                <p className="font-semibold">Filled up request details</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <User size={12} />
                                    <p className="text-sm text-muted-foreground">Unit Approval</p>
                                </div>
                                <p className="font-semibold">Edward Garcia</p>
                                <p className="text-xs text-muted-foreground">Approved At: <span className="font-semibold">01/14/2024 5:45PM</span></p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <UserCog size={12} />
                                    <p className="text-sm text-muted-foreground">MIS Approval</p>
                                </div>
                                <p className="font-semibold">Edward Garcia</p>
                                <p className="text-xs text-muted-foreground">Approved At: <span className="font-semibold">01/14/2024 5:45PM</span></p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <UserPen size={12} />
                                    <p className="text-sm text-muted-foreground">Recommending Approval</p>
                                </div>
                                <p className="font-semibold">Edward Garcia</p>
                                <p className="text-xs text-muted-foreground">Approved At: <span className="font-semibold">01/14/2024 5:45PM</span></p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <UserSquare size={12} />
                                    <p className="text-sm text-muted-foreground">Service Approval</p>
                                </div>
                                <p className="font-semibold">Edward Garcia</p>
                                <p className="text-xs text-muted-foreground">Approved At: <span className="font-semibold">01/14/2024 5:45PM</span></p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <UserSquare2 size={12} />
                                    <p className="text-sm text-muted-foreground">Assign Person</p>
                                </div>
                                <p className="font-semibold">Edward Garcia</p>
                                <p className="text-xs text-muted-foreground">Assigned At: <span className="font-semibold">01/14/2024 5:45PM</span></p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <UserCheck size={12} />
                                    <p className="text-sm text-muted-foreground">Checked By</p>
                                </div>
                                <p className="font-semibold">Edward Garcia</p>
                                <p className="text-xs text-muted-foreground">Assigned At: <span className="font-semibold">01/14/2024 5:45PM</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-8 !mt-12">
                    {
                        process.map((item, i) => (
                            <div className={
                                cn("flex flex-col justify-evenly text-muted-foreground items-center p-2 text-center text-xs py-4 border-muted-foreground border-l-[3px] border-r-[3px]",
                                    i % 2 === 0 && "border-b-[4px] !border-t-white border-t-[4px]",
                                    i % 2 === 1 && "border-t-[4px] !border-b-white border-b-[4px]",
                                    i === 0 && "border-l-0",
                                    process.length - 1 === i && "border-r-0",
                                    item?.isRejected && "text-destructive",
                                    (item?.approvedAt || item?.completedAt) && "text-green-600 border-primary",
                                )
                            }>
                                <div className="flex items-center justify-center gap-1">
                                    {item.title}
                                    {
                                        (item?.approvedAt || item?.completedAt) && <CheckCircle size={15} className="text-green-600" />
                                    }

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
                <Card className="p-4 flex-1 space-y-2">
                    <h5 className="text-lg font-semibold">Updates/Conversations</h5>
                    <div className="space-y-2 overflow-y-auto max-h-[600px]">
                        <Card className="p-2 space-y-2 hover:bg-muted">
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="text-sm font-semibold">Edward Garcia</h5>
                                    <p className="text-xs text-muted-foreground">Instructor I</p>
                                </div>
                                <p className="text-xs text-muted-foreground">10 minutes ago</p>
                            </div>
                            <p className="text-sm text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium magnam quod, commodi eum nihil quis dolorem. Iure</p>
                            <div className="flex items-center gap-1">
                                <Badge className="text-xs" variant={"default"}>
                                    Requester
                                </Badge>
                                <Badge className="text-xs" variant={"default"}>
                                    DICT
                                </Badge>
                            </div>
                        </Card>
                        <Card className="p-2 space-y-2 hover:bg-muted">
                            <div className="flex justify-between">
                                <div>
                                    <h5 className="text-sm font-semibold">John Garcia</h5>
                                    <p className="text-xs text-muted-foreground">Instructor I</p>
                                </div>
                                <p className="text-xs text-muted-foreground">10 minutes ago</p>
                            </div>
                            <p className="text-sm text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium magnam quod, commodi eum nihil quis dolorem. Iure</p>
                            <div className="flex items-center gap-1">
                                <Badge className="text-xs" variant={"default"}>
                                    Unit Head
                                </Badge>
                                <Badge className="text-xs" variant={"default"}>
                                    MIS
                                </Badge>
                            </div>
                        </Card>
                    </div>
                </Card>
                <div className="flex flex-col gap-2">
                    <Textarea placeholder="your message here." rows={3} />
                    <Button size={"sm"} className="flex items-center gap-2">
                        <Plane size={12} />
                        Send
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default RequestPageContainer
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Check, CheckCircle2, Info, User, UserCog, UserCog2, UserPen, UserSquare, UserSquare2, X } from 'lucide-react'
import { Button } from '../ui/button'

const RequestCard = () => {
    return (
        <Card className="hover:bg-muted transition ease-in-out duration-300">
            <CardContent className="p-6 space-y-6">
                <div>
                    <h4 className="text-base text-orange-600">Network connection issue</h4>
                    <p className="text-xs text-muted-foreground">7 months ago</p>
                </div>
                <div className="space-y-0">
                    <h1 className="text-center text-xl font-bold">Network Problem</h1>
                    <div className="grid grid-cols-2">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Start Date</p>
                            <h5 className="font-semibold">01/14/2024 5:45PM</h5>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">End Date</p>
                            <h5 className="font-semibold">01/14/2024 5:45PM</h5>
                        </div>
                    </div>
                </div>
                <div className="space-y-3 mt-3">
                    <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Requested By</p>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://api.dicebear.com/9.x/open-peeps/svg?seed=Muffin" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h5 className="font-semibold">Evelyn Rodriguez</h5>
                        </div>
                    </div>
                    <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Department or Unit</p>
                        <h5 className="font-semibold">Department of Computer Science</h5>
                    </div>
                    <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Requested ID</p>
                        <h5 className="font-semibold">20230115-0001</h5>
                    </div>
                    <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Service Category</p>
                        <h5 className="font-semibold">Management Information System</h5>
                    </div>
                    <div className="space-y-0">
                        <p className="text-sm text-muted-foreground">Request Details/Description of Work/Problem</p>
                        <h5 className="font-semibold text-destructive">Network cables are not functioning properly</h5>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Request Process</p>
                        <div className="pl-4">
                            <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
                                <div className="absolute -left-[18px] rounded-full p-2 bg-primary flex items-center justify-center">
                                    <Info size={19} className="text-white" />
                                </div>
                                <h5 className="font-semibold">Request Details</h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">Filling up the request details</p>
                            </div>
                            <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
                                <div className="absolute -left-[18px] rounded-full p-2 bg-muted-foreground flex items-center justify-center">
                                    <User size={19} className="text-white" />
                                </div>
                                <h5 className="font-semibold">Unit Approval</h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">Approved by: <span>Edward Garcia</span></p>
                            </div>
                            <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
                                <div className="absolute -left-[18px] rounded-full p-2 bg-muted-foreground flex items-center justify-center">
                                    <UserCog size={19} className="text-white" />
                                </div>
                                <h5 className="font-semibold">MIS Approval</h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">Approved by: <span>Edward Garcia</span></p>
                            </div>
                            <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
                                <div className="absolute -left-[18px] rounded-full p-2 bg-muted-foreground flex items-center justify-center">
                                    <UserPen size={19} className="text-white" />
                                </div>
                                <h5 className="font-semibold">Recommending Approval</h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">Approved by: <span>John Dela Cruz</span></p>
                            </div>
                            <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
                                <div className="absolute -left-[18px] rounded-full p-2 bg-muted-foreground flex items-center justify-center">
                                    <UserSquare size={19} className="text-white" />
                                </div>
                                <h5 className="font-semibold">Service Approval</h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">Approved by: <span>John Dela Cruz</span></p>
                            </div>
                            <div className="relative border-l-[1px] border-muted-foreground pl-7 min-h-16">
                                <div className="absolute -left-[18px] rounded-full p-2 bg-muted-foreground flex items-center justify-center">
                                    <UserSquare2 size={19} className="text-white" />
                                </div>
                                <h5 className="font-semibold">Assigned Person</h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">Waiting for the assigned personnel</p>
                            </div>
                            <div className="relative pl-7">
                                <div className="absolute -left-[18px] rounded-full p-2 bg-muted-foreground flex items-center justify-center">
                                    <CheckCircle2 size={19} className="text-white" />
                                </div>
                                <h5 className="font-semibold">Complete</h5>
                                <p className="text-sm text-muted-foreground text-wrap break-words">Waiting for other process to be completed</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-10">
                        <Button variant={"destructive"}>
                            <X />
                            Reject
                        </Button>
                        <Button variant={"default"}>
                            <Check />
                            Approve
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default RequestCard
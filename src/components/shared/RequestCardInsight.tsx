import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Check, CheckCircle2, Info, User, UserCog, UserCog2, UserPen, UserSquare, UserSquare2, X } from 'lucide-react'
import { Button } from '../ui/button'

const RequestCardInsight = () => {
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
                        <h5 className="font-semibold text-destructive">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio reprehenderit, aliquid debitis, rem incidunt placeat laboriosam repellat sint animi fuga in minus accusamus distinctio nam praesentium architecto culpa! Debitis, cum.</h5>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Current Process</p>
                        <div className="pl-4">
                            <div className="flex items-center border-muted-foreground gap-3 min-h-16 ">
                                <div className="rounded-full p-2 bg-primary flex items-center justify-center">
                                    <Info size={19} className="text-white" />
                                </div>
                                <div>
                                    <h5 className="font-semibold">Request Details</h5>
                                    <p className="text-sm text-muted-foreground text-wrap break-words">Filling up the request details</p>
                                </div>
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

export default RequestCardInsight
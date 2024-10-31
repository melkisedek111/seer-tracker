
"use client";
import React from 'react'
import DesignationCard from './DesignationCard'
import useCustomSWR from '@/hooks/useCustomSWR'
import { ENDPOINTS } from '@/constants/endpoints.types'
import { getAllDesignationActions } from '@/app/actions/designation.actions'
import { TGetDesignationUser } from '@/types/designation.types';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const DesignationPageContainer = () => {
    const { data } = useCustomSWR(ENDPOINTS.GET_ALL_DESIGNATIONS, getAllDesignationActions);

    return (
        <main className="grid space-y-8">
            <Tabs defaultValue="colleges">
                <TabsList className="grid w-[400px] grid-cols-2">
                    <TabsTrigger value="colleges">Colleges</TabsTrigger>
                    <TabsTrigger value="password">Service Units</TabsTrigger>
                </TabsList>
                <TabsContent value="colleges">
                    {
                        data?.data?.map(department => (
                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <h5 className="text-xl font-semibold">{department.department}</h5>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    {
                                        department?.users?.map((user: TGetDesignationUser) => (
                                            <DesignationCard {...user} />
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you'll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}

export default DesignationPageContainer
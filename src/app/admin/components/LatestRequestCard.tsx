import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import { Activity, Building, Calendar, CheckCircle, Network, Repeat, TrendingUp, User2 } from 'lucide-react'
import React from 'react'

const LatestRequestCard = () => {
    return (
        <Card className="xl:col-span-2 hover:bg-muted" x-chunk="dashboard-01-chunk-5">
            <CardContent className='p-6 space-y-4'>
                <div className="flex items-center justify-between">
                    <span className="bg-red-700 font-bold text-white rounded-md m-0 py-1.5 p-3">H</span>
                    <h5 className="font-semibold">My Computer keeps blue screen</h5>
                </div>
                <hr />
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                        <Calendar size={15}/>
                        <p className='text-sm'>Date Requested</p>
                    </div>
                    <p className="text-right font-semibold text-sm">January 13, 2023 4:10 PM</p>
                    <div className="flex items-center gap-2">
                        <User2 size={15}/>
                        <p className="text-sm">Requested by</p>
                    </div>
                    <p className="text-right font-semibold text-sm">Melkisedek Ubalde</p>
                    <div className="flex items-center gap-2">
                        <Building size={15}/>
                        <p className="text-sm">Department</p>
                    </div>
                    <p className="text-right font-semibold text-sm">CICT</p>
                    <div className="flex items-center gap-2">
                        <Network size={15}/>
                        <p className="text-sm">Current Process</p>
                    </div>
                    <p className="text-right font-semibold text-sm">Unit Approval</p>
                    <div className="flex items-center gap-2">
                        <CheckCircle size={15}/>
                        <p className="text-sm">Status</p>
                    </div>
                    <p className="text-right font-semibold text-sm">On Process</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default LatestRequestCard
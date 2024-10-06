
"use client";
import React from 'react'
import DesignationCard from './DesignationCard'
import useCustomSWR from '@/hooks/useCustomSWR'
import { ENDPOINTS } from '@/constants/endpoints.types'
import { getAllDesignationActions } from '@/app/actions/designation.actions'
import { TGetDesignationUser } from '@/types/designation.types';

const DesignationPageContainer = () => {
    const { data } = useCustomSWR(ENDPOINTS.GET_ALL_DESIGNATIONS, getAllDesignationActions);
  
    return (
        <main className="grid space-y-8">
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
        </main>
    )
}

export default DesignationPageContainer
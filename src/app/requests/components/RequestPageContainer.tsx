"use client";
import React, { useEffect } from 'react'
import RequestFilters from './RequestFilters'
import RequestCard from '@/components/shared/RequestCard'
import useCustomSWR from '@/hooks/useCustomSWR'
import { ENDPOINTS } from '@/constants/endpoints.types'
import { getAllRequestsActions } from '@/app/actions/request.actions';
import { TGetAllRequestParams, TGetAllRequestReturn } from '@/types/request.types';
import PlateEditorRead from '../create/components/RTESerialize';
import useQueryParams from '@/hooks/useQueryParams';
import { Loader } from 'lucide-react';

const RequestPageContainer = () => {
    const urlParams = useQueryParams();
    const { data, isLoading, mutate } = useCustomSWR(`${ENDPOINTS.GEL_ALL_REQUESTS}?${urlParams.toString()}`, getAllRequestsActions, urlParams);

    const getColumns = (columnIndex: number) => {
        return data?.data.filter((_, index: number) => index % 3 === columnIndex);
    }

    useEffect(() => {
        mutate()
    }, [urlParams]);

    return (
        <main className="grid space-y-5">
            <RequestFilters />
            {
                isLoading && <div className="h-full w-full grid place-items-center">
                    <Loader className="animate-spin size-5" />
                </div>
            }
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 masonry">

                {
                    [
                        getColumns(0),
                        getColumns(1),
                        getColumns(2),
                    ].map((col: any) => (
                        <div className="flex flex-col gap-6">
                            {
                                col?.map((request: TGetAllRequestReturn) => (
                                    <RequestCard {...request} />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default RequestPageContainer
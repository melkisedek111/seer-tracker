"use client";
import { ResponseAction } from "@/lib/server-action.helper";
import useSWR from "swr";
import useSWRMutation from 'swr/mutation'

export function useSWRTrigger<T, U = any>(key: any, fetcher: (params?: any) => Promise<ResponseAction<T>>, options?: any) {
    const fetch = async (url: any, { arg }: { arg: U }) => await fetcher(arg);
    const swr = useSWRMutation(key, fetch, options)
    return swr
}

export default function useCustomSWR<T, U = any>(key: any, fetcher: (params?: any) => Promise<ResponseAction<T>>, data?: U, options?: any) {
    const fetch = async () => await fetcher(data);
    const swr = useSWR<ResponseAction<T>>(key, fetch, options);
    return swr;
}
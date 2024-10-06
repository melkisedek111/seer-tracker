"use client";
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

const Unauthorized = () => {
    const router = useRouter();
    return (
        <div className="h-full w-full grid place-items-center">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold">401 Unauthorized</h1>
                <Button size={"lg"} onClick={() => router.back()} className="w-full">
                    Back
                </Button>
            </div>
        </div>
    )
}

export default Unauthorized
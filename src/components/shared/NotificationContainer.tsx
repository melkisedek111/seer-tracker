"use client";
import React, { ReactNode, Suspense, useEffect, useState } from 'react'
import Image from 'next/image';
import { useNotify } from '@/context/notification.context';
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { ERRORS_CODES, SUCCESS_CODES } from '@/constants/index.types';

const NotificationWrapper = ({ children }: { children: ReactNode }) => {
    const { status, message, resetNotify, title } = useNotify();

    useEffect(() => {
        if (status && message) {
            const params = {
                ...(title ? { title } : { title: "Alert!" }),
                description: message
            };

            if (ERRORS_CODES.includes(status) && typeof message === "string") {
                toast.error(params.description);
            } else if (ERRORS_CODES.includes(status) && Array.isArray(message)) {
                for (const m of message) {
                    toast.error(m);
                }
            } else if (SUCCESS_CODES.includes(status)) {
                toast.success(params.description);
            }

            resetNotify();
        }
    }, [message, status, title, resetNotify]);
    return children
}

export default NotificationWrapper
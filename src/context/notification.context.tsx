"use client";
import { ResponseAction } from "@/app/actions/server-action.helper";
import { createContext, ReactNode, useContext, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type TNotify = { status?: number; message?: string; title?: string, ok?: boolean; isFormError: boolean }

type TNotificationContext = {
    status: number | undefined;
    message: string | string[];
    title?: string;
    notify: (params?: ResponseAction, zodForm?: UseFormReturn<any>) => void;
    simpleNotify: (message: string, status: number) => void;
    resetNotify: () => void;
};

const NotificationContext = createContext<TNotificationContext>(
    {} as TNotificationContext
);

type TNotificationProviderProps = {
    children: ReactNode;
}

export const useNotify = () => {
    const notificationSession = useContext(NotificationContext);
    if (!notificationSession) throw new Error("useNotify must be provided");
    return notificationSession;
}

export const NotificationProvider = ({ children }: TNotificationProviderProps) => {
    const [status, setStatus] = useState<number | undefined>(undefined);
    const [message, setMessage] = useState<string | string[]>("");
    const [title, setTitle] = useState<string>("");

    function notify(params?: ResponseAction, zodForm?: UseFormReturn<any>) {
        if (params?.isFormError && params?.message && !params?.ok && zodForm) {
            const error = params?.message as z.infer<any>;
            for (const field in error) {
                if ((field in zodForm.getValues())) {
                    const message = error[field];
                    zodForm.setError(field, { message });
                }
            }
        } else if (params?.status && params?.message) {
            if (params?.title) {
                setTitle(params?.title);
            }

            let message = params.message;
            if(typeof params.message === 'object') {
                message = Object.values(params.message);
            }

            setStatus(params.status);
            setMessage(message);
        }
    }

    function simpleNotify(message: string, status: number) {
        setStatus(status);
        setMessage(message);
    }

    function resetNotify() {
        setStatus(undefined);
        setTitle("");
        setMessage("");
    }

    const values = {
        status,
        message,
        title,
        notify,
        resetNotify,
        simpleNotify
    }

    return (
        <NotificationContext.Provider value={values}>
            {children}
        </NotificationContext.Provider>
    )
}
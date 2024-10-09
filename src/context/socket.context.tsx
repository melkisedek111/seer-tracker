"use client";

import { socket } from "@/socket";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useUserSession } from "./session.context";
import { useNotify } from "./notification.context";
import { mutate } from "swr";
import { ENDPOINTS } from "@/constants/endpoints.types";


type TSocketContext = {

};

const SocketContext = createContext<TSocketContext>(
    {} as TSocketContext
);

type TSocketProviderProps = {
    children: ReactNode;
}

export const useSocket = () => {
    const socketContext = useContext(SocketContext);
    if (!socketContext) throw new Error("socketContext must be provided");
    return socketContext;
}

export const SocketProvider = ({ children }: TSocketProviderProps) => {
    const router = useRouter();
    const { user } = useUserSession();
    const { notify } = useNotify();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [transport, setTransport] = useState("N/A");

    useEffect(() => {
        socket.on("receiveNotification", (message) => {
            if (message?.ok
                && user?.department?.toString() === message?.data?.department.toString()
                && user?.designation === message?.data?.toNotifyDesignation
                && message?.data?.userToBeNotify.includes(user?.id)) {
                mutate(ENDPOINTS.GET_NOTIFICATION_COUNTS);
                notify(message);
            }
        });
    }, [])

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);


    const values = {

    }

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    )
}
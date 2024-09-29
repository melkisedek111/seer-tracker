"use client";
import { getUserSession } from "@/app/lib/session";
import { ENDPOINTS } from "@/constants/endpoints.types";
import useCustomSWR from "@/hooks/useCustomSWR";
import { Session, User } from "lucia";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useSWR from "swr";

type TUserSessionContext = {
    session: Session | undefined;
    user: User | undefined;
    role: string | undefined;
    handleUserSession: ({ user, session }: { user: User, session: Session }) => void;
    isLoadingUser: boolean;
    isLoggedIn: boolean;
};

const UserSessionContext = createContext<TUserSessionContext>(
    {} as TUserSessionContext
);

type TUserSessionProviderProps = {
    children: ReactNode;
}

export const useUserSession = () => {
    const userSessionContext = useContext(UserSessionContext);
    if (!userSessionContext) throw new Error("userSessionContext must be provided");
    return userSessionContext;
}

export const UserSessionProvider = ({ children }: TUserSessionProviderProps) => {
    const { data, isLoading } = useSWR(ENDPOINTS.GET_USER_SESSION, getUserSession);
    const [session, setSession] = useState<Session | undefined>(undefined);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [role, setRole] = useState<string | undefined>(undefined);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
    const handleUserSession = ({ user, session }: { user: User, session: Session }) => {
        setSession(session);
        setUser(user);
        setRole(user.role);
        setIsLoggedIn(true);
    }

    useEffect(() => {
        setIsLoadingUser(true);
        try {
            if (data?.user && data?.session && !isLoading) {
                setSession(data.session);
                setIsLoggedIn(true);
                setUser(data.user);
                setRole(data.user.role);
                setIsLoadingUser(false);
            }
            if(!isLoading) {
                setIsLoadingUser(false);
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }, [data, isLoading])

    const values = {
        session,
        user,
        role,
        handleUserSession,
        isLoadingUser,
        isLoggedIn
    }

    return (
        <UserSessionContext.Provider value={values}>
            {children}
        </UserSessionContext.Provider>
    )
}
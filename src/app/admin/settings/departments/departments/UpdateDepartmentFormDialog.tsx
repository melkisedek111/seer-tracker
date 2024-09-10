"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Plus } from "lucide-react"
import { createPositionAction, updatePositionAction } from "@/app/actions/position.actions";
import { useNotify } from "@/context/notification.context";
import { ENDPOINTS } from "@/constants/endpoints.types";
import { mutate } from "swr";
import { useEffect, useRef, useState } from "react";
import { useSWRTrigger } from "@/hooks/useCustomSWR";
import { TUpdatePositionParams, TUpdatePositionReturn } from "@/types/position.types";
import ButtonLoader from "@/components/shared/ButtonLoader";
import { UpdateDepartmentSchema } from "@/schemas/department.schema";
import { updateDepartmentAction } from "@/app/actions/department.actions";
import { TUpdateDepartmentParams, TUpdateDepartmentReturn } from "@/types/department.types";

type TUpdateDepartmentDialogProps = {
    selectedDepartmentId: string | undefined;
    selectedDepartmentName: string | undefined;
    selectedDepartmentInitials: string | undefined;
}

export function UpdateDepartmentDialog({ selectedDepartmentId, selectedDepartmentName, selectedDepartmentInitials }: TUpdateDepartmentDialogProps) {
    const buttonOpenRef = useRef<HTMLButtonElement>(null);
    const buttonCloseRef = useRef<HTMLButtonElement>(null);
    const { trigger, isMutating } = useSWRTrigger<TUpdateDepartmentReturn, TUpdateDepartmentParams>(ENDPOINTS.UPDATE_DEPARTMENT, updateDepartmentAction)

    const { notify } = useNotify();

    const updateDepartment = useForm<z.infer<typeof UpdateDepartmentSchema>>({
        resolver: zodResolver(UpdateDepartmentSchema),
        values: {
            departmentId: selectedDepartmentId || "",
            name: selectedDepartmentName || "",
            initials: selectedDepartmentInitials || "",
        },
    })

    async function onSubmit(data: z.infer<typeof UpdateDepartmentSchema>) {
        const response = await trigger(data);
        notify(response, updateDepartment);

        if (response?.ok && response?.data?.isDepartmentUpdated) {
            if(buttonCloseRef.current) {
                buttonCloseRef.current.click();
            }
            mutate(ENDPOINTS.GET_ALL_DEPARTMENTS);
        }
    }

    useEffect(() => {
        if (selectedDepartmentId && selectedDepartmentName && selectedDepartmentInitials && buttonOpenRef.current) {
            buttonOpenRef.current.click();
        }
    }, [selectedDepartmentId, selectedDepartmentName, selectedDepartmentInitials])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button ref={buttonOpenRef} size="sm" variant={"ghost"} className="invisible hidden" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...updateDepartment}>
                    <form onSubmit={updateDepartment.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Update Position</DialogTitle>
                        </DialogHeader>
                        <FormField
                            control={updateDepartment.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your department name." {...field} className="w-full" disabled={isMutating} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={updateDepartment.control}
                            name="initials"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department Initials</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your department initials." {...field} className="w-full" disabled={isMutating} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button ref={buttonCloseRef} type="button" variant={"destructive"}>Cancel</Button>
                            </DialogClose>
                            <ButtonLoader isLoading={isMutating}  type="submit">Save</ButtonLoader>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

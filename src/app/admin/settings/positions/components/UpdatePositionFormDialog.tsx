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
import { UpdatePositionSchema } from "@/schemas/position.schemas";
import { createPositionAction, updatePositionAction } from "@/app/actions/position.actions";
import { useNotify } from "@/context/notification.context";
import { ENDPOINTS } from "@/constants/endpoints.types";
import { mutate } from "swr";
import { useEffect, useRef, useState } from "react";
import { useSWRTrigger } from "@/hooks/useCustomSWR";
import { TUpdatePositionParams, TUpdatePositionReturn } from "@/types/position.types";
import ButtonLoader from "@/components/shared/ButtonLoader";

type TUpdatePositionFormDialogProps = {
    selectedPositionId: string | undefined;
    selectedPositionName: string | undefined;
}

export function UpdatePositionFormDialog({ selectedPositionId, selectedPositionName }: TUpdatePositionFormDialogProps) {
    const buttonOpenRef = useRef<HTMLButtonElement>(null);
    const buttonCloseRef = useRef<HTMLButtonElement>(null);
    const { trigger, isMutating } = useSWRTrigger<TUpdatePositionReturn, TUpdatePositionParams>(ENDPOINTS.UPDATE_POSITION, updatePositionAction)

    const { notify } = useNotify();

    const updatePositionForm = useForm<z.infer<typeof UpdatePositionSchema>>({
        resolver: zodResolver(UpdatePositionSchema),
        values: {
            positionId: selectedPositionId || "",
            name: selectedPositionName || "",
        },
    })

    async function onSubmit(data: z.infer<typeof UpdatePositionSchema>) {
        const response = await trigger(data);
        notify(response, updatePositionForm);

        if (response?.ok && response?.data?.isPositionUpdated) {
            if(buttonCloseRef.current) {
                buttonCloseRef.current.click();
            }
            mutate(ENDPOINTS.GET_ALL_POSITIONS);
        }
    }

    useEffect(() => {
        if (selectedPositionId && selectedPositionName && buttonOpenRef.current) {
            buttonOpenRef.current.click();
        }
    }, [selectedPositionId, selectedPositionName])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button ref={buttonOpenRef} size="sm" variant={"ghost"} className="invisible hidden" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...updatePositionForm}>
                    <form onSubmit={updatePositionForm.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Update Position</DialogTitle>
                        </DialogHeader>
                        <FormField
                            control={updatePositionForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your position name." {...field} className="w-full" disabled={isMutating} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button ref={buttonCloseRef} type="button" variant={"destructive"}>Cancel</Button>
                            </DialogClose>
                            <ButtonLoader isLoading={isMutating}  type="submit">Create</ButtonLoader>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

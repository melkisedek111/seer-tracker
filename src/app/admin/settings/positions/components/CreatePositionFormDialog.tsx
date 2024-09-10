"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
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
import { CreatePositionSchema } from "@/schemas/position.schemas";
import { createPositionAction } from "@/app/actions/position.actions";
import { parsedFormError } from "@/utils/parsed-form-error";
import { useNotify } from "@/context/notification.context";
import { ENDPOINTS } from "@/constants/endpoints.types";
import { mutate } from "swr";

export function CreatePositionFormDialog() {
    const { notify } = useNotify();

    const createPositionForm = useForm<z.infer<typeof CreatePositionSchema>>({
        resolver: zodResolver(CreatePositionSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(data: z.infer<typeof CreatePositionSchema>) {
        const response = await createPositionAction(data);
        notify(response, createPositionForm);

        if(response?.ok && response?.data?.isPositionCreated) {
            createPositionForm.setValue("name", "");
            mutate(ENDPOINTS.GET_ALL_POSITIONS);
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                    <Plus />
                    Create Position
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...createPositionForm}>
                    <form onSubmit={createPositionForm.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Create Position</DialogTitle>
                        </DialogHeader>
                        <FormField
                            control={createPositionForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your position name." {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

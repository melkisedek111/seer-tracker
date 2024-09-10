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
import { createPositionAction } from "@/app/actions/position.actions";
import { parsedFormError } from "@/utils/parsed-form-error";
import { useNotify } from "@/context/notification.context";
import { ENDPOINTS } from "@/constants/endpoints.types";
import { mutate } from "swr";
import { CreateDepartmentSchema } from "@/schemas/department.schema";
import { createDepartmentAction } from "@/app/actions/department.actions";

export default function CreateDepartmentFormDialog() {
    const { notify } = useNotify();

    const createDepartmentForm = useForm<z.infer<typeof CreateDepartmentSchema>>({
        resolver: zodResolver(CreateDepartmentSchema)
    })

    async function onSubmit(data: z.infer<typeof CreateDepartmentSchema>) {
        const response = await createDepartmentAction(data);
        notify(response, createDepartmentForm);

        if(response?.ok && response?.data?.isDepartmentCreated) {
            createDepartmentForm.setValue("name", "");
            createDepartmentForm.setValue("initials", "");
            mutate(ENDPOINTS.GET_ALL_DEPARTMENTS);
        }
    }
    return (
        <Dialog onOpenChange={() => {
            createDepartmentForm.setValue("name", "");
            createDepartmentForm.setValue("initials", "");
        }}>
            <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                    <Plus />
                    Create Departments
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...createDepartmentForm}>
                    <form onSubmit={createDepartmentForm.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Create Department</DialogTitle>
                        </DialogHeader>
                        <FormField
                            control={createDepartmentForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your department name." {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createDepartmentForm.control}
                            name="initials"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department Initials</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your department initials." {...field} className="w-full" />
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

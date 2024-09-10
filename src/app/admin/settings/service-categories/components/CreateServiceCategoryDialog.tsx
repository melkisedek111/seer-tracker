"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Plus } from "lucide-react"
import { useNotify } from "@/context/notification.context";
import { ENDPOINTS } from "@/constants/endpoints.types";
import { mutate } from "swr";
import { CreateServiceCategorySchema } from "@/schemas/service-category.schema";
import { createServiceCategoryAction } from "@/app/actions/service-category.action";

export default function CreateServiceCategoryDialog() {
    const { notify } = useNotify();

    const createServiceCategoryForm = useForm<z.infer<typeof CreateServiceCategorySchema>>({
        resolver: zodResolver(CreateServiceCategorySchema)
    })

    async function onSubmit(data: z.infer<typeof CreateServiceCategorySchema>) {
        const response = await createServiceCategoryAction({
            name: data.name.trim(),
            initials: data.initials.trim()
        });
        notify(response, createServiceCategoryForm);

        if(response?.ok && response?.data?.isServiceCategoryCreated) {
            createServiceCategoryForm.setValue("name", "");
            createServiceCategoryForm.setValue("initials", "");
            mutate(ENDPOINTS.GET_SERVICE_CATEGORIES);
        }
    }
    return (
        <Dialog onOpenChange={() => {
            createServiceCategoryForm.setValue("name", "");
            createServiceCategoryForm.setValue("initials", "");
        }}>
            <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                    <Plus />
                    Create Service Category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...createServiceCategoryForm}>
                    <form onSubmit={createServiceCategoryForm.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Create Service Category</DialogTitle>
                        </DialogHeader>
                        <FormField
                            control={createServiceCategoryForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your service category name." {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createServiceCategoryForm.control}
                            name="initials"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Service Category Initials</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your service category initials." {...field} className="w-full" />
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

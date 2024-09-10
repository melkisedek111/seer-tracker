"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MISRequestSchema, RequestFilesSchema } from "@/schemas/request.schema"

type TMISRequestFormProps = {
    serviceCategory: string
}

const MISRequestForm = ({ serviceCategory }: TMISRequestFormProps) => {
    const MISRequestFormAndFileSchema = MISRequestSchema.and(RequestFilesSchema)
    const misRequestForm = useForm<z.infer<typeof MISRequestFormAndFileSchema>>({
        resolver: zodResolver(MISRequestFormAndFileSchema),
        defaultValues: {
            serviceCategory: serviceCategory,
        },
    });
    function onSubmit(data: z.infer<typeof MISRequestFormAndFileSchema>) {

    }
    return (
        <Form {...misRequestForm}>
            <form onSubmit={misRequestForm.handleSubmit(onSubmit)} className="grid col-span-4 w-full gap-4">
                <FormField
                    control={misRequestForm.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1">Request Title</FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <FormControl className="w-full">
                                    <Input placeholder="e.g. Can't connect to the network" {...field} className="" />
                                </FormControl>
                                <FormMessage className="col-span-4" />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={misRequestForm.control}
                    name="problemType"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1">Problem Type</FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <FormControl className="w-full col-span-3">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full col-span-3">
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Fruits</SelectLabel>
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="col-span-4" />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={misRequestForm.control}
                    name="otherProblem"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1">Problem (Others)</FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <FormControl className="w-full">
                                    <Input placeholder="shadcn" {...field} className="" />
                                </FormControl>
                                <FormMessage className="col-span-4" />
                            </div>

                        </FormItem>
                    )}
                />
                <FormField
                    control={misRequestForm.control}
                    name="problemType"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1">Problem Details</FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <FormControl className="w-full">
                                    <Textarea className="w-full" rows={5} />
                                </FormControl>
                                <FormMessage className="col-span-4" />
                            </div>

                        </FormItem>
                    )}
                />
                <FormField
                    control={misRequestForm.control}
                    name="attachments"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1 grid gap-2"> Attachments <span className="text-sm text-muted-foreground">Files / Media</span></FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <FormControl className="w-full">
                                    <div>
                                        <Input type="file" className="" />
                                        <div className="grid grid-cols-3 mt-3">
                                            <span className="text-sm text-muted-foreground">No Selected Files / Media</span>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage className="col-span-4" />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={misRequestForm.control}
                    name="problemType"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1">Priority Level</FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a priority level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="high" className="text-destructive">High</SelectItem>
                                                <SelectItem value="normal" className="text-primary">Normal</SelectItem>
                                                <SelectItem value="low">Low</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="col-span-4" />
                            </div>

                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end">
                    <Button>
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default MISRequestForm
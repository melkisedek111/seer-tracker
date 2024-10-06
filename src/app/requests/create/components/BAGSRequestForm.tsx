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
import { Checkbox } from "@/components/ui/checkbox"
import { ChangeEvent, useEffect, useState } from "react"
import { CheckedState } from "@radix-ui/react-checkbox"
import { RequestFilesSchema, BAGSRequestSchema } from "@/schemas/request.schema"
import { BAGS_SERVICES } from "@/constants/index.constants"
import PlateJSEditor from "@/components/shared/PlateJSEditor"
import FilePreview from "@/components/shared/PreviewUploadedFile"
import { createRequestAction } from "@/app/actions/request.actions"
import { useNotify } from "@/context/notification.context"


type TBAGSRequestFormProps = {
    serviceCategory: string
}

const plateJsInitialValue = [
    { children: [{ text: '' }], type: 'p', id: '9usnv' }
]

const BAGSRequestForm = ({ serviceCategory }: TBAGSRequestFormProps) => {
    const [isOtherSelected, setIsOtherSelected] = useState<boolean>(false);
    const { notify } = useNotify();
    const services = [...Object.values(BAGS_SERVICES).map(service => ({ label: service, id: service })), {
        id: "Others",
        label: "Others"
    }] as const
    const BAGSRequestFormAndFilesSchema = BAGSRequestSchema.and(RequestFilesSchema).superRefine((data, ctx) => {
        // If the checkbox is checked, make inputField required
        if (
            data.services.some((item) => item === "Others") &&
            !data?.otherService?.trim()
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["otherService"], // Target the inputField for the error
                message: "This field is required when the checkbox is checked",
            });
        }

        if (JSON.stringify(data.problemDetails) === JSON.stringify(plateJsInitialValue)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["problemDetails"], // Target the inputField for the error
                message: "Problem details is required.",
            });
        }
    });
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(e.target.files);
    };

    const bAGSRequestForm = useForm<z.infer<typeof BAGSRequestFormAndFilesSchema>>({
        resolver: zodResolver(BAGSRequestFormAndFilesSchema),
        defaultValues: {
            serviceCategory: serviceCategory,
            problemDetails: plateJsInitialValue,
            services: [],
        },
    });

    async function onSubmit(data: z.infer<typeof BAGSRequestFormAndFilesSchema>) {
        const fileFormData = new FormData();
        if(data.attachments) {
            for (const file of data?.attachments!) {
                fileFormData.append(file.name, file);
            }
        }

        const requestData = {
            requestDetails: {
                title: data.title,
                serviceCategory: data.serviceCategory,
                services: data.services,
                problemDetails: data.problemDetails,
                priorityLevel: data.priorityLevel,
                otherService: data.otherService
            },
            files: fileFormData
        };

        const response = await createRequestAction(requestData);
        notify(response);

        if (response?.ok && response?.data?.isRequestCreated) {
            bAGSRequestForm.resetField("title", { defaultValue: "" });
            bAGSRequestForm.resetField("services", { defaultValue: [] });
            bAGSRequestForm.resetField("otherService", { defaultValue: "" });
            bAGSRequestForm.resetField("priorityLevel", { defaultValue: "" });
            bAGSRequestForm.resetField("attachments", { defaultValue: [] });
            bAGSRequestForm.resetField("problemDetails", { defaultValue: plateJsInitialValue });
            bAGSRequestForm.setValue("title", "");
            bAGSRequestForm.setValue("services", []);
            bAGSRequestForm.setValue("otherService", "");
            bAGSRequestForm.setValue("priorityLevel", "");
            bAGSRequestForm.setValue("attachments", []);
            bAGSRequestForm.setValue("problemDetails", plateJsInitialValue);
            setSelectedFiles(null);
        }
    }

    const handleSelectedServices = (checked: CheckedState, field: any, id: string) => {
        let existingServices = []
        if (id === "Others") {
            existingServices = ["Others"];
            if (checked) {
                setIsOtherSelected(true);
            } else {
                setIsOtherSelected(false);
            }
        } else {
            existingServices = [...field?.value, id].filter(item => item !== "Others");
            bAGSRequestForm.setValue("otherService", "");
            setIsOtherSelected(false);
        }

        return checked
            ? field?.onChange(existingServices)
            : field?.onChange(
                field?.value?.filter(
                    (value: string) => value !== id
                )
            )
    }

    return (
        <Form {...bAGSRequestForm}>
            <form onSubmit={bAGSRequestForm.handleSubmit(onSubmit)} className="grid col-span-4 w-full gap-4">
                <FormField
                    control={bAGSRequestForm.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1">Request Title</FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <FormControl className="w-full">
                                    <Input placeholder="e.g. Table is very broken." {...field} className="" />
                                </FormControl>
                                <FormMessage className="col-span-4" />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={bAGSRequestForm.control}
                    name="services"
                    render={() => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1">Services</FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <div className="grid grid-cols-3 gap-2">
                                    {services.map((item) => (
                                        <FormField
                                            key={item?.id}
                                            control={bAGSRequestForm.control}
                                            name="services"
                                            render={({ field }) => {

                                                return (
                                                    <FormItem
                                                        key={item?.id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                id={item.id}
                                                                checked={field?.value?.includes(item?.id)}
                                                                onCheckedChange={(checked) => {
                                                                    return handleSelectedServices(checked, field, item?.id);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal" htmlFor={item.label}>
                                                            {item.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </div>

                        </FormItem>
                    )}
                />
                {
                    isOtherSelected && <FormField
                        control={bAGSRequestForm.control}
                        name="otherService"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 w-full place-items-center">
                                <FormLabel className="text-nowrap col-span-1">Other Service</FormLabel>
                                <div className="w-full col-span-3 space-y-2">
                                    <FormControl className="w-full">
                                        <Input placeholder="shadcn" {...field} disabled={!isOtherSelected} />
                                    </FormControl>
                                    <FormMessage className="col-span-4" />
                                </div>

                            </FormItem>
                        )}
                    />
                }
                <FormField
                    control={bAGSRequestForm.control}
                    name="problemDetails"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1">Problem Details</FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <FormControl className="w-full">
                                    <PlateJSEditor className="h-[300px]" value={field.value || []} setValue={field.onChange} disabled={bAGSRequestForm.formState.isSubmitting} />
                                </FormControl>
                                <FormMessage className="col-span-4" />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={bAGSRequestForm.control}
                    name="attachments"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1 grid gap-2"> Attachments <span className="text-sm text-muted-foreground">Files / Media</span></FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <FormControl className="w-full">
                                    <div>
                                        <Input
                                            type="file"
                                            multiple
                                            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                                            placeholder="shadcn" onChange={(event) => {
                                                handleFileChange(event);
                                                if (event.target?.files) {
                                                    const files = Object.values(event.target?.files);
                                                    field.onChange(files);
                                                }
                                            }} disabled={(bAGSRequestForm.formState.isSubmitting)} />
                                        <div className="w-full mt-3">
                                            {selectedFiles ? <FilePreview files={selectedFiles} /> : <span className="text-sm text-muted-foreground">No Selected Files / Media</span>}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage className="col-span-4" />
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={bAGSRequestForm.control}
                    name="priorityLevel"
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

export default BAGSRequestForm
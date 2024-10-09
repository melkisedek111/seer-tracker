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
import PlateEditor from "./RTE"
import { serializeHtml } from '@udecode/plate-serializer-html';
import PlateEditorRead from "./RTESerialize"
import PlateJSEditor from "@/components/shared/PlateJSEditor"
import { createRequestAction } from "@/app/actions/request.actions"
import { useState } from "react"
import FilePreview from "@/components/shared/PreviewUploadedFile"
import { useNotify } from "@/context/notification.context"
import ButtonLoader from "@/components/shared/ButtonLoader"
import { socket } from "@/socket"
import { useUserSession } from "@/context/session.context"
import { DESIGNATIONS, NOTIFICATION_TYPE } from "@/constants/index.constants"

type TMISRequestFormProps = {
    serviceCategory: string
}

export const plateJsInitialValue = [
    { children: [{ text: '' }], type: 'p', id: 'dixs2' }
]

const MISRequestForm = ({ serviceCategory }: TMISRequestFormProps) => {
    const { notify } = useNotify();
    const { user } = useUserSession();
    const [isReset, setIsReset] = useState<boolean>(false);
    const MISRequestFormAndFileSchema = MISRequestSchema.and(RequestFilesSchema).superRefine((data, ctx) => {
        // If the checkbox is checked, make inputField required
        if (data.problemType === "Others" && !data?.otherProblem?.trim()) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["otherProblem"], // Target the inputField for the error
                message: "Please specify the others.",
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

    const misRequestForm = useForm<z.infer<typeof MISRequestFormAndFileSchema>>({
        resolver: zodResolver(MISRequestFormAndFileSchema),
        defaultValues: {
            serviceCategory: serviceCategory,
            problemDetails: plateJsInitialValue
        },
    });

    async function onSubmit(data: z.infer<typeof MISRequestFormAndFileSchema>) {
        const fileFormData = new FormData();
        if (data.attachments) {
            for (const file of data?.attachments!) {
                fileFormData.append(file.name, file);
            }
        }

        const requestData = {
            requestDetails: {
                title: data.title,
                serviceCategory: data.serviceCategory,
                problemType: data.problemType,
                problemDetails: data.problemDetails,
                priorityLevel: data.priorityLevel,
                otherProblem: data.otherProblem
            },
            files: fileFormData
        };

        const response = await createRequestAction(requestData);
        notify(response);

        if (response?.ok && response?.data?.isRequestCreated) {
            misRequestForm.resetField("title", { defaultValue: "" });
            misRequestForm.resetField("problemType", { defaultValue: "" });
            misRequestForm.resetField("otherProblem", { defaultValue: "" });
            misRequestForm.resetField("priorityLevel", { defaultValue: "" });
            misRequestForm.resetField("attachments", { defaultValue: [] });
            misRequestForm.resetField("problemDetails", { defaultValue: plateJsInitialValue });
            misRequestForm.setValue("title", "");
            misRequestForm.setValue("problemType", "");
            misRequestForm.setValue("otherProblem", "");
            misRequestForm.setValue("priorityLevel", "");
            misRequestForm.setValue("attachments", []);
            misRequestForm.setValue("problemDetails", plateJsInitialValue);
            setIsReset(true);
            setSelectedFiles(null);
            socket.emit("requestNotification", {
                department: user?.department,
                toNotifyDesignation: DESIGNATIONS.UNIT_HEAD,
                message: `A new created request from ${response?.data.requestedBy}`,
                title: "New MIS Tech Support Request.",
                requestSourceId: response?.data?.requestId,
                type: NOTIFICATION_TYPE.NEW_REQUEST
            })
        }
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
                                    <Input placeholder="e.g. Can't connect to the network" {...field} disabled={misRequestForm.formState.isSubmitting} />
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
                                    <Select onValueChange={field.onChange} value={field.value} disabled={misRequestForm.formState.isSubmitting}>
                                        <SelectTrigger className="w-full col-span-3">
                                            <SelectValue placeholder="Select a problem type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Problem Type</SelectLabel>
                                                <SelectItem value="Computer Problem">Computer Problem</SelectItem>
                                                <SelectItem value="Network Problem">Network Problem</SelectItem>
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
                                    <Input placeholder="shadcn" {...field} disabled={misRequestForm.formState.isSubmitting} />
                                </FormControl>
                                <FormMessage className="col-span-4" />
                            </div>

                        </FormItem>
                    )}
                />
                <FormField
                    control={misRequestForm.control}
                    name="problemDetails"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1">Problem Details</FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <FormControl className="w-full">
                                    <PlateJSEditor
                                        className="h-[300px]"
                                        value={field.value || []}
                                        setValue={(val) => {
                                            if (isReset) {
                                                setIsReset(false);
                                            }
                                            field.onChange(val);
                                        }}
                                        disabled={misRequestForm.formState.isSubmitting}
                                        isReset={isReset}
                                    />
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
                                            }} disabled={(misRequestForm.formState.isSubmitting)} />
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
                    control={misRequestForm.control}
                    name="priorityLevel"
                    render={({ field }) => (
                        <FormItem className="grid grid-cols-4 w-full place-items-center">
                            <FormLabel className="text-nowrap col-span-1">Priority Level</FormLabel>
                            <div className="w-full col-span-3 space-y-2">
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={misRequestForm.formState.isSubmitting}>
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
                    <ButtonLoader isLoading={misRequestForm.formState.isSubmitting} disabled={misRequestForm.formState.isSubmitting}>
                        Create
                    </ButtonLoader>
                </div>
            </form>
        </Form>
    )
}

export default MISRequestForm
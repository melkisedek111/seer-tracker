"use client";
import { updateUserRoleAction } from "@/app/actions/user.actions";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ROLES_CHECKBOX } from "@/constants/index.constants";
import { useNotify } from "@/context/notification.context";
import { UpdateRoleSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TUpdateRoleDialogProps = {
    userId: string;
    roles: string[] | null;
    fullName: string;
    handleResetDialog: () => void;
}

export function UpdateRoleDialog({ userId, roles, fullName, handleResetDialog }: TUpdateRoleDialogProps) {
    const [open, setOpen] = useState<boolean>(!!userId);
    const { notify } = useNotify();
    const updateRoleForm = useForm<z.infer<typeof UpdateRoleSchema>>({
        resolver: zodResolver(UpdateRoleSchema),
        defaultValues: {
            roles: roles || [],
            userId: userId,
        }
    });
    const formRef = useRef<HTMLFormElement>(null);
    async function onSubmit(data: z.infer<typeof UpdateRoleSchema>) {
        const response = await updateUserRoleAction({
            roles: data.roles,
            userId: data.userId
        });

        notify(response, updateRoleForm);
        if (response?.ok && response?.data?.isRoleUpdated) {
            updateRoleForm.resetField("roles", { defaultValue: [] })
            updateRoleForm.reset();
            formRef?.current?.reset();
        }
    }
    return (
        <Dialog defaultOpen={open} onOpenChange={(value) => {
            setOpen(value);
            handleResetDialog();
        } }>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Update User Role</DialogTitle>
                    <DialogDescription>
                        Update role for user <span className="font-semibold uppercase">{fullName}</span>
                    </DialogDescription>
                </DialogHeader>
                <Form {...updateRoleForm}>
                    <form ref={formRef} onSubmit={updateRoleForm.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={updateRoleForm.control}
                            name="roles"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Roles</FormLabel>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {ROLES_CHECKBOX.map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={updateRoleForm.control}
                                                name="roles"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={item.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    id={item.id}
                                                                    disabled={(updateRoleForm.formState.isSubmitting)}
                                                                    checked={field.value?.includes(item.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item.id])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== item.id
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal cursor-pointer" htmlFor={item.id}>
                                                                {item.label}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Update Roles</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

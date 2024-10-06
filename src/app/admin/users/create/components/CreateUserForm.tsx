"use client"
import React, { useRef } from 'react'
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
import { Label } from '@/components/ui/label'
import { createUserAction } from '@/app/actions/user.actions'
import { ROLES, ROLES_CHECKBOX } from '@/constants/index.constants'
import { Checkbox } from '@/components/ui/checkbox'
import { AvatarSchema, CreateUserSchema } from '@/schemas/user.schema'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useCustomSWR from '@/hooks/useCustomSWR'
import { ENDPOINTS } from '@/constants/endpoints.types'
import { getFilterPositionsAndDepartmentsAction } from '@/app/actions/general.actions'
import { useNotify } from '@/context/notification.context'
import { Loader } from 'lucide-react'
import FormButton from '@/components/shared/FormButton'



const RefinedCreateUserSchema = CreateUserSchema.and(AvatarSchema).superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["confirmPassword"],
            message: "Password does not matched.",
        });
    }
});

const CreateUserForm = () => {
    const { data, isLoading } = useCustomSWR(ENDPOINTS.GET_POSITIONS_AND_DEPARTMENTS, getFilterPositionsAndDepartmentsAction);
    const { notify } = useNotify();
    const formRef = useRef<HTMLFormElement>(null)

    const createUserForm = useForm<z.infer<typeof RefinedCreateUserSchema>>({
        resolver: zodResolver(RefinedCreateUserSchema),
        defaultValues: {
            roles: []
        }
    });

    async function onSubmit(data: z.infer<typeof RefinedCreateUserSchema>) {
        const avatar = new FormData();
        if (data.avatar) {
            avatar.append("avatar", data.avatar);
        }
        const response = await createUserAction({
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            gender: data.gender,
            contact: data.contact,
            email: data.email,
            homeAddress: data.homeAddress,
            position: data.position,
            department: data.department,
            employeeNumber: data.employeeNumber,
            roles: data.roles,
            username: data.username,
            password: data.password,
            confirmPassword: data.confirmPassword,
            avatar: avatar,
            isRegisteredByAdmin: true
        });

        notify(response, createUserForm)
        if (response?.ok && response?.data?.isUserCreated) {
            createUserForm.resetField("firstName", { defaultValue: "" })
            createUserForm.resetField("middleName", { defaultValue: "" })
            createUserForm.resetField("lastName", { defaultValue: "" })
            createUserForm.resetField("gender", { defaultValue: "" })
            createUserForm.resetField("contact", { defaultValue: "" })
            createUserForm.resetField("email", { defaultValue: "" })
            createUserForm.resetField("homeAddress", { defaultValue: "" })
            createUserForm.resetField("position", { defaultValue: "" })
            createUserForm.resetField("department", { defaultValue: "" })
            createUserForm.resetField("employeeNumber", { defaultValue: "" })
            createUserForm.resetField("roles", { defaultValue: [] })
            createUserForm.resetField("username", { defaultValue: "" })
            createUserForm.resetField("password", { defaultValue: "" })
            createUserForm.resetField("confirmPassword", { defaultValue: "" })
            createUserForm.resetField("avatar", { defaultValue: "" })
            createUserForm.reset();
            formRef?.current?.reset();
        }
    }

    return (
        <div className="grid space-y-5 w-[800px] relative p-4">
            <Form {...createUserForm}>
                <form ref={formRef} onSubmit={createUserForm.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-3 w-full">
                        <h5 className="text-lg font-semibold text-center">
                            Personal Information
                        </h5>
                        <div className="col-span-2 grid grid-cols-1 gap-3">
                            <FormField
                                control={createUserForm.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your first name." {...field} disabled={(createUserForm.formState.isSubmitting)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={createUserForm.control}
                                name="middleName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Middle Name <span className="text-muted-foreground text-xs">(Optional)</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your middle name" {...field} disabled={(createUserForm.formState.isSubmitting)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={createUserForm.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your last name." {...field} disabled={(createUserForm.formState.isSubmitting)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={createUserForm.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Gender</FormLabel>
                                            <FormControl>
                                                <Select value={field.value} onValueChange={(value: string) => field.onChange(value)} disabled={(createUserForm.formState.isSubmitting)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a you gender." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value={"Female"}>Female</SelectItem>
                                                            <SelectItem value={"Male"}>Male</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createUserForm.control}
                                    name="contact"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact No.</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your contact number." {...field} disabled={(createUserForm.formState.isSubmitting)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={createUserForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email." {...field} disabled={(createUserForm.formState.isSubmitting)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={createUserForm.control}
                                name="homeAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Home Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your home address." {...field} disabled={(createUserForm.formState.isSubmitting)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-3 w-full">
                        <h5 className="text-lg font-semibold text-center">
                            Assigning Information
                        </h5>
                        <div className="col-span-2 grid grid-cols-1 gap-3">
                            <FormField
                                control={createUserForm.control}
                                name="position"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Position</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={(value: string) => {
                                                field.onChange(value);
                                            }} disabled={isLoading || (createUserForm.formState.isSubmitting)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a position" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            data?.data?.positions.map(position => (
                                                                <SelectItem value={position._id}>{position.name}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={createUserForm.control}
                                name="department"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={(value: string) => {
                                                field.onChange(value)
                                            }} disabled={isLoading || (createUserForm.formState.isSubmitting)}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            data?.data?.departments.map(department => (
                                                                <SelectItem value={department._id}>{department.name}</SelectItem>
                                                            ))
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <hr />
                    <div className="grid grid-cols-3 w-full">
                        <h5 className="text-lg font-semibold text-center">
                            Account Information
                        </h5>
                        <div className="col-span-2 grid grid-cols-1 gap-3">
                            <FormField
                                control={createUserForm.control}
                                name="employeeNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employee Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your employee number." {...field} disabled={(createUserForm.formState.isSubmitting)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={createUserForm.control}
                                name="avatar"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Avatar</FormLabel>
                                        <FormControl>
                                            <Input type="file" placeholder="shadcn" onChange={(event) => {
                                                field.onChange(event.target?.files?.[0] ?? undefined);
                                            }} disabled={(createUserForm.formState.isSubmitting)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={createUserForm.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your username" {...field} disabled={(createUserForm.formState.isSubmitting)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={createUserForm.control}
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
                                                    control={createUserForm.control}
                                                    name="roles"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={item.id}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        disabled={(createUserForm.formState.isSubmitting)}
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
                                                                <FormLabel className="font-normal">
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
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={createUserForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your password" type="password" {...field} disabled={(createUserForm.formState.isSubmitting)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createUserForm.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your confirm password" type="password" {...field} disabled={(createUserForm.formState.isSubmitting)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end py-5">
                        <FormButton type="submit" disabled={(createUserForm.formState.isSubmitting)} isLoading={(createUserForm.formState.isSubmitting)}>
                            Create User
                        </FormButton>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateUserForm
'use client';
import { getFilterPositionsAndDepartmentsAction } from '@/app/actions/general.actions';
import { ENDPOINTS } from '@/constants/endpoints.types';
import { useNotify } from '@/context/notification.context';
import useCustomSWR from '@/hooks/useCustomSWR';
import { AvatarSchema, RegisterUserWithNoRoleSchema } from '@/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
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
import { z } from 'zod';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import FormButton from '@/components/shared/FormButton'
import Link from 'next/link';
import Image from 'next/image';
import { registerUserAction } from '@/app/actions/user.actions';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

type TRegisterUserFormPros = {
    setIsSuccess: (value: boolean) => void
}

const RegisterUserForm = ({ setIsSuccess }: TRegisterUserFormPros) => {
    const { data, isLoading } = useCustomSWR(ENDPOINTS.GET_POSITIONS_AND_DEPARTMENTS, getFilterPositionsAndDepartmentsAction);
    const { notify } = useNotify();
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const RegisterUserSchema = RegisterUserWithNoRoleSchema.and(AvatarSchema).superRefine((val, ctx) => {
        if (val.password !== val.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["confirmPassword"],
                message: "Password does not matched.",
            });
        }
    });
    const createUserForm = useForm<z.infer<typeof RegisterUserSchema>>({
        resolver: zodResolver(RegisterUserSchema)
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Ensure the file is selected
        if (file) {
            setSelectedImage(URL.createObjectURL(file));  // Create a preview URL
        }
    };

    async function onSubmit(data: z.infer<typeof RegisterUserSchema>) {
        const avatar = new FormData();
        if (data.avatar) {
            avatar.append("avatar", data.avatar);
        }
        const response = await registerUserAction({
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
            username: data.username,
            password: data.password,
            confirmPassword: data.confirmPassword,
            avatar: avatar,
            isRegisteredByAdmin: false
        });

        notify(response, createUserForm);

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
            createUserForm.resetField("username", { defaultValue: "" })
            createUserForm.resetField("password", { defaultValue: "" })
            createUserForm.resetField("confirmPassword", { defaultValue: "" })
            createUserForm.resetField("avatar", { defaultValue: "" })
            setSelectedImage(null);
            createUserForm.reset();
            setIsSuccess(true);
        }
    }

    return (
        <Form {...createUserForm}>
            <form onSubmit={createUserForm.handleSubmit(onSubmit)} autoComplete='off'>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div className="space-y-3">
                        <h5 className="text-lg font-semibold">
                            Personal Information
                        </h5>
                        <hr />
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
                    <div className="space-y-3 md:order-3 xl:order-2">
                        <h5 className="text-lg font-semibold">
                            Assigning Information
                        </h5>
                        <hr />
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
                    <div className="space-y-3 md:order-2 xl:order-3">
                        <h5 className="text-lg font-semibold">
                            Account Information
                        </h5>
                        <hr />
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
                            <div className='grid gap-1'>
                                <FormField
                                    control={createUserForm.control}
                                    name="avatar"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Avatar</FormLabel>
                                            <FormControl>
                                                <Input type="file" placeholder="shadcn" onChange={(event) => {
                                                    handleImageChange(event)
                                                    field.onChange(event.target?.files?.[0] ?? undefined);
                                                }} disabled={(createUserForm.formState.isSubmitting)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {selectedImage && (
                                    <Image
                                        src={selectedImage}
                                        alt="Preview"
                                        height={300}
                                        width={300}
                                        className="object-contain mx-auto rounded-lg w-[150px]"
                                    />
                                )}
                            </div>
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
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
                </div>
                <div className="flex items-center justify-between py-5 w-full gap-2 flex-wrap-reverse">
                    <Link href="/sign-in" className="w-full sm:w-auto">
                        <Button  type="button" variant={"link"} className="w-full">
                            Sign In
                        </Button>
                    </Link>
                    <FormButton type="submit" disabled={(createUserForm.formState.isSubmitting)} isLoading={(createUserForm.formState.isSubmitting)} className="w-full sm:w-auto">
                        Register
                    </FormButton>
                </div>
            </form>
        </Form>
    )
}

export default RegisterUserForm
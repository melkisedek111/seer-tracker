"use client";
import { signInAction } from '@/app/actions/auth.actions';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input'
import { ROLES_OBJ } from '@/constants/index.constants';
import { useNotify } from '@/context/notification.context';
import { useUserSession } from '@/context/session.context';
import { SignInFormSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SigInForm = () => {
    const { notify } = useNotify();
    const { handleUserSession } = useUserSession();
    const router = useRouter();
    const signInForm = useForm<z.infer<typeof SignInFormSchema>>({
        resolver: zodResolver(SignInFormSchema)
    });

    async function onSubmit(data: z.infer<typeof SignInFormSchema>) {
        const response = await signInAction(data);
        notify(response);

        if (response?.ok && (response?.data?.user && response?.data?.session)) {
            handleUserSession(response?.data);

            if ([ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN].some(role => response?.data?.user?.role.includes(role))) {
                router.push("/admin");
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...signInForm}>
                    <form onSubmit={signInForm.handleSubmit(onSubmit)} >
                        <div className="grid gap-4">
                            <FormField
                                control={signInForm.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel htmlFor="username">Username</FormLabel>
                                        <Input
                                            id="username"
                                            type="username"
                                            placeholder="e.g. john_doe"
                                            {...field}
                                            disabled={signInForm.formState.isSubmitting}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={signInForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="put your secret here."
                                            {...field}
                                            disabled={signInForm.formState.isSubmitting}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={signInForm.formState.isSubmitting}>
                                Login
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline">
                                Register
                            </Link>
                        </div>
                    </form>
                </Form>

            </CardContent>
        </Card>
    )
}

export default SigInForm
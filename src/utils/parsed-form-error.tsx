"use client";

import { ResponseAction } from "@/app/actions/server-action.helper";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export function parsedFormError(form: UseFormReturn<any>, response: ResponseAction) {
    const { message, isFormError, ok } = response;

    if(message && isFormError && !ok) {
        const error = message as z.infer<any>;
        for(const field in error) {
            if((field in form.getValues())) {
                const message = error[field];
                form.setError(field, { message });
            }
        }
    }
}
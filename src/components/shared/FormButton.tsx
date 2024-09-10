"use client";
import React, { ReactNode } from 'react'
import { Button, ButtonProps } from '../ui/button';
import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

type TFormButtonProps = ButtonProps & {
    children: ReactNode;
    isLoading?: boolean;
}

const FormButton = ({ children, isLoading, ...otherProps }: TFormButtonProps) => {
    return (
        <Button className={cn(`flex items-center gap-3`)} {...otherProps}>
            {
                isLoading ? <>
                    <Loader size={14} className="animate-spin"/>
                    Loading
                </> : children
            }
        </Button>
    )
}

export default FormButton
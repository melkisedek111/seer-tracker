import React from 'react'
import { Button, ButtonProps } from '../ui/button'
import { Loader2 } from 'lucide-react'

const ButtonLoader = ({ children, isLoading, ...otherProps }: ButtonProps & { isLoading?: boolean }) => {
    return (
        <Button disabled={isLoading} {...otherProps}>
            {
                isLoading ? <div className="flex items-center gap-2">
                    <Loader2 size={12} className="animate-spin" />
                    Loading
                </div> : children
            }
        </Button>
    )
}

export default ButtonLoader
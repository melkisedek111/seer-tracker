import { Button } from '@/components/ui/button'
import { APP_LINKS } from '@/constants/links'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreateRequestButtonLink = () => {
    return (
        <Link href={APP_LINKS.ADMIN.CREATE_REQUEST}>
            <Button>
                <Plus />
                Create Request
            </Button>
        </Link>
    )
}

export default CreateRequestButtonLink
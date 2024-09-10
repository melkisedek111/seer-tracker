import { Button } from '@/components/ui/button'
import { APP_LINKS } from '@/constants/links'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreateUserButtonLink = () => {
    return (
        <Link href={APP_LINKS.ADMIN.CREATE_USER}>
            <Button>
                <Plus />
                Create User
            </Button>
        </Link>
    )
}

export default CreateUserButtonLink
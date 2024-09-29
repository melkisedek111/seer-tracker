import AuthWrapper from '@/components/shared/AuthWrapper'
import Sidebar from '@/components/shared/Sidebar'
import { ROLES_OBJ } from '@/constants/index.types'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <AuthWrapper roles={[ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN]}>
            {children}
        </AuthWrapper>
    )
}

export default layout
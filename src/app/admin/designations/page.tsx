import Wrapper from '@/components/shared/Wrapper'
import React from 'react'
import DesignationPageContainer from './components/DesignationPageContainer'
import AssignDesignationDialog from './components/AssignDesignationDialog'
import AuthWrapper from '@/components/shared/AuthWrapper'
import { ROLES_OBJ } from '@/constants/index.constants'

const DesignationPge = () => {
    return (
        <AuthWrapper roles={[ROLES_OBJ.ADMIN, ROLES_OBJ.SUPER_ADMIN]}>
            <Wrapper title={"Designations"} extraElement={<AssignDesignationDialog />}>
                <DesignationPageContainer />
            </Wrapper>
        </AuthWrapper>
    )
}

export default DesignationPge
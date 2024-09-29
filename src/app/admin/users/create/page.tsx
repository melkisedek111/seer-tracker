import Wrapper from '@/components/shared/Wrapper'
import React from 'react'
import CreateUserPageContainer from './components/CreateUserPageContainer'
import AuthContainer from '@/components/shared/AuthWrapper'

const CreateUserPage = () => {
    return (
        // <AuthContainer>
            <Wrapper title={"Create User"}>
                <CreateUserPageContainer />
            </Wrapper>
        // </AuthContainer>
    )
}

export default CreateUserPage
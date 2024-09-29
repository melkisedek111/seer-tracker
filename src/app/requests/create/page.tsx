import Wrapper from '@/components/shared/Wrapper'
import React from 'react'
import CreatePageContainer from './components/CreatePageContainer'
import AuthContainer from '@/components/shared/AuthWrapper'

const CreatePage = () => {
    return (
        // <AuthContainer>
            <Wrapper title={"Create Request"}>
                <CreatePageContainer />
            </Wrapper>
        // </AuthContainer>
    )
}

export default CreatePage
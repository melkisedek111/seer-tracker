import Wrapper from '@/components/shared/Wrapper'
import React from 'react'
import CreatePageContainer from './components/CreatePageContainer'
import AuthWrapper from '@/components/shared/AuthWrapper'

const CreatePage = () => {
    return (
        <Wrapper title={"Create Request"}>
            <CreatePageContainer />
        </Wrapper>
    )
}

export default CreatePage
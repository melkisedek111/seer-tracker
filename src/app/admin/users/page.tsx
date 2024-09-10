import Wrapper from '@/components/shared/Wrapper'
import React from 'react'
import UserPageContainer from './components/UserPageContainer'
import CreateUserButtonLink from './components/CreateUserButtonLink'

const UsersPage = () => {
    return (
        <Wrapper title={"Users"}  extraElement={<CreateUserButtonLink />}>
            <UserPageContainer />
        </Wrapper>
    )
}

export default UsersPage
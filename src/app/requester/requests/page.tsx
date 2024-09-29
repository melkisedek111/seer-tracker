import Wrapper from '@/components/shared/Wrapper'
import React from 'react'
import RequestPageContainer from './components/RequestPageContainer'
import Link from 'next/link'
import { APP_LINKS } from '@/constants/links'
import CreateRequestButtonLink from './components/CreateRequestButtonLink'

const RequestsPage = () => {
    return (
        <Wrapper title={"Requests"} extraElement={<CreateRequestButtonLink />}>
            <RequestPageContainer />
        </Wrapper>
    )
}

export default RequestsPage
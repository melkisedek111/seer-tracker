import Wrapper from '@/components/shared/Wrapper'
import React from 'react'
import RequestPageContainer from './components/RequestPageContainer'
import CreateRequestButtonLink from './components/CreateRequestButtonLink'

const ServiceRequestsPage = () => {
    return (
        <Wrapper title={"Requests"} extraElement={<CreateRequestButtonLink />}>
            <RequestPageContainer />
        </Wrapper>
    )
}

export default ServiceRequestsPage
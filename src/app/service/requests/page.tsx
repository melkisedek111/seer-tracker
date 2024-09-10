import Wrapper from '@/components/shared/Wrapper'
import React from 'react'
import ServiceRequestsPageContainer from './components/ServiceRequestsPageContainer'

const ServiceRequestsPage = () => {
    return (
        <Wrapper title={"Requests"}>
            <ServiceRequestsPageContainer />
        </Wrapper>
    )
}

export default ServiceRequestsPage
import Wrapper from '@/components/shared/Wrapper'
import React from 'react'
import AdminDashboard from './components/AdminDashboard'
import CreateUserButtonLink from './users/components/CreateUserButtonLink'

const AdminPage = () => {
    return (
        <Wrapper title={"Dashboard"}>
            <AdminDashboard />
        </Wrapper>
    )
}

export default AdminPage
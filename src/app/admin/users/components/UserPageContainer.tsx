import React from 'react'
import UserFilter from './UserFilter'
import UsersTable from './UsersTable'

const UserPageContainer = () => {
    return (
        <main className="grid space-y-5">
            <UserFilter />
            <UsersTable />
        </main>
    )
}

export default UserPageContainer
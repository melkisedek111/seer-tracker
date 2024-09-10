"use client";
import React, { useEffect, useState } from 'react'
import CreateUserForm from './CreateUserForm'
import { handleSomething } from '@/app/actions/user.actions'

const CreateUserPageContainer = () => {
    return (
        <main className="grid space-y-5">
           <CreateUserForm />
        </main>
    )
}

export default CreateUserPageContainer
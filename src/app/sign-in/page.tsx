import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SigInForm from './components/SigInForm'

const SignInPage = () => {
    return (
        <div className='w-screen h-screen flex items-center'>
            <div className="mx-auto max-w-lg flex-1 space-y-7">
                <Image src="/logo/seer-tracker.svg" height={400} width={550} alt="app logo" className='object-contain' />
                <SigInForm />
            </div>
        </div>
    )
}

export default SignInPage
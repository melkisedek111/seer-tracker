
import { Loader } from 'lucide-react'
import React from 'react'

const FormLoader = () => {
    return (
        <main className="w-full h-full grid place-items-center bg-neutral-400/10">
            <Loader className="animate-spin" />
        </main>
    )
}

export default FormLoader
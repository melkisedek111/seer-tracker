import { Loader } from 'lucide-react'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className="h-screen w-full grid place-items-center">
        <Loader className="animate-spin" />
    </div>
  )
}

export default LoadingPage
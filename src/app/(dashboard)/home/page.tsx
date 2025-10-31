"use client"
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router = useRouter()
    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in")
                }
            }
        })
    }

    const { data, isPending } = authClient.useSession()
    if (isPending || !data?.session) {
        return null
    }
  return (
    <div>
         <Button variant="outline"
            onClick={onLogout}
        >
            <LogOutIcon className="size-4 text-black" />
                Logout
            </Button>
    </div>
  )
}

export default page
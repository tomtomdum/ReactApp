import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"



const MainPage = () => {
    const { toast } = useToast()

    return (
        <main>
            <Button
                onClick={() => {
                    toast({
                        title: "Scheduled: Catch up",
                        description: "Friday, February 10, 2023 at 5:57 PM",
                    })
                }}
            >
                Show Toast
            </Button>
        </main>

    )
}

export default MainPage
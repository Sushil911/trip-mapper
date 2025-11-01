"use client"


import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {FaFacebook, FaGoogle} from "react-icons/fa"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
 } from "@/components/ui/form"
import { Alert,AlertTitle } from "@/components/ui/alert"
import { OctagonAlertIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

const formSchema= z.object({
    name:z.string().min(1,{message:"Name is required"}),
    email:z.string().email(),
    password:z.string().min(1,{message:'Password is required'}),
    confirmPassword:z.string().min(1,{message:'Password is required'})
}).
refine((data)=>data.password===data.confirmPassword,{
    message:"Passwords don't match",
    path:["confirmPassword"]
})


const page = () => {
    const router= useRouter()
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    })

    const onSubmit = (data:z.infer<typeof formSchema>) => {
        setPending(true)
        setError(null)
            
    }

    return(
        <div className="flex justify-center items-center mt-20 gap-6">
        <Card className="overflow-hidden p-0">
            <CardContent className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">
                                    Create your memory
                                </h1>
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                control={form.control}
                                name="name"
                                render={({field})=>
                                <FormItem>
                                    <FormLabel>Enter the locations you visited</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Pokhara, Mustang, ...."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                }
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                control={form.control}
                                name="email"
                                render={({field})=>
                                <FormItem>
                                    <FormLabel>Experience(out of 10)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="8"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                }
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                control={form.control}
                                name="password"
                                render={({field})=>
                                <FormItem>
                                    <FormLabel>Describe your Experience</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="textarea"
                                            placeholder="It was so good"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                }
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({field})=>
                                <FormItem>
                                    <FormLabel>Was it worth doing it again?</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="yes/no"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                }
                                />
                            </div>
                            {!!error && (
                                <Alert className="bg-destructive/10 border-none">
                                    <OctagonAlertIcon className="h-4 wp-4 text-destructive" />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}
                            <Button>Submit</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
        </div>
    )
}

export default page
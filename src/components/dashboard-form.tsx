"use client"


import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

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
 import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { Alert,AlertTitle } from "@/components/ui/alert"
import { OctagonAlertIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Calendar } from "@/components/ui/calendar"

export const locations = () => {
  return [
    {
    id: 1,
    name: "Mount Everest Base Camp",
    position: [27.9881, 86.925],
    type: "trekking",
    rating: 4.9,
    priceLevel: 3,
    location:"Solukhumbu"
  },
  {
    id: 2,
    name: "Pashupatinath Temple",
    position: [27.7106, 85.3483],
    
    type: "temple",
    rating: 4.7,
    priceLevel: 1,
    location:"Kathmandu",
  },
  {
    id: 3,
    name: "Pokhara",
    position: [28.2096, 83.9856],
    
    type: "mountain",
    rating: 4.8,
    priceLevel: 2,
    location:"Pokhara",
  },
  {
    id: 4,
    name: "Swayambhunath Stupa",
    position: [27.7149, 85.2904],
   
    rating: 4.6,
    priceLevel: 1,
    location:"Kathmandu",
  },
  {
    id: 5,
    name: "Chitwan National Park",
    position: [27.5, 84.3333],
    
    type: "national_park",
    rating: 4.5,
    priceLevel: 2,
    location:"Chitwan",
  },
  {
    id: 6,
    name: "Boudhanath Stupa",
    position: [27.7218, 85.3621],
    
    type: "temple",
    rating: 4.7,
    priceLevel: 1,
    location:"Kathmandu",
  },
  {
    id: 7,
    name: "Kathmandu Durbar Square",
    position: [27.7045, 85.3072],
    
    type: "palace",
    rating: 4.4,
    priceLevel: 1,
    location:"Kathmandu",
  },
  {
    id: 8,
    name: "Annapurna Circuit",
    position: [28.596, 83.82],
   
    type: "trekking",
    rating: 4.9,
    priceLevel: 3,
    location:"Pokhara",
  },
  {
    id: 9,
    name: "Lumbini",
    position: [27.4698, 83.2757],
   
    type: "historic",
    rating: 4.6,
    priceLevel: 2,
    location:"Rupandehi"
  },
  {
    id: 10,
    name: "Nagarkot",
    position: [27.7156, 85.5232],
   
    type: "mountain",
    rating: 4.3,
    priceLevel: 2,
    location:"Kathmandu",
  },]}

const formSchema= z.object({
    country:z.string().min(1,{message:"Destination is required"}),
    location:z.string().min(1,{message:"Location is required"}),
    datefrom:z.string().min(1,{message:'Date From is required'}),
    dateto:z.string().min(1,{message:'Date To is required'}),
    budget:z.string().min(1,{message:'Budget is required'})
})

export const DashboardForm = () => {
    const router= useRouter()
    const [error, setError] = useState<string | null>(null)
    const [pending, setPending] = useState(false)

    const [filteredTrips, setFilteredTrips] = useState<any[]>([])
    const [showResults, setShowResults] = useState(false)
    const [formvalues, setformvalues] = useState<{}>({
            country:'',
            location:'',
            datefrom:'',
            dateto:'',
            budget:''
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            country:'',
            location:'',
            datefrom:'',
            dateto:'',
            budget:''
        }
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setPending(true)
        setError(null)
        
        try {
            

            // Filter by country
            if (data.country) {
                let filtered = data.filter(trip => 
                    trip.country.toLowerCase() === data.country.toLowerCase()
                );
            }

            // Filter by location if selected
            if (data.location) {
                let filtered : any = filtered.filter(trip => 
                    trip.location.toLowerCase() === data.location!.toLowerCase()
                );
            }

            // Filter by budget
            if (data.budget) {
                const budgetRanges = {
                    low: { min: 100, max: 200 },
                    medium: { min: 200, max: 500 },
                    high: { min: 500, max: 1000 }
                };

                const range = budgetRanges[data.budget as keyof typeof budgetRanges];
                if (range) {
                    filtered = filtered.filter(trip => 
                        trip.price >= range.min && trip.price <= range.max
                    );
                }
            }

            setFilteredTrips(filtered);
            setShowResults(true);
            
        } catch (err) {
            setError('Failed to filter trips');
            console.error(err);
        } finally {
            setPending(false);
        }
    }

    const [date, setDate] = useState<Date | undefined>(new Date())

    return(
        <div className="flex flex-col gap-6 pt-3">
        <Card className="overflow-hidden p-0">
            <CardContent className="flex">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <div className="flex flex-row gap-6">
                                <FormField
                                control={form.control}
                                name="country"
                                
                                render={({field})=>
                                <FormItem>
                                    <FormControl>
                                        
                                        <Select  onValueChange={setformvalues}>
                                            <SelectTrigger className="w-[180px]" >
                                                <SelectValue placeholder="Country"
                                                {...field} 
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectItem value="nepal">Nepal</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                            </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                }
                                />
                                <FormField
                                control={form.control}
                                name="location"
                                render={({field})=>
                                <FormItem>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className="w-[180px]" >
                                                <SelectValue placeholder="Select a location" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>                                            
                                                
                                                <SelectGroup>
                                                    
                                                <SelectItem value="kathmandu">Kathmandu</SelectItem>
                                                <SelectItem value="pokhara">Pokhara</SelectItem>
                                                <SelectItem value="rupandehi">Rupandehi</SelectItem>
                                                <SelectItem value="chitwan">Chitwan</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                            
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                }
                                />
                                <FormField
                                control={form.control}
                                name="datefrom"
                                render={({field})=>
                                <FormItem>
                                    <FormControl>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline">Date From</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-fit" align="start">
                                                <DropdownMenuItem>
                                                    <Calendar
                                                        mode="single"
                                                        className="rounded-lg border"
                                                        {...field}
                                                    />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                            </DropdownMenu>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                }
                                />
                                <FormField
                                control={form.control}
                                name="dateto"
                                render={({field})=>
                                <FormItem>
                                    <FormControl>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline">Date To</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-fit" align="start">
                                                <DropdownMenuItem>
                                                    <Calendar
                                                        mode="single"
                                                        className="rounded-lg border"
                                                        {...field}
                                                    />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                            </DropdownMenu>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                }
                                />
                                <FormField
                                control={form.control}
                                name="budget"
                                render={({field})=>
                                <FormItem>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select your budget" {...field} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                <SelectItem value="low">Low Budget($100-$200)</SelectItem>
                                                <SelectItem value="medium">Medium Budget($200-$500)</SelectItem>
                                                <SelectItem value="high">High Budget($500-$1000)</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                            </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                }
                                />
                            {!!error && (
                                <Alert className="bg-destructive/10 border-none">
                                    <OctagonAlertIcon className="h-4 wp-4 text-destructive" />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                            )}
                            <Button
                            disabled={pending}
                            type="submit"
                            className=""
                            >
                                Find your trip
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
        {showResults && (
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Found {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'}
                    </h3>
                    
                    {filteredTrips.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground">No trips found matching your criteria.</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Try adjusting your filters or search with different parameters.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTrips.map((trip) => (
                                <Card key={trip.id} className="overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="p-4">
                                            <h4 className="font-semibold text-lg mb-2">{trip.name}</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Location:</span>
                                                    <span className="font-medium">{trip.location}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Type:</span>
                                                    <span className="font-medium capitalize">{trip.type}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Rating:</span>
                                                    <span className="font-medium">⭐ {trip.rating}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Price:</span>
                                                    <span className="font-medium text-green-600">${trip.price}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Price Level:</span>
                                                    <span className="font-medium">
                                                        {Array.from({ length: trip.priceLevel }, (_, i) => (
                                                            <span key={i}>$</span>
                                                        ))}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        )}
        </div>
    )
}

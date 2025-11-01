"use client"
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';


// HotelCard.jsx
const HotelCard = ({hotel}:{hotel:any}) => {
  return (

    <Card className='w-full max-w-lg' onClick={()=> redirect(`/hotels/${hotel.id}`)} key={hotel.id}>
      <CardHeader>
        <Image 
          src={hotel.image}
          alt={`${hotel.name} image`} 
          width={300} 
          height={200} 
          className='w-full h-48 object-cover rounded-lg'
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{hotel.name}</CardTitle>
        <div className='flex justify-between items-center mt-2'>
          <span className='text-lg font-semibold'>Genre: {hotel.type}</span>
          <span>⭐ {hotel.rating}</span>
        </div>
        <p className='text-sm text-gray-600 mt-1'>{hotel.description}</p>
        <Link href={''}>
            <Button
                type="submit"
                className="mt-4"
                >
                Explore More 
            </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default HotelCard

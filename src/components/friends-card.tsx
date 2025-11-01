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


export const FriendsCard = ({guide}:{guide:any}) => {
  return (

    <Card className='w-full max-w-lg' onClick={()=> redirect(`/hotels/${guide.id}`)} key={guide.id}>
      <CardHeader>
        <Image 
          src={guide.src}
          alt={`${guide.Name} image`} 
          width={300} 
          height={200} 
          className='w-full h-full object-cover rounded-lg'
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{guide.Name}</CardTitle>
        <div className='flex justify-between items-center mt-2'>
          <span className='text-lg font-semibold'>Experience: {guide.Experience}</span>
          <span>⭐ {guide.Ratings}</span>
        </div>
        <p className='text-sm text-gray-600 mt-1'>{guide.Location}</p>
        <Link href="/">
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


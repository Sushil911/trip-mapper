import React from 'react'
import {FriendsCard} from '@/components/friends-card'

const page = () => {
  const getguide = () => {
  return [
    {
      id:'1',
      Name: "Ram Maharjan",
      src:'/man-1.jpg',
      Age: 27,
      Experience: "5yrs+",
      Ratings: 4.9,
      Language_Spoken: "English,Nepali,Hindi,Bhojpuri",
      Location: "Lumbini",
    },
    {
      id:'2',
      Name: "Sita Shrestha",
      Age: 25,
      src:'/woman-1.jpg',
      Experience: "3yrs+",
      Ratings: 4.8,
      Language_Spoken: "English, Nepali, Hindi",
      Location: "Pokhara",
    },
    {
      id:'3',
      Name: "Kiran Gurung",
      Age: 30,
      src:'/man-2.jpg',
      Experience: "7yrs+",
      Ratings: 4.7,
      Language_Spoken: "English, Nepali, Japanese",
      Location: "Kathmandu",
    },
    {
      id:'4',
      Name: "Pemba Sherpa",
      src:'/woman-4.jpg',
      Age: 34,
      Experience: "10yrs+",
      Ratings: 5.0,
      Language_Spoken: "English, Nepali, Tibetan",
      Location: "Everest Region",
    },
    {
      id:'5',
      Name: "Anjali Rai",
      src:'/woman-3.jpg',
      Age: 28,
      Experience: "6yrs+",
      Ratings: 4.6,
      Language_Spoken: "English, Nepali, Hindi, Chinese",
      Location: "Chitwan",
    },
    {
      id:'6',
      Name: "Bikash Thapa",
      src:'/man-3.jpg',
      Age: 32,
      Experience: "8yrs+",
      Ratings: 4.9,
      Language_Spoken: "English, Nepali, Hindi",
      Location: "Janakpur",
    },
  ];
};

  return (
    <div className='p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
                {getguide().map((guide) => (
                  <FriendsCard key={guide.id} guide={guide} />
                ))}
    </div>
  )
}

export default page
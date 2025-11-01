// src/data/hotels.ts

export interface Hotel {
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  amenities: string[];
  contact: string;
  availableRooms: number;
}

export const getHotels = (): Hotel[] => {
  return [
    {
      name: "Hotel Mount View",
      location: "Pokhara",
      rating: 4.8,
      pricePerNight: 4500,
      amenities: [
        "Free WiFi",
        "Breakfast Included",
        "Lake View",
        "Airport Pickup",
      ],
      contact: "+977-9801234567",
      availableRooms: 12,
    },
    {
      name: "Lumbini Heritage Resort",
      location: "Lumbini",
      rating: 4.7,
      pricePerNight: 3800,
      amenities: ["Pool", "Gym", "Free Parking", "Breakfast Included"],
      contact: "+977-9812345678",
      availableRooms: 8,
    },
    {
      name: "Himalayan Bliss Hotel",
      location: "Kathmandu",
      rating: 4.9,
      pricePerNight: 5200,
      amenities: ["Rooftop Restaurant", "Free WiFi", "Spa", "Bar"],
      contact: "+977-9856789012",
      availableRooms: 15,
    },
    {
      name: "Chitwan Paradise Lodge",
      location: "Chitwan",
      rating: 4.6,
      pricePerNight: 4000,
      amenities: ["Safari Tours", "Swimming Pool", "Breakfast", "WiFi"],
      contact: "+977-9841234567",
      availableRooms: 10,
    },
    {
      name: "Everest Base Inn",
      location: "Solukhumbu",
      rating: 5.0,
      pricePerNight: 7000,
      amenities: ["Mountain View", "Heated Rooms", "WiFi", "Hot Shower"],
      contact: "+977-9807654321",
      availableRooms: 5,
    },
    {
      name: "Janakpur Comfort Stay",
      location: "Janakpur",
      rating: 4.5,
      pricePerNight: 3200,
      amenities: ["Breakfast", "WiFi", "24/7 Room Service", "Parking"],
      contact: "+977-9818765432",
      availableRooms: 20,
    },
  ];
};

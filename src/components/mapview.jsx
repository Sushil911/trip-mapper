"use client";

import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Navigation,
  X,
  Heart,
  DollarSign,
  Gauge,
} from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons
const createCustomIcon = (color = "#3B82F6") => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color}; 
        width: 32px; 
        height: 32px; 
        border-radius: 50%; 
        border: 3px solid white; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      "></div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const typeIcons = {
  historic: "🏛️",
  national_park: "🌲",
  trekking: "🥾",
  temple: "🛕",
  mountain: "🏔️",
  palace: "🏯",
  market: "🛍️",
  restaurant: "🍴",
  hotel: "🏨",
  other: "📍",
};

const typeColors = {
  historic: "#8B5CF6",
  national_park: "#10B981",
  trekking: "#DC2626",
  temple: "#F59E0B",
  mountain: "#6366F1",
  palace: "#EC4899",
  market: "#EF4444",
  restaurant: "#EC4899",
  hotel: "#6366F1",
  other: "#6B7280",
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const popularNepalPlaces = [
  {
    id: 1,
    name: "Mount Everest Base Camp",
    position: [27.9881, 86.925],
    description:
      "World's highest mountain and ultimate trekking destination in the Himalayas.",
    type: "trekking",
    rating: 4.9,
    price: "expensive",
    priceLevel: 3,
  },
  {
    id: 2,
    name: "Pashupatinath Temple",
    position: [27.7106, 85.3483],
    description:
      "Sacred Hindu temple complex and UNESCO World Heritage site in Kathmandu.",
    type: "temple",
    rating: 4.7,
    price: "cheap",
    priceLevel: 1,
  },
  {
    id: 3,
    name: "Pokhara",
    position: [28.2096, 83.9856],
    description:
      "Beautiful lakeside city with stunning views of Annapurna mountain range.",
    type: "mountain",
    rating: 4.8,
    price: "moderate",
    priceLevel: 2,
  },
  {
    id: 4,
    name: "Swayambhunath Stupa",
    position: [27.7149, 85.2904],
    description:
      "Ancient religious architecture atop a hill in Kathmandu, also known as Monkey Temple.",
    type: "temple",
    rating: 4.6,
    price: "cheap",
    priceLevel: 1,
  },
  {
    id: 5,
    name: "Chitwan National Park",
    position: [27.5, 84.3333],
    description:
      "UNESCO World Heritage site with wildlife including Bengal tigers and one-horned rhinoceros.",
    type: "national_park",
    rating: 4.5,
    price: "moderate",
    priceLevel: 2,
  },
  {
    id: 6,
    name: "Boudhanath Stupa",
    position: [27.7218, 85.3621],
    description:
      "One of the largest stupas in Nepal and center of Tibetan Buddhism.",
    type: "temple",
    rating: 4.7,
    price: "cheap",
    priceLevel: 1,
  },
  {
    id: 7,
    name: "Kathmandu Durbar Square",
    position: [27.7045, 85.3072],
    description:
      "Historic square with ancient palaces and temples in the heart of Kathmandu.",
    type: "palace",
    rating: 4.4,
    price: "cheap",
    priceLevel: 1,
  },
  {
    id: 8,
    name: "Annapurna Circuit",
    position: [28.596, 83.82],
    description:
      "Classic trekking route through diverse landscapes and traditional villages.",
    type: "trekking",
    rating: 4.9,
    price: "expensive",
    priceLevel: 3,
  },
  {
    id: 9,
    name: "Lumbini",
    position: [27.4698, 83.2757],
    description:
      "Birthplace of Lord Buddha and important pilgrimage site for Buddhists worldwide.",
    type: "historic",
    rating: 4.6,
    price: "moderate",
    priceLevel: 2,
  },
  {
    id: 10,
    name: "Nagarkot",
    position: [27.7156, 85.5232],
    description:
      "Hill station near Kathmandu offering panoramic Himalayan views and sunrise/sunset spots.",
    type: "mountain",
    rating: 4.3,
    price: "moderate",
    priceLevel: 2,
  },
];

function MapController({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

function SearchBox({ onPlaceSelect, onFiltersChange, userLocation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    price: "all",
    type: "all",
    rating: "all",
    maxDistance: "any",
  });

  const searchPlaces = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery + " Nepal"
        )}&limit=8&countrycodes=np`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchPlaces(query);
      onFiltersChange({ ...filters, searchQuery: query });
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [query, filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange({ ...newFilters, searchQuery: query });
  };

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white rounded-xl shadow-2xl w-80">
      <div className="p-4 border-b border-gray-100">
        <h1 className="font-bold text-xl text-gray-800">Explore Nepal</h1>
        <p className="text-sm text-gray-600 mt-1">Discover amazing places</p>

        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search places in Nepal..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 text-black focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded ${
              showFilters ? "bg-blue-100 text-blue-600" : "text-gray-400"
            }`}
          >
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <DollarSign className="inline h-4 w-4" /> Price Range
              </label>
              <select
                value={filters.price}
                onChange={(e) => handleFilterChange("price", e.target.value)}
                className="w-full p-2 border border-gray-300 text-black rounded-lg text-sm"
              >
                <option value="all">All Prices</option>
                <option value="cheap">💰 Cheap (Under $100)</option>
                <option value="moderate">💰💰 Moderate ($100-$1000)</option>
                <option value="expensive">💰💰💰 Expensive ($1000+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Star className="inline h-4 w-4" /> Minimum Rating
              </label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange("rating", e.target.value)}
                className="w-full p-2 border border-gray-300 text-black rounded-lg text-sm"
              >
                <option value="all">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Gauge className="inline h-4 w-4" /> Place Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="w-full p-2 border border-gray-300 text-black rounded-lg text-sm"
              >
                <option value="all">All Types</option>
                <option value="trekking">🥾 Trekking</option>
                <option value="temple">🛕 Temple</option>
                <option value="mountain">🏔️ Mountain</option>
                <option value="palace">🏯 Palace</option>
                <option value="national_park">🌲 National Park</option>
                <option value="historic">🏛️ Historic</option>
              </select>
            </div>

            {userLocation && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="inline h-4 w-4" /> Max Distance
                </label>
                <select
                  value={filters.maxDistance}
                  onChange={(e) =>
                    handleFilterChange("maxDistance", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="any">Any Distance</option>
                  <option value="50">Within 50 km</option>
                  <option value="100">Within 100 km</option>
                  <option value="200">Within 200 km</option>
                  <option value="500">Within 500 km</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-h-80 overflow-y-auto">
        {results.map((place) => (
          <div
            key={place.place_id}
            className="p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
            onClick={() => {
              onPlaceSelect(place);
              setQuery("");
              setResults([]);
            }}
          >
            <div className="flex items-start space-x-3">
              <MapPin className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm truncate">
                  {place.display_name.split(",")[0]}
                </div>
                <div className="text-gray-500 text-xs mt-1 line-clamp-2">
                  {place.display_name}
                </div>
              </div>
            </div>
          </div>
        ))}

        {query && results.length === 0 && (
          <div className="p-4 text-center text-gray-500 text-sm">
            No places found. Try a different search.
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdvancedOSMMap() {
  const [center, setCenter] = useState([28.3949, 84.124]); // Nepal coordinates
  const [zoom, setZoom] = useState(7);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchPlace, setSearchPlace] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [filters, setFilters] = useState({
    price: "all",
    type: "all",
    rating: "all",
    maxDistance: "any",
    searchQuery: "",
  });

  const placesWithDistance = popularNepalPlaces.map((place) => {
    let distance = null;
    if (userLocation) {
      distance = calculateDistance(
        userLocation[0],
        userLocation[1],
        place.position[0],
        place.position[1]
      );
    }
    return { ...place, distance };
  });

  const filteredPlaces = placesWithDistance.filter((place) => {
    if (filters.price !== "all" && place.price !== filters.price) return false;

    if (filters.type !== "all" && place.type !== filters.type) return false;

    if (filters.rating !== "all" && place.rating < parseFloat(filters.rating))
      return false;

    if (filters.maxDistance !== "any" && place.distance !== null) {
      if (place.distance > parseFloat(filters.maxDistance)) return false;
    }

    if (
      filters.searchQuery &&
      !place.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  const handlePlaceSelect = (place) => {
    const newCenter = [parseFloat(place.lat), parseFloat(place.lon)];
    setCenter(newCenter);
    setZoom(14);
    setSearchPlace(place);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const toggleFavorite = (placeId) => {
    setFavorites((prev) =>
      prev.includes(placeId)
        ? prev.filter((id) => id !== placeId)
        : [...prev, placeId]
    );
  };

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = [position.coords.latitude, position.coords.longitude];
          setUserLocation(userLoc);
          setCenter(userLoc);
          setZoom(14);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert(
            "Unable to get your location. Please ensure location services are enabled."
          );
        }
      );
    }
  };

  const getPriceIcons = (price) => {
    if (price === "cheap") return "💰";
    if (price === "moderate") return "💰💰";
    if (price === "expensive") return "💰💰💰";
    return "";
  };

  const formatDistance = (distance) => {
    if (distance === null) return "Distance unknown";
    if (distance < 1) return `${(distance * 1000).toFixed(0)} m`;
    return `${distance.toFixed(1)} km`;
  };

  const getEntranceFee = (fee) => {
    if (fee === 0) return "Free";
    return `₹${fee}`;
  };

  return (
    <div className="w-full h-screen relative">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController center={center} zoom={zoom} />

        {userLocation && (
          <Marker position={userLocation} icon={createCustomIcon("#10B981")}>
            <Popup>
              <div className="text-center">
                <div className="font-bold">Your Location</div>
                <div className="text-sm text-gray-600">You are here</div>
              </div>
            </Popup>
          </Marker>
        )}

        {filteredPlaces.map((place) => (
          <Marker
            key={place.id}
            position={place.position}
            icon={createCustomIcon(typeColors[place.type])}
            eventHandlers={{
              click: () => setSelectedPlace(place),
            }}
          >
            <Popup>
              <div className="min-w-[280px]">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    {typeIcons[place.type]} {place.name}
                  </h3>
                  <button
                    onClick={() => toggleFavorite(place.id)}
                    className={`p-1 rounded-full ${
                      favorites.includes(place.id)
                        ? "text-red-500 bg-red-50"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className="h-4 w-4"
                      fill={
                        favorites.includes(place.id) ? "currentColor" : "none"
                      }
                    />
                  </button>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{place.rating}</span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-sm text-gray-600">
                    {getPriceIcons(place.price)} {place.price}
                  </span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-sm text-gray-600">
                    {getEntranceFee(place.entranceFee)}
                  </span>
                </div>

                {place.distance !== null && (
                  <div className="flex items-center gap-1 mb-2 text-sm text-blue-600">
                    <MapPin className="h-3 w-3" />
                    {formatDistance(place.distance)} away
                  </div>
                )}

                <p className="text-sm text-gray-600 mb-3">
                  {place.description}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCenter(place.position);
                      setZoom(14);
                    }}
                    className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    View on Map
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {searchPlace && (
          <Marker
            position={[
              parseFloat(searchPlace.lat),
              parseFloat(searchPlace.lon),
            ]}
            icon={createCustomIcon("#EF4444")}
          >
            <Popup>
              <div className="min-w-[250px]">
                <h3 className="font-bold text-lg mb-2">📍 Search Result</h3>
                <p className="text-sm text-gray-600">
                  {searchPlace.display_name}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <SearchBox
        onPlaceSelect={handlePlaceSelect}
        onFiltersChange={handleFiltersChange}
        userLocation={userLocation}
      />

      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-xl shadow-2xl w-80 max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              Popular Places
            </h2>
            {userLocation && (
              <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                📍 Location Active
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {filteredPlaces.length} places found
          </p>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => {
                setSelectedPlace(place);
                setCenter(place.position);
                setZoom(14);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{typeIcons[place.type]}</span>
                    <h3 className="font-semibold text-gray-900">
                      {place.name}
                    </h3>
                    {favorites.includes(place.id) && (
                      <Heart className="h-3 w-3 text-red-500 fill-current" />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium">
                        {place.rating}
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs text-gray-600">
                      {getPriceIcons(place.price)}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs text-gray-600">
                      {getEntranceFee(place.entranceFee)}
                    </span>
                  </div>

                  {place.distance !== null && (
                    <div className="flex items-center gap-1 mb-2 text-xs text-blue-600">
                      <MapPin className="h-3 w-3" />
                      {formatDistance(place.distance)} away
                    </div>
                  )}

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {place.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filteredPlaces.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>No places match your filters.</p>
              <p className="text-sm mt-1">
                Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={locateUser}
        className="absolute bottom-4 right-4 z-[1000] bg-white p-3 rounded-xl shadow-2xl hover:bg-gray-50 transition-colors"
        title="Find my location"
      >
        <Navigation className="h-5 w-5 text-gray-700" />
      </button>

      {selectedPlace && (
        <div className="absolute bottom-4  left-6 z-[1000] text-black bg-blue-200 rounded-xl shadow-2xl w-96 max-h-60 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2">
              {typeIcons[selectedPlace.type]} {selectedPlace.name}
            </h3>
            <button
              onClick={() => setSelectedPlace(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto max-h-64">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium">{selectedPlace.rating}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-600">
                {getPriceIcons(selectedPlace.price)} {selectedPlace.price}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-600">
                Entrance: {getEntranceFee(selectedPlace.entranceFee)}
              </span>
            </div>

            {selectedPlace.distance !== null && (
              <div className="flex items-center gap-2 mb-3 text-blue-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {formatDistance(selectedPlace.distance)} from your location
                </span>
              </div>
            )}

            <p className="text-gray-700 mb-4">{selectedPlace.description}</p>

            <div className="flex gap-2">
              <button
                onClick={() => toggleFavorite(selectedPlace.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  favorites.includes(selectedPlace.id)
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Heart
                  className="h-4 w-4"
                  fill={
                    favorites.includes(selectedPlace.id)
                      ? "currentColor"
                      : "none"
                  }
                />
                {favorites.includes(selectedPlace.id) ? "Saved" : "Save"}
              </button>

              <button
                onClick={() => {
                  setCenter(selectedPlace.position);
                  setZoom(14);
                }}
                className="flex-1 bg-blue-500  px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View on Map
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

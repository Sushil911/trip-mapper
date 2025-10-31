"use client";

import { create } from "zustand";
import axios from "axios";

const useStore = create((set, get) => ({
  mode: null,
  setmode: (mode) => set({ mode }),
  loc_measures: {
    Mylocation_lat: null,
    Mylocation_lng: null,
    Placelocation_lat: null,
    Placelocation_lng: null,
  },

  updateloc_measures: (field, value) =>
    set((state) => ({
      loc_measures: {
        ...state.loc_measures,
        [field]: value,
      },
    })),
  fetchdestinations: async (destination) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `https://route-init.gallimap.com/api/v1/reverse/generalReverse?accessToken=[7693fdad-b7a7-4f2a-8c1f-e9cb5d4b1c3d]&lat=${loc_measures.Placelocation_lat}&lng=${loc_measures.Placelocation_lng}`
      );
    } catch (err) {
      set({ error: err.message || "Error fetching hotels", loading: false });
    }
  },

  Distance: null,
  fetchDistance: async (destination) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `https://route-init.gallimap.com/api/v1/routing?mode=${mode}&srcLat=${loc_measures.Mylocation_lat}&srcLng=${loc_measures.Mylocation_lng}&dstLat=${locmeasures.Placelocation_lat}&dstLng=${locmeasures.Placelocation_lng}&accessToken=[7693fdad-b7a7-4f2a-8c1f-e9cb5d4b1c3d]`
      );
    } catch (err) {
      set({ error: err.message || "Error fetching hotels", loading: false });
    }
  },
  hotels: [],
  setHotels: (hotels) => set({ hotels }),
  tours: [],
  setTours: (tours) => set({ tours }),
  loading: false,
  destinations: [],
  error: null,
  guide: [],
  setguide: (guide) => set({ guide }),
  formData: {
    From: null,
    To: null,
    country: null,
    location: null,
    Budget: null,
  },

  updateForm: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  resetForm: () =>
    set({
      formData: {
        From: null,
        To: null,
        destination: "",
        Budget: null,
      },
    }),
}));

export default useStore;

"use client";

import { useRef, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { useEventListener } from "usehooks-ts";

import { Navigation, Search, X } from "lucide-react";

import { FormInput } from "./form/form-input";
import LoadingMapsPage from "@/app/(platform)/(admin)/dashboard/loading";
import { cn } from "@/lib/utils";

const center = { lat: 10.845453, lng: 106.836512 };

const Maps = ({ className }: { className?: string }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionResponse, setDirectionResponse] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const calculate = async () => {
    if (
      originRef.current?.value === "" ||
      destinationRef.current?.value === ""

      // !originRef.current ||
      // !destinationRef.current ||
      // !originRef.current.value ||
      // !destinationRef.current.value
    ) {
      return;
    }

    const originValue = originRef.current?.value as string;
    const destinationValue = destinationRef.current?.value as string;

    if (!originRef || !destinationRef) {
      return;
    }

    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: originValue,
      destination: destinationValue,
      travelMode: google.maps.TravelMode.DRIVING,
      // polylineOption: {}
      // polylineOptions: {
      //   strokeColor: "red", // Change the color to your desired color
      // },
    });

    setDirectionResponse(result);
    // Check if routes and legs are defined before accessing them
    if (result.routes && result.routes.length > 0) {
      const route = result.routes[0];
      if (route.legs && route.legs.length > 0) {
        const leg = route.legs[0];
        if (leg.distance) {
          setDistance(leg.distance.text || "N/A");
        }
        if (leg.duration) {
          setDuration(leg.duration.text || "N/A");
        }
      }
    }
  };

  const clearValue = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    if (originRef.current) {
      originRef.current.value = "";
      originRef.current.focus();
    }

    if (destinationRef.current) {
      destinationRef.current.value = "";
    }
  };

  const conditionStyleSearch = distance && duration && "text-primary scale:110";

  const onLoad = (autocomplete: any) => {
    autocomplete.setOptions({
      types: ["geocode"],
      componentRestrictions: { country: "VN" }, // the region country
    });

    // Add event listeners to the Autocomplete instance
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log("Place details not found.");
        return;
      }

      const name = place.name;
      const address = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      // console.log("Name: " + name);
      // console.log("Address: " + address);
      // console.log("Latitude: " + lat);
      // console.log("Longitude: " + lng);

      // Do something with the selected place data, e.g., update state
      // For example, if you want to update a state variable with the selected place:
      // setSelectedPlace({ name, address, lat, lng });
    });
  };

  const onKeydown = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "Enter") {
      calculate();
    }
  };

  useEventListener("keydown", onKeydown);

  if (!isLoaded) {
    return <LoadingMapsPage />;
  }

  return (
    <div className="">
      <div className="flex flex-row items-center justify-center w-full relative">
        <div className="w-full flex items-center justify-center">
          <div className="flex flex-col gap-2 p-2 bg-card rounded-lg absolute left-4 top-4 z-10">
            <div className="p-3 flex flex-row gap-2 items-center justify-center w-full">
              <Autocomplete>
                <FormInput
                  ref={originRef}
                  type="text"
                  placeholder="Departure point"
                  id="destination"
                  className="h-10 pl-2 py-1 w-80 rounded-md outline-none duration-200"

                  // searchIcon={<BsSearch size={24} />}
                />
              </Autocomplete>

              <Autocomplete onLoad={onLoad}>
                <FormInput
                  ref={destinationRef}
                  type="text"
                  placeholder="Destination"
                  id="destination"
                  className="h-10 pl-2 py-1 rounded-md w-80 outline-none duration-200"

                  // searchIcon={<BsSearch size={24} />}
                />
              </Autocomplete>
              <div
                onClick={calculate}
                ref={searchRef}
                className="p-2 rounded-full cursor-pointer bg-secondary hover:bg-secondaryForeground
                  hover:scale-105 transition duration-200"
              >
                <Search
                  size={24}
                  className={`${conditionStyleSearch} text-primary font-semibold`}
                />
              </div>

              <div
                onClick={clearValue}
                className="cursor-pointer bg-secondary hover:bg-secondaryForeground p-2 hover:scale-105
                  rounded-full duration-200"
              >
                <X
                  size={24}
                  className={`${conditionStyleSearch} text-primary font-semibold`}
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-between flex-1 p-3">
              <div className="text-primary font-semibold">
                {distance && (
                  <>
                    <span>Distance:</span>{" "}
                    <span className="text-primary">{distance}</span>
                  </>
                )}
              </div>

              <div className="text-primary font-semibold">
                {duration && (
                  <>
                    <span>Estimate: </span>
                    <span className="text-primary">{duration}</span>
                  </>
                )}
              </div>

              <div
                onClick={() => map?.panTo(center)}
                className="rounded-full p-2 bg-secondary hover:bg-secondaryForeground hover:scale-105
                  cursor-pointer transition duration-200 group/navigation"
              >
                <Navigation
                  size={20}
                  className="group-hover/navigation:-translate-y-1 group-hover/navigation:translate-x-1
                    transform duration-300 text-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={cn("absolute h-full inset-0 w-full ", className)}>
        {/* <div className="h-full w-full absolute"> */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            borderRadius: "20px",
          }}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: false,
            mapTypeControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionResponse && (
            <DirectionsRenderer directions={directionResponse} />
          )}
          {/* display maker or direction */}
        </GoogleMap>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Maps;

import {
   MapContainer,
   TileLayer,
   Marker,
   Popup,
   useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIcon from "../../../../public/assets/map-marker.png";
import { Button, Modal } from "rsuite";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getLocation } from "@/store/userStore/slices/userSlice";

interface ModalType {
   open: boolean;
   setOpen: any;
   position?: any;
   setPosition?: any;
   setLocation?: any;
}

export default function LocationModal({
   open,
   setOpen,
   position,
   setPosition,
   setLocation,
}: ModalType) {
   function LocationMarker() {
      const defaultIcon = L.icon({
         iconUrl: markerIcon.src,
         iconSize: [35, 41],
         iconAnchor: [12, 41],
         popupAnchor: [1, -34],
      });
      const map = useMapEvents({
         click: (e: any) => {
            setPosition(e.latlng);
         },
      });
      console.log("position", position);

      return position === null ? null : (
         <Marker position={position} icon={defaultIcon}>
            {" "}
            <Popup>
               A pretty CSS3 popup.
               <br />
               Easily customizable.
            </Popup>
         </Marker>
      );
   }

   return (
      <Modal
         open={open}
         onClose={() => {
            setOpen(false);
            setLocation();
         }}
         size="md"
      >
         <Modal.Header>
            <Modal.Title>Location</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <MapContainer
               center={[34.802, 38.996]}
               zoom={10}
               style={{ height: "100vh", width: "100%" }}
            >
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />

               <LocationMarker />
            </MapContainer>
         </Modal.Body>
         <Modal.Footer>
            <Button onClick={() => setOpen(false)} appearance="subtle">
               Cancel
            </Button>
         </Modal.Footer>
      </Modal>
   );
}

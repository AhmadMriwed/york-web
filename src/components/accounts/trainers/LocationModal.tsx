import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import markerIcon from "../../../../public/assets/map-marker.png";
import { Button, Modal } from "rsuite";
import "leaflet/dist/leaflet.css";

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
      iconSize: [35, 40],
      iconAnchor: [12, 40],
      popupAnchor: [1, -35],
    });
    const map = useMapEvents({
      click: (e: any) => {
        setPosition(e.latlng);
      },
    });
    //  console.log("position", position);

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
          center={[position.lat, position.lng]}
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

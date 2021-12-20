import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import ICoordinate from "./ICoordinate";
import { useState } from "react";

const iconDefault = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37]
});

L.Marker.prototype.options.icon = iconDefault;

interface IMap {
    height: string;
    coordinates: ICoordinate[],
    handleMapClick(coordinates: ICoordinate): void
}
export const Map = (props: IMap) => {
    const [coordinates, setCoordinates] = useState<ICoordinate[]>(props.coordinates);
    return (
        <MapContainer
            className="my-2 rounded-3 border border-5"
            center={[10.906450958330087, 106.85082979165058]}
            zoom={14}
            style={{ height: props.height, width: '75%' }}
        >
            <TileLayer
                attribution="Movie-review"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClick setCoordinates={coordinates => {
                setCoordinates([coordinates]);
                props.handleMapClick(coordinates);
            }} />
            {coordinates.map((e, i) =>
                <Marker key={i} position={[e.lat, e.lng]} />
            )};
        </MapContainer>
    );
}

Map.defaultProps = {
    height: '350px'
}

// 

interface IMapClick {
    setCoordinates(coordinate: ICoordinate): void;
}
const MapClick = (props: IMapClick) => {
    useMapEvent('click', e => {
        props.setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng })
    })
    return null;
}
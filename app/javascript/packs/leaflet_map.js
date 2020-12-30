
import L from 'leaflet';
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadowIcon from "leaflet/dist/images/marker-shadow.png";

var myIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25,41],
    iconAnchor: [15,40],
    popupAnchor: [-3, -76],
    shadowUrl: markerShadowIcon,
    shadowSize: [55, 41],
    shadowAnchor: [15,40],
});

export { myIcon };
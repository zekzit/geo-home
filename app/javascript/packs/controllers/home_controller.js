import 'leaflet/dist/leaflet.css';
import { marker } from 'leaflet';
import { Controller } from 'stimulus';
import L from 'leaflet';
import { myIcon } from '../leaflet_map';

export default class extends Controller {
  markers = [];

  connect() {
    this.initializeGeoMap();
  }

  initializeGeoMap() {
    this.map = L.map('mapid').setView([7.874982, 98.363087], 13);
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoiemVreml0IiwiYSI6ImNramF3MDk2eTBldnQycHF2YTEwb2hjdmMifQ.wFhvwzAxOwN1_EKpRHXNNQ',
      },
    ).addTo(this.map);

    this.popup = L.popup();
    this.map.on('click', this.onMapClick);
  }

  onMapClick(e) {
    this.popup
      .setLatLng(e.latlng)
      .setContent('You clicked the map at ' + e.latlng.toString())
      .openOn(this.map);
  }

  drawMarkers() {
    this.markers.forEach((marker) => marker.addTo(this.map));
  }

  zoomTo(latitude, longitude) {
    this.map.setView([latitude, longitude], 11);
  }

  addMarker(event) {
    const currentTarget = event.currentTarget;
    this.markers.push(
      L.marker(
        [
          currentTarget.dataset.homeLatitude,
          currentTarget.dataset.homeLongitude,
        ],
        { icon: myIcon },
      ),
    );
    this.drawMarkers();
  }

  selectHome(event) {
    const currentTarget = event.currentTarget;
    this.zoomTo(currentTarget.dataset.homeLatitude,
        currentTarget.dataset.homeLongitude);
  }
}

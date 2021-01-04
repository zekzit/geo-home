import 'leaflet/dist/leaflet.css';
import { marker } from 'leaflet';
import { Controller } from 'stimulus';
import L from 'leaflet';
import { myIcon } from 'leaflet_map';
import Rails from '@rails/ujs';

export default class extends Controller {
  markers = [];

  allMarkers = {}

  static targets = [ "marker" ]
  // static values = { id: String }

  connect() {
    this.initializeGeoMap();
    this.addMarkers()    
  }

  addMarkers () {
    this.markerTargets.forEach(marker => {
      let id = marker.dataset.homeId
      let newMarker = this.markerFor(marker)
      this.allMarkers[id] = newMarker
      this.drawMarker(newMarker)
    })
    // console.log(this.allMarkers)
    // console.log(Object.values(this.allMarkers).length)
  }

  render () {
    let existsIds = this.markerTargets.map(m => m.id.replace("home_", ""))
    let keys = Object.keys(this.allMarkers)
    this.markerTargets.forEach(marker => {
      let id = marker.dataset.homeId
      if (!keys.includes(id)) {
        let newMarker = this.markerFor(marker)
        this.allMarkers[id] = newMarker
        this.drawMarker(newMarker)
      }
    })
  }

  async destroy (event) {
    
    let id = event.target.dataset.homeId
    let csrfToken = document.getElementsByName('csrf-token')[0].content
    console.log(`destroy: ${id}`)
    Rails.ajax({
      type: "delete",
      url: `/homes/${id}/unpin`,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      success: () => {
        console.log('success')
        let currentMarker = this.allMarkers[id]
        console.log(currentMarker)
        this.removeMarker(currentMarker)
        console.log(this.allMarkers)
        // delete this.allMarkers[id]
      }
    })
  }

  markerFor (data) {
    let id = data.dataset.homeId
    var popupContent =
      '<p>Some Infomation</p></br>' +
      '<p>test</p></br>' +
      '<button data-home-id="' + id + '" data-action="home#destroy">Clear Marker</button>';
    let myMarker = L.marker([
      data.dataset.homeLatitude,
      data.dataset.homeLongitude,
    ], {
      draggable: false,
      icon: myIcon
    });
    myMarker._id = data.dataset.homeId
    let myPopup = myMarker.bindPopup(popupContent, {
      closeButton: false
    });
    return myMarker
  }

  removeMarker (marker) {
    this.map.removeLayer(marker)
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

    // this.popup = L.popup();
    // this.map.on('click', this.onMapClick);
  }

  onMapClick(e) {
    this.popup
      .setLatLng(e.latlng)
      .setContent('You clicked the map at ' + e.latlng.toString())
      .openOn(this.map);
  }

  drawMarkers() {
    console.log(this.allMarkers)
    let markers = Object.values(this.allMarkers)
    markers.forEach((marker) => this.map.addLayer(marker))
  }

  drawMarker (marker) {
    // marker.addTo(this.map)
    this.map.addLayer(marker)
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

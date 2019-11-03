// Create the base Leaflet layer (the map itself)
let baseLayer = L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:
      'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
  }
);

// Configure and create the heatmap.js layer
let cfg = {
  radius: 40,
  useLocalExtrema: true,
  valueField: 'index'
};
let heatmapLayer = new HeatmapOverlay(cfg);

// Create the overall Leaflet map using the two layers we created
let propertyHeatMap = new L.Map('map', {
  center: new L.LatLng(37.8, -96),
  zoom: 2,
  layers: [baseLayer, heatmapLayer]
});

// Add data (from sales.js file) to the heatmap.js layer
heatmapLayer.setData({
  data: slavery
});

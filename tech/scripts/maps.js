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
  valueField: 'price'
};
let heatmapLayer = new HeatmapOverlay(cfg);

// Determine min/max (from sales.js file) for the heatmap.js plugin
let min = Math.min(...sales.map(sale => sale.value));
let max = Math.max(...sales.map(sale => sale.value));

// Create the overall Leaflet map using the two layers we created
let propertyHeatMap = new L.Map('map', {
  center: new L.LatLng(37.8, -96),
  zoom: 1,
  layers: [baseLayer, heatmapLayer]
});

// Add data (from sales.js file) to the heatmap.js layer
heatmapLayer.setData({
  min: min,
  max: max,
  data: sales
});

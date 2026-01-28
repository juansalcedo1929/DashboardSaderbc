// 📄 scripts/fetch-geojson.js
const fs = require('fs');
const https = require('https');
const path = require('path');

// Crear directorios si no existen
const publicDir = path.join(__dirname, '..', 'public');
const geojsonDir = path.join(publicDir, 'geojson');
const dataDir = path.join(publicDir, 'data');

[publicDir, geojsonDir, dataDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// URL del GeoJSON de municipios de BC (INEGI)
const municipiosUrl = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/mexico.geojson';

// Función para filtrar solo Baja California
function filterBajaCalifornia(geojson) {
  return {
    ...geojson,
    features: geojson.features.filter(feature => {
      const estado = feature.properties?.name || '';
      return estado.includes('Baja California');
    })
  };
}

// Descargar GeoJSON
console.log('📥 Descargando datos geográficos de BC...');

https.get(municipiosUrl, (res) => {
  let data = '';
  
  res.on('data', (chunk) => data += chunk);
  
  res.on('end', () => {
    try {
      const geojson = JSON.parse(data);
      const bcGeojson = filterBajaCalifornia(geojson);
      
      // Guardar archivo
      fs.writeFileSync(
        path.join(geojsonDir, 'bc-municipios.json'),
        JSON.stringify(bcGeojson, null, 2)
      );
      
      console.log('✅ GeoJSON de BC guardado en: public/geojson/bc-municipios.json');
      console.log(`📊 Municipios encontrados: ${bcGeojson.features.length}`);
      
      // Crear archivo de datos de ejemplo
      createSampleData();
      
    } catch (error) {
      console.error('❌ Error procesando GeoJSON:', error);
      createFallbackGeojson();
    }
  });
}).on('error', (err) => {
  console.error('❌ Error descargando datos:', err);
  createFallbackGeojson();
});

// Crear datos de ejemplo si falla la descarga
function createFallbackGeojson() {
  console.log('🔄 Creando GeoJSON de respaldo...');
  
  const fallbackGeojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { 
          NOM_MUN: "Tijuana", 
          NOM_ENT: "Baja California",
          CVE_MUN: "001"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[-117.5, 32.53], [-116.8, 32.53], [-116.8, 32.3], [-117.5, 32.3]]]
        }
      },
      // ... otros municipios
    ]
  };
  
  fs.writeFileSync(
    path.join(geojsonDir, 'bc-municipios.json'),
    JSON.stringify(fallbackGeojson, null, 2)
  );
  
  console.log('✅ GeoJSON de respaldo creado');
  createSampleData();
}

// Crear datos estadísticos de ejemplo
function createSampleData() {
  const sampleData = [
    { id: 1, region: "Norte", municipio: "Tijuana", indicador: "Población", valor: 1800000, fecha: "2024-01", tendencia: 2.5 },
    { id: 2, region: "Norte", municipio: "Mexicali", indicador: "Población", valor: 1100000, fecha: "2024-01", tendencia: 1.8 },
    { id: 3, region: "Norte", municipio: "Tecate", indicador: "Población", valor: 108000, fecha: "2024-01", tendencia: 0.8 },
    { id: 4, region: "Sur", municipio: "Ensenada", indicador: "Población", valor: 550000, fecha: "2024-01", tendencia: 1.2 },
    { id: 5, region: "Sur", municipio: "Playas de Rosarito", indicador: "Población", valor: 120000, fecha: "2024-01", tendencia: 3.1 }
  ];
  
  // Guardar como CSV
  const csvHeader = Object.keys(sampleData[0]).join(',');
  const csvRows = sampleData.map(row => 
    Object.values(row).map(val => 
      typeof val === 'string' ? `"${val}"` : val
    ).join(',')
  );
  const csvContent = [csvHeader, ...csvRows].join('\n');
  
  fs.writeFileSync(
    path.join(dataDir, 'estadisticas.csv'),
    csvContent
  );
  
  console.log('✅ Datos de ejemplo creados en: public/data/estadisticas.csv');
}
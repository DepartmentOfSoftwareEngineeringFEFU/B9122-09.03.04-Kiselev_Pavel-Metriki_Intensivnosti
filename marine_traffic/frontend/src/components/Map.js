// components/WorldMap.js
import { generateGrid } from './Wakeri.js'
import React from 'react';
import { useMemo } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Фикс для иконок маркеров в Leaflet (проблема с путями)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const createShipArrow = (course) => {
  return L.divIcon({
      html: `<div style="
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 20px solid #f9db11;
          transform: rotate(${course || 0}deg);
      "></div>`,
      iconSize: [16, 16],
      className: 'ship-marker',
      popupAnchor: [0, -8]
  });
};


function WorldMap({ ships = [], aqua_x = [], aqua_y = [], squares = [], pol_size, showAqua, showPols}) {
    // Начальная позиция карты (центр мира)
    const position = [20, 0];  // [широта, долгота]

    const getColorByIntensity = (value) => {
      if (value <= 0) return 'transparent';
      let maxValue = 150
      
      const ratio = Math.min(value / maxValue, 1);
    
      // Зелёный (0) → Жёлтый (0.33) → Красный (0.66) → Чёрный (1)
      if (ratio < 0.33) {
          // Зелёный → Жёлтый
          const r = Math.floor(255 * (ratio / 0.33));
          const g = 255;
          const b = 0;
          return `rgb(${r}, ${g}, ${b})`;
      } else if (ratio < 0.66) {
          // Жёлтый → Красный
          const g = Math.floor(255 * (1 - (ratio - 0.33) / 0.33));
          return `rgb(255, ${g}, 0)`;
      } else {
          // Красный → Чёрный
          const r = Math.floor(255 * (1 - (ratio - 0.66) / 0.34));
          return `rgb(${r}, 0, 0)`;
      }
    }
    
    
    const maxSafety = useMemo(() => {
      if (!squares.length) return 1;
      return Math.max(...squares.map(s => s.safety));
    }, [squares]);

    return (
        <MapContainer
            center={position}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <ZoomControl position="bottomright" />

            {/* Пример маркера (можно удалить или добавить свои) */}


            {ships.map((ship) => (
              <Marker 
              position={[ship.lon, ship.lat]}
              icon={createShipArrow(ship.course)}
              iconSize={ [16,16]}>
                <Popup>
                  ID: {ship.id_marine} <br />
                  COURSE: {ship.course}
                </Popup>
              </Marker>
            ))}

            {aqua_x?.length === 2 && aqua_y?.length === 2 && showAqua == true && (
                <Polygon 
                  positions={[
                    [aqua_y[0]-0.003, aqua_x[1]+0.03],
                    [aqua_y[0]-0.003, aqua_x[0]-0.03],
                    [aqua_y[1]+0.003, aqua_x[0]-0.03],
                    [aqua_y[1]+0.003, aqua_x[1]+0.03]
                  ]} 
                  color="red" 
                  weight={3}
                  fill={false}
                />
            )}

            {squares?.length>0 && showPols == true && squares.map((square, index) => (
                <Polygon
                key={`${square.id}_${square.safety}`}
                positions={[
                    [square.bounds[0][0], square.bounds[0][1]],
                    [square.bounds[0][0], square.bounds[1][1]],
                    [square.bounds[1][0], square.bounds[1][1]],
                    [square.bounds[1][0], square.bounds[0][1]],
                    [square.bounds[0][0], square.bounds[0][1]]
                ]}
                color="red"
                weight={1}
                fill={ square.safety == -1 ? false : true }
                fillColor={square.safety > 0 ? getColorByIntensity(square.safety) : 'transparent'}
                fillOpacity={square.safety > 0 ? Math.min(0.3 + (square.safety / 150) * 0.5, 0.8) : 0}
            >
    <Popup>
        <strong>Квадрат {index}</strong><br />
        Координаты: {square.bounds[0][0].toFixed(4)}, {square.bounds[0][1].toFixed(4)}<br />
        Ширина: {square.bounds[1][1] - square.bounds[0][1]} <br />
        Высота: {square.bounds[1][0] - square.bounds[0][0]} <br />
        Судов внутри: {Number.isInteger(square.safety) ? square.safety : square.safety.toFixed(2)}
    </Popup>
            </Polygon>  
            ))}
           


           {}

        </MapContainer>
    );
}

export default WorldMap;
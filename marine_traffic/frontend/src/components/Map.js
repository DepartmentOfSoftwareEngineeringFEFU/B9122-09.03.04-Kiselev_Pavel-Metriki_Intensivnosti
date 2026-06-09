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


function WorldMap({ ships = [], aqua_x = [], aqua_y = [], squares = [], pol_size, showAqua, showPols}) {
    // Начальная позиция карты (центр мира)
    const position = [20, 0];  // [широта, долгота] 

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
              <Marker position={[ship.lon, ship.lat]}>
                <Popup>
                  ID: {ship.id_marine} <br />
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
            >
    <Popup>
        <strong>Квадрат {index}</strong><br />
        Координаты: {square.bounds[0][0].toFixed(4)}, {square.bounds[0][1].toFixed(4)}<br />
        Ширина: <br />
        Высота: 
    </Popup>
            </Polygon>  
            ))}
           


           {}

        </MapContainer>
    );
}

export default WorldMap;
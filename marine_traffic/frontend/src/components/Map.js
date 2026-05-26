// components/WorldMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Фикс для иконок маркеров в Leaflet (проблема с путями)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function WorldMap() {
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
            <Marker position={[55.751244, 37.618423]}>
                <Popup>
                    Москва <br /> Столица России
                </Popup>
            </Marker>
            
            <Marker position={[40.712776, -74.005974]}>
                <Popup>
                    Нью-Йорк <br /> США
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default WorldMap;
import React, { useState } from 'react';
import Papa from 'papaparse';

// components/CenterMenu.js
const Preset = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    // Состояния для хранения загруженных данных
    const [shipDataset, setShipDataset] = useState(null);
    const [shipFileName, setShipFileName] = useState('');
    const [x_proc, setXProc] = useState([180, -180]);
    const [y_proc, setYProc] = useState([180, -180]);

    // Обработчик загрузки файла с кораблями
    const handleShipFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        setShipFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            let minLon = 180, maxLon = -180;
            let minLat = 180, maxLat = -90;
            // Парсим в зависимости от типа файла
            if (file.name.endsWith('.csv')) {
                Papa.parse(content, {
                    header: true,           // ← первая строка — заголовки
                    skipEmptyLines: true,
                    complete: (results) => {
                        // results.data — это уже массив объектов
                        const parsedData = results.data.map(row => {
                            if (row.timestamp) {
                                const [day, month, year, hour, minute] = row.timestamp.split(/[.: ]/);
                                row.timestamp = new Date(year, month - 1, day, hour, minute);
                            }
                            if (row.lat) {
                                row.lat = parseFloat(String(row.lat).replace(',', '.'));
                            }
                            if (row.lon) {
                                row.lon = parseFloat(String(row.lon).replace(',', '.'));
                            }
                            if (row.lon) {
                                if (row.lon < minLon) minLon = row.lon;
                                if (row.lon > maxLon) maxLon = row.lon;
                            }
                            if (row.lat) {
                                if (row.lat < minLat) minLat = row.lat;
                                if (row.lat > maxLat) maxLat = row.lat;
                            }

                            return row;
                        });

                        setXProc([minLat, maxLat]);
                        setYProc([minLon, maxLon]);

                        console.log('Долгота (x):', minLon, maxLon);
                        console.log('Широта (y):', minLat, maxLat);

                        setShipDataset(parsedData);
                        console.log('Загружено кораблей:', parsedData.length);
                    },
                    error: (error) => {
                        console.error('Ошибка парсинга CSV:', error);
                    }
                });
            } else {
                setShipDataset(content);
            }
        };
        reader.readAsText(file);
    };

    // Передать данные в родительский компонент (через props)
    const handleSubmit = () => {
        if (props.onDataLoaded) {
            props.onDataLoaded({
                ships: shipDataset,
                x_proc: x_proc,
                y_proc: y_proc
            });
        }
        setIsOpen(false);
    };

    return (
        <>
        {isOpen && <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '250px',
            height: '400px',
            backgroundColor: 'white',
            border: '2px solid #333',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 1010,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <div style={{display: 'flex', flexDirection: 'column',
                alignItems: 'center'
            }}>
              <h3>Загрузка данных</h3>
              <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>
                            Датасет кораблей:
                        </label>
                        <input
                            type="file"
                            accept=".json,.csv,.txt"
                            onChange={handleShipFileUpload}
                            style={{ marginBottom: '5px' }}
                        />
                        {shipFileName && (
                            <span style={{ fontSize: '12px', color: 'green' }}>
                                ✓
                            </span>
                        )}
              </div>

              <button style={{width: '200px', height: '50px',
                borderRadius: '10px', margin: '20px'}}>Загрузить акваторию</button>
            </div>

            {/*
            <div>
              <button style={{width: '200px', height: '50px',
                borderRadius: '10px', margin: '20px'}}
                onClick={() => setIsOpen(false)}>Закрыть</button>
            </div>
            */}  

            {/* Кнопки действий */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button
                        onClick={handleSubmit}
                        disabled={!shipDataset}
                        style={{
                            width: '120px',
                            height: '40px',
                            borderRadius: '10px',
                            backgroundColor: (shipDataset) ? '#138ff4' : '#ccc',
                            color: 'white',
                            border: 'none',
                            cursor: (shipDataset) ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Применить
                    </button>

                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            width: '120px',
                            height: '40px',
                            borderRadius: '10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Закрыть
                    </button>
                </div>

        </div>}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '70px',
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1009,
                    }}
                />
            )}
        </>    
    );
}

export default Preset;

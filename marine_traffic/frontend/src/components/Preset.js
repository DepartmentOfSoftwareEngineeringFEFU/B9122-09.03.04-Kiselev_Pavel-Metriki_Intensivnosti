import React, { useState } from 'react';
import Papa from 'papaparse';

// components/CenterMenu.js
const Preset = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    // Состояния для хранения загруженных данных
    const [shipDataset, setShipDataset] = useState(null);
    const [shipFileName, setShipFileName] = useState('');

    //ОБРАБОТЧИК ДЛЯ CSV
    const parseCSV = (csvText) => {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        
        return lines.slice(1).map(line => {
            const values = line.split(',');
            const obj = {};
            headers.forEach((header, i) => {
                obj[header] = isNaN(values[i]) ? values[i] : Number(values[i]);
            });
            return obj;
        });
    };

    // Обработчик загрузки файла с кораблями
    const handleShipFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        setShipFileName(file.name);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            // Парсим в зависимости от типа файла
            if (file.name.endsWith('.json')) {
                setShipDataset(JSON.parse(content));
            } else if (file.name.endsWith('.csv')) {
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
                            return row;
                        });
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

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

// components/CenterMenu.js
const Preset = (props) => {
    const [isOpen, setIsOpen] = useState(props.presetIsOpen);

    useEffect(() => {
        setIsOpen(props.presetIsOpen);
    }, [props.presetIsOpen]);


    // Состояния для хранения загруженных данных
    const [shipDataset, setShipDataset] = useState(null);
    const [shipFileName, setShipFileName] = useState('');
    const [x_proc, setXProc] = useState([180, -180]);
    const [y_proc, setYProc] = useState([180, -180]);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // Координаты акватории
    const [aquaStartLat, setAquaStartLat] = useState('');
    const [aquaStartLon, setAquaStartLon] = useState('');
    const [aquaEndLat, setAquaEndLat] = useState('');
    const [aquaEndLon, setAquaEndLon] = useState('');

    const applyTimeFilter = () => {
        console.log('Фильтр по времени:');
        console.log('С:', startTime);
        console.log('По:', endTime);
        // здесь логика фильтрации судов
    };

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

            let maxDate = new Date(0)
            let minDate = new Date(9999, 12, 31, 23, 59)
            // Парсим в зависимости от типа файла
            if (file.name.endsWith('.csv')) {
                Papa.parse(content, {
                    header: true,           // ← первая строка — заголовки
                    skipEmptyLines: true,
                    complete: (results) => {
                        // results.data — это уже массив объектов
                        const parsedData = results.data.map(row => {
                            
                            if (row.date_add) {
                                const [datePart, timePart] = row.date_add.trim().split(" ");
                                const [day, month, year] = datePart.split(".").map(Number);
                                const [hour, minute] = timePart.split(":").map(Number);
                            
                                row.date_add = new Date(year, month - 1, day, hour, minute);
                            
                                console.log(row.date_add);
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

                            row.course = Number(row.course)
                            if (row.course > 360) {
                                while (row.course > 360) row.course = row.course-360
                                 
                            }

                            row.age = Number(row.age)
                            row.speed = Number(row.speed)
                            row.id_marine = Number(row.id_marine)
                            row.id_track = Number(row.id_track)

                            if (row.date_add && !isNaN(row.date_add.getTime())) {
                                if (row.date_add > maxDate) {
                                    maxDate = row.date_add;
                                }
                                if (row.date_add < minDate) {
                                    minDate = row.date_add;
                                }
                            }

                            return row;
                        });

                            // Форматируем даты для input
                        const formatDateForInput = (date) => {
                          if (!date || isNaN(date.getTime())) return '';
                          const year = date.getFullYear();
                          const month = String(date.getMonth() + 1).padStart(2, '0');
                          const day = String(date.getDate()).padStart(2, '0');
                          const hours = String(date.getHours()).padStart(2, '0');
                          const minutes = String(date.getMinutes()).padStart(2, '0');
                          return `${year}-${month}-${day}T${hours}:${minutes}`;
                        }

                        setXProc([minLat-0.03, maxLat+0.03]);
                        setYProc([minLon-0.03, maxLon+0.03]);

                        setStartTime(formatDateForInput(minDate))
                        setEndTime(formatDateForInput(maxDate))

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
                y_proc: y_proc,
                startTime: startTime,
                endTime: endTime
            });
        }
        console.log(x_proc,' ',y_proc)
        setIsOpen(props.setPresetOpenness(false))
    };

    return (
        <>
        {isOpen && <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '250px',
            ...(shipDataset ? { height: '490px' } : { height: '250px' }),
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
                alignItems: 'center',
            }}>
              <h3>Загрузка данных</h3>
              <div style={{ marginBottom: '5px' }}>
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

            
            </div>

            {/* Ввод координат акватории */}
            {(shipDataset ) ? <div>
                <h4 style={{ marginBottom: '8px', textAlign: 'center' }}>Акватория</h4>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '6px',  }}>
                  <div>  
                    <input
                        type="number"
                        placeholder="Нач. широта"
                        value={y_proc[0]}
                        onChange={(e) => 
                            setYProc([
                                Number(e.target.value),
                                y_proc[1]
                            ])}
                        style={{  padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        step="0.001"
                        size='10'
                    />
                    Нач. широта
                  </div>

                  <div>   
                    <input
                        type="number"
                        placeholder="Нач. долгота"
                        value={x_proc[0]}
                        onChange={(e) => 
                            setXProc([
                                Number(e.target.value),
                                x_proc[1]
                            ])}
                        style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        step="0.001"
                        size='10'
                    />
                    Нач. долгота
                  </div>  

                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div>  
                    <input
                        type="number"
                        placeholder="Кон. широта"
                        value={y_proc[1]}
                        onChange={(e) => 
                            setYProc([
                                y_proc[0],
                                Number(e.target.value)
                            ])}
                        style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        step="0.001"
                        size='10'
                    />
                    Кон. широта
                  </div>  

                  <div>
                    <input
                        type="number"
                        placeholder="Кон. долгота"
                        value={x_proc[1]}
                        onChange={(e) => 
                            setXProc([
                                x_proc[0],
                                Number(e.target.value)
                            ])}
                        style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        step="0.001"
                        size='10'
                    />
                    Кон. долгота
                  </div>  
                </div>
            </div> : null }

            {/* Временной диапазон (показывается после загрузки CSV) */}
            {(shipDataset ) ? <div>
              <h4 style={{ marginBottom: '8px', textAlign: 'center' }}>Временной диапазон</h4>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{ minWidth: '30px', fontWeight: 'bold' }}>С</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={{
                    padding: '4px 8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '13px',
                    flex: 1
                  }}
                />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <label style={{ minWidth: '30px', fontWeight: 'bold' }}>По</label>
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '13px',
                      flex: 1
                    }}
                   />
                </div>

              </form>
            </div> : null}

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
                        onClick={() => {
                            setIsOpen(props.setPresetOpenness(false))
                            setIsOpen(false);}}
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

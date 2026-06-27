import React, { useState, useEffect, useMemo } from 'react';
import './CSS/App.css';
import Header from './components/Header.js'
import Panel from './components/Panel.js'
import Map from './components/Map.js'
import Preset from './components/Preset.js'
import { generateGrid } from './components/Wakeri.js'
import { metricsCount } from './components/Metrics_Count.js'


function App() {
  const [presetIsOpen, setPresetOpenness] = useState(true)
  const [ships, setShips] = useState([]);
  const [aqua_x, setAquaX] = useState(null);
  const [aqua_y, setAquaY] = useState(null);
  const [pol_size, setPol] = useState(10);
  const [inputValue, setInputValue] = useState(pol_size);
  const [squares, setSquares] = useState([])


  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [startTimeInput, setStartTimeInput] = useState('');
  const [endTimeInput, setEndTimeInput] = useState('');
  
  const applyTimeFilter = () => {
      console.log('Фильтр по времени:');
      setStartTime(startTimeInput)
      setEndTime(endTimeInput)
      console.log('С:', startTime);
      console.log('По:', endTime);
      // здесь логика фильтрации судов
  };


  const updateAPIdata = () => {
    fetch("http://127.0.0.1:8000/api/metrics/")
        .then(res => res.json())
        .then(data => setMetrics(data));   
  }

  const [metrics, setMetrics] = useState([]);


  useEffect(() => {
    updateAPIdata()
  }, []);
  const [selectedMetric, setSelectedMetric] = useState(null)

  useEffect(() => {
    if (aqua_x && aqua_y) {
        setSquares(generateGrid(aqua_x, aqua_y, pol_size));
    }
}, [aqua_x, aqua_y, pol_size]);


  // отображение всякого на карте
  const [showPols, setPolsShowcase] = useState(true)
  const [showVessels, setVesselShowcase] = useState(true)
  const [showAqua, setAquaShowcase] = useState(true)
  const [showMetrics, setShowMetrics] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault(); // чтобы страница не перезагружалась
    setPol(Number(inputValue));
  };

  const handleDataLoaded = (data) => {
    console.log('ПРО ЗАГРУЖЕННЫЕ ДАННЫЕ')
    console.log('Размер данных: ', data.ships.length)
    console.log('ВСЕ ДАННЫЕ:', data.ships)
    console.log('Первая строка: ', data.ships[0].id_track,' ',data.ships[0].id_marine,' ',data.ships[0].lat,' ',data.ships[0].lon,' ',data.ships[0].speed,' ',data.ships[0].course,' ',data.ships[0].age,' ',data.ships[0].date_add)

    let reserv = 0
    if (data.x_proc[0] > data.x_proc[1]) {
      reserv = data.x_proc[0]
      data.x_proc[0] = data.x_proc[1]
      data.x_proc[1] = reserv
    }
    if (data.y_proc[0] > data.y_proc[1]) {
      reserv = data.y_proc[0]
      data.y_proc[0] = data.y_proc[1]
      data.y_proc[1] = reserv
    }

    setShips(data.ships);
    setAquaX(data.x_proc)
    setAquaY(data.y_proc)
    setStartTimeInput(data.startTime)
    setEndTimeInput(data.endTime)
    setStartTime(data.startTime)
    setEndTime(data.endTime)
  };

  const testApi = async () => {
    const response = await fetch(
        'http://127.0.0.1:8000/api/hello/'
    );

    const data = await response.json();

    console.log(data);
};


  return (
    <div className="App">
      <Header />
      <main style={{
                height: 'calc(100vh - 72px)',  // на всю высоту под шапкой
                position: 'relative'
            }}>
        <Map ships={ships || []} aqua_x={aqua_x} aqua_y={aqua_y}
         squares={squares} pol_size={pol_size}
         showAqua={showAqua} showPols={showPols} showVessels={showVessels} showMetrics={showMetrics}
         startTime={startTime} endTime={endTime}/>
      </main>

      <Preset onDataLoaded={handleDataLoaded} presetIsOpen={presetIsOpen} setPresetOpenness={setPresetOpenness} />

      <Panel hidari={true} isOn={true}>
        <div style= {{
        width: '100%', height: '85%', display: 'flex',
        flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <div>
          <h4>Метрики для отображения:</h4>
          <form style={{
            height: '100px',
            overflowY: 'auto',
          }}>
            <p>
              {
              (metrics.length > 0) 
              ?  metrics.map((metric, index) => (
                <div key={metric.id}>
                  <input
                    type="radio"
                    name="metric"
                    value={index}
                    checked={selectedMetric == index}
                    onChange={(e) => setSelectedMetric(index)}
                  /> {metric.name}
                </div>
              ))
              : <p>Метрик не замечено. <br/>Создайте их через API!</p>
              }
            </p>
          </form>
          <button onClick={(e) => updateAPIdata()}>Обновить</button>

          <h4>Размер полигонов (в км.):</h4>
          <form onSubmit={handleSubmit}>
            <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="sumbit">Подтвердить</button>
          </form>

          </div>


          <div style={{display: 'flex', flexDirection: 'column',
           alignItems: 'center', marginBottom: '30px'
          }}>
            <button style={{width: '200px', height: '50px',
              borderRadius: '10px', margin: '10px'}}
              onClick= {() => setSquares(metricsCount(ships, squares, metrics[selectedMetric]))}
            >Вычислить</button>
            <button style={{width: '200px', height: '50px',
              borderRadius: '10px', margin: '20px'}}
              onClick= {() => setPresetOpenness(true)}
              >Изменить данные</button>
          </div>  

        </div>
      </Panel>

      <Panel hidari={false} isOn={false}>
        <div style={{width: '100%', height: '85%', display: 'flex', 
        flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', gap: '30px',
            padding: '5px 0'
          }}>

            <div>
              <h4>Отображение:</h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="checkbox" 
                  checked={showAqua}
                  onChange={(e) => setAquaShowcase(e.target.checked)} 
                />Границы акватории
              </form>

              <form onSubmit={(e) => e.preventDefault()}>
                <input type="checkbox" 
                  checked={showPols}
                  onChange={(e) => setPolsShowcase(e.target.checked)} 
                />Полигоны
              </form>

              <form onSubmit={(e) => e.preventDefault()}>
                <input type="checkbox" 
                  checked={showMetrics}
                  onChange={(e) => setShowMetrics(e.target.checked)} 
                />Результаты вычислений
              </form>

              <form onSubmit={(e) => e.preventDefault()}>
                <input type="checkbox" 
                  checked={showVessels}
                  onChange={(e) => setVesselShowcase(e.target.checked)} 
                />Суда
              </form>
            </div>

            {/*
            <div>
              <h4>Данные о судне или полигоне</h4>
              <div style={{border: 'solid 1px black', padding: 'auto',
                height: '175px', overflowY: 'auto', textAlign: 'center'
              }}>
              </div>
            </div>

            <div>
              <h4>Вычисленные значения метрик</h4>
              <div style={{border: 'solid 1px black', padding: 'auto',
                height: '175px', overflowY: 'auto', textAlign: 'center'
              }}>
              </div>
            </div>    
            */}      
          </div>


          <div>
            <h4>Временной диапазон:</h4>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label style={{ minWidth: '30px', fontWeight: 'bold' }}>С</label>
                    <input
                        type="datetime-local"
                        value={startTimeInput}
                        onChange={(e) => setStartTimeInput(e.target.value)}
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
                        value={endTimeInput}
                        onChange={(e) => setEndTimeInput(e.target.value)}
                        style={{
                            padding: '4px 8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '13px',
                            flex: 1
                        }}
                    />
                </div>
                <button
                    type="button"
                    onClick={applyTimeFilter}
                    style={{
                        padding: '4px 12px',
                        backgroundColor: '#138ff4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '4px'
                    }}
                >
                    Применить фильтр
                </button>
            </form>
          </div>



          <div style={{display: 'flex', flexDirection: 'column',
           alignItems: 'center', marginBottom: '30px'
          }}>
            <button style={{width: '200px', height: '50px',
              borderRadius: '10px', margin: '20px'}}>Визуализировать
            </button>



          </div>    

        </div>
      </Panel>
    </div>
  );
}

export default App;
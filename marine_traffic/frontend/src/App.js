import './CSS/App.css';
import Header from './components/Header.js'
import Panel from './components/Panel.js'
import Map from './components/Map.js'
import Preset from './components/Preset.js'

function App() {

  return (
    <div className="App">
      <Header />
      <main style={{
                //marginLeft: '320px',
                //marginRight: '320px',
                height: 'calc(100vh - 72px)',  // на всю высоту под шапкой
                position: 'relative'
            }}>
        <Map/>
      </main>

      <Preset />

      <Panel hidari={true} isOn={true}>
        <div style= {{
        width: '100%', height: '85%',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <div>
          <h4>Метрики для отображения:</h4>
          <form style={{
            height: '100px',
            overflowY: 'auto',
          }}>
            <p>
              <input type='checkbox'/> Интенсивность движения<br/>
              <input type='checkbox'/> Интенсивность + скорость<br/>
              <input type='checkbox'/> Интенсивность + размеры
            </p>
          </form>

          <h4>Размер полигонов (в км.):</h4>
          <form>
            <input/>
            <button>Подтвердить</button>
          </form>
          </div>

          <div style={{display: 'flex', flexDirection: 'column',
           alignItems: 'center', marginBottom: '30px'
          }}>
            <button style={{width: '200px', height: '50px',
              borderRadius: '10px', margin: '10px'
            }}>Вычислить</button>
            <button style={{width: '200px', height: '50px',
              borderRadius: '10px', margin: '20px'}}>Подтвердить данные</button>
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
            <div style={{border: 'solid 1px black', padding: 'auto',
              height: '175px', overflowY: 'auto', textAlign: 'center'
            }}>
              <p>Данные о судне или полигоне</p>
            </div>

            <div style={{border: 'solid 1px black', padding: 'auto',
              height: '175px', overflowY: 'auto', textAlign: 'center'
            }}>
              <p>Вычисленные значения метрик</p>
            </div>            
          </div>

          <div style={{display: 'flex', flexDirection: 'column',
           alignItems: 'center', marginBottom: '30px'
          }}>
            <button style={{width: '200px', height: '50px',
              borderRadius: '10px', margin: '20px'}}>Визуализировать</button>
          </div>    

        </div>
      </Panel>
    </div>
  );
}

export default App;
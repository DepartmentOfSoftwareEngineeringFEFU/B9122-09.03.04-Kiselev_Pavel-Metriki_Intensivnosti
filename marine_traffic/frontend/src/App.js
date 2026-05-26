import './CSS/App.css';
import Header from './components/Header.js'
import Panel from './components/Panel.js'

function App() {

  return (
    <div className="App">
      <Header />
      <Panel hidari={true}><div style= {{backgroundColor: 'red',
        width: '100%', height: '35%', overflowY: 'auto'
      }}>
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

      <div style={{backgroundColor: 'green', width: '100%', height: '45%',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <button style={{width: '200px', height: '50px',
          borderRadius: '10px', margin: '10px'
        }}>Вычислить</button>
        <button style={{width: '200px', height: '50px',
          borderRadius: '10px', margin: '20px'}}>Подтвердить данные</button>
      </div></Panel>
      <Panel hidari={false}></Panel>
    </div>
  );
}

export default App;
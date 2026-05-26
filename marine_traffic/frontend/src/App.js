import './CSS/App.css';
import Header from './components/Header.js'
import Panel from './components/Panel.js'

function App() {

  return (
    <div className="App">
      <Header />
      <Panel hidari={true}></Panel>
      <Panel hidari={false}></Panel>
    </div>
  );
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import './CSS/App.css';  ///ЭТО ВСЁ БАЗОВЫЙ МИНИМУМ

// import TableContext from './components/Context'
import { useState, useRef, useEffect, useContext } from 'react';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); ///ЭТО БАЗОВЫЙ МИНИМУМ





root.render(
  <React.StrictMode>
    <App/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();










/*
let width = 760
let align1 = 'left'
let align2 = 'right'

let element = ( //ПРОСТО ЭЛЕМЕНТ
<>
  <hr width={width} align={align2}/>
  <p align={align2}>Я изучаю React</p>

  <hr width={width} align={align1}/>
  <p align={align1}>React изучаю я</p>  
</>
)  





function Hello(props) {    //КОМПОНЕНТ-ФУНКЦИЯ
  const upper = props.name.toUpperCase()
  return <h2>Привет, {upper}!</h2>
  //return <h2>Привет, незнакомец!</h2>
}



class HelloClass extends React.Component { //КОМПОНЕНТ-КЛАСС

  toUpper = (text) => text.toLowerCase()

  render() {
    return <h2>Привет, {this.toUpper(this.props.name)}</h2>
  }  
} 
HelloClass.defaultProps = {name: "незнакомец"} //ЗНАЧЕНИЕ ПО-УМОЛЧАНИЮ

let element2 = <HelloClass name='Алина'/>



function CheckNumber(props) {   //КОМПОНЕНТ ОБРАБОТКИ ЧИСЛА
  const size = Math.abs(props.number).toString().length;
  const bit = (Number(props.number) % 2 == 0) ? 'Число чётное' : 'Число нечётное'
  
  return <ol><li>{size}</li><li>{bit}</li></ol>
}
let element3 = <CheckNumber number='255'></CheckNumber>



function ClickButton(props) {
  function press(event) { 
    console.log(event)
    alert(props.text);
  }  

  return <button onClick={press}>Приветствие</button>
}
let element4 = <ClickButton text='ПУТИН! ПОБЕДА!' />



function SquareNumbers(props) {
  const nums = props.list.map((item, index) => <li key={index}>{item} - {item **2}</li>)

  return <ul>{nums}</ul>
}

const listNums = [0,2,3,4,8,9]
const element5 = <SquareNumbers list = {listNums}/>

root.render(element5)




                                            //UseRef
function Komp() { 
  const [numbers, setNum] = useState('')
  const chartRef = useRef()

  const changeIt = () => {
    setNum(numbers+" "+chartRef.current.value)

    chartRef.current.value = ''
  }
  
  return <div>
    <input text='number' ref={chartRef}></input>
    <button onClick={changeIt}>Клик</button>
    <p>{numbers}</p>
  </div>
}




                                     //ЗАДАНИЕ 5 ПО UseRef
function Komp() {

  const chartRef = useRef(null)

  const clc = () => {
    chartRef.current.className = 'show'
    chartRef.current.value = 'sadas fnjaw dnaskl'
    chartRef.current.focus()
  }

  return <>
    <textarea ref={chartRef} className='hide'></textarea> <br/>
    <button onClick={clc}>Клик</button>
  </>
}


                           //МАССИВ ВНУТРИ АССОЦИАТИВНОГО МАССИВА
function Komp(props) {
  return <>
    <ul>
      {props.mas.map(val => <li>{val.text} 
        <ol>
          {val.arr.map(val2 => <li>{val2}</li>)}
        </ol>
      </li>)}
    </ul>
  </>
}

root.render(
  <React.StrictMode>
    <Komp mas={ [{'text':'один', 
        arr:[10,20,30]},
        {'text': 'два', 
            arr:[40,50,60]}]}/>

  </React.StrictMode>
);



class Komp extends React.Component {

  state = {
    number: this.props.num
  }

  clc = () => {
    this.setState({number: this.state.number+1})
  }

  render() {
    return <div>
      <p>{this.state.number}</p>
      <button onClick={this.clc}>Клик</button>
    </div>  
  }
}



function User() {
  const [name, setName] = useState('Привет!')

  useEffect(() => {
    document.title = name
  }, [name])
  

  const changeIt = (event) => {
    setName(event.target.value)
  }
  
  return (
    <p>
      <input type='text' value={name} onChange={changeIt}></input>
    </p> 
  )
}



function Komp() {                        //ЗАДАНИЕ ИЗ ЛЕКЦИИ 4
  const cnt = useContext(TableContext)
  
  return (
   <>
     <h2 style={{backgroundColor: cnt.colour, color: cnt.bgcolour}}>ПУТИН</h2>
     <p style={{backgroundColor: cnt.colour, color: cnt.bgcolour}}>Наш Бог и Президент!</p> 
   </>
  )
}

function User() {
  const [color, setColor] = useState('pink')
  const [bgcolor, setBgcolor] = useState('black')

  function changeIt() {
    if (color == 'pink') {
      setColor('black')
      setBgcolor('white')
    } else {
      setColor('pink')
      setBgcolor('black')
    }
  }

  return (
    <>
      <TableContext.Provider value={{colour: color, bgcolour: bgcolor}}> 
        <Komp></Komp>
      </TableContext.Provider>
      <button style={{width:'100px'}} onClick={changeIt}>Клик</button>
    </>
  )
}



function User() {                //ВВОДИШЬ В ПОЛЕ ЦИФРЫ. ОНО ОЧИЩАЕТСЯ

  const chartRef = useRef(null);

  const [value, setValue] = useState('')

  function onChange(event) {
    setValue(event.target.value)
  }

  function changeIt(event) {
    event.preventDefault()
    chartRef.current.innerHTML = chartRef.current.innerHTML + ' ' + event.target.form[0].value
    setValue('')
  }

  return (
    <>
      <p ref={chartRef}>1</p>
      <form>
        <input type='number' value={value} onChange={onChange}></input>
        <button style={{width:'100px'}} onClick={changeIt}>Клик</button>
      </form>
    </>
  )
}




const Numbers = () => {                            //EVENTLISTENER
  const [userText, setUserText] = useState('');

  useEffect(() => {
    let state = ''

    const handleUserKeyPress = (event) => {
      if (event.keyCode >= 48 && event.keyCode <= 57) {
        state += event.key
        setUserText(state)
      }
    }

    document.addEventListener('keydown',handleUserKeyPress);
    return () => {
      document.removeEventListener('keydown', handleUserKeyPress)
    }

  }, [])

  return (
    <div>
      <h4>Вводите цифры!</h4>
      <p>{userText}</p>
    </div>
  )
}





function GeomProg(props) {                     //ГЕОМЕТРИЧЕСКАЯ ПРОГРЕССИЯ
  const [mas, setMas] = useState([props.num])

  function info() {
    let copy = [... mas]
    const ind = copy.length-1

    copy.push(copy[ind]*props.step)

    setMas(copy)
  }
  
  return (
    <>
      <p>{mas.map(val => val+' ')}<span onClick={info}>...</span></p>
    </>
  )
}





const NowView = (props) => {                                 //ОБНОВЛЕНИЕ ДАТЫ ЧЕРЕЗ ИНТЕРВАЛ
  const [time, setTime] = useState(new Date().toString());

  const [intervalNew, setIntervalNew] = useState(props.interval)

  const handleChange = (event) => {
    setIntervalNew(Number(event.target.value))
  }



  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toString())
    }, intervalNew)

    return () => {
      clearInterval(intervalId)
    }
  }, intervalNew)



  return (
    <>
      <div>{time}</div>
      <input type='number' value={intervalNew} onChange={handleChange}/>
    </>
  )
}



function Ref(props) {                     //ЗАДАНИЕ НА UseRef ИЗ ЛЕКЦИИ
  const chartRef = useRef(null)

  function click() {
    chartRef.current.style.display = 'block'
    chartRef.current.innerHTML = props.name || 'Гость'
    chartRef.current.focus()
  }

  return (
    <>
      <textarea ref={chartRef} style={{display: 'none'}}></textarea>
      <button onClick={click}>Клик</button>
    </>
  )
}

*/
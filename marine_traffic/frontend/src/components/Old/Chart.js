import * as d3 from 'd3';
import React, { useState } from 'react';
import ChartDraw from './ChartDraw.js';
import TableContext from './Context.js';

const Chart = (props) => {

    const context = React.useContext(TableContext); //ПОЛУЧАЕМ КОНТЕНТ ЧЕРЕЗ UseContext;

    const [ox, setOx] = useState('Разработчик') //ОСЬ OX, ПО-УМОЛЧАНИЮ РАЗРАБОТЧИК;
    const [oy, setOy] = useState([true, false]) //ОСЬ OY, ПО-УМОЛЧАНИЮ ТОЛЬКО МАКСИМУМ;
    const [chartType, setChartType] = useState('scatter') //ТИП ГРАФИКА, ПО-УМОЛЧАНИЮ ТОЧКИ;
    const [data, setData] = useState(context.dataTable) //ТАБЛИЦА



    const handleSubmit = (event) => {   //УСТАНОВКА ЗНАЧЕНИЙ, ОПРЕДЕЛЁННЫХ ВЫШЕ, В СООТВЕТСТВИИ С ТЕМ, ЧТО ВЫБРАНО В ФОРМЕ;
        event.preventDefault();
        setOx(event.target['ox'].value)
        setOy([event.target['oy'][0].checked, event.target['oy'][1].checked])
        setChartType(event.target['chartType'].value);

        setData(context.dataTable)
    }



    const createArrGraph =(data, key)=>{
        const groupObj = d3.group(data, d => d[key]); //<--- формирует map по выбранному полю OX
        let arrGraph =[];
        for(let entry of groupObj) {   //БЕРЁТСЯ КАЖДЫЙ ЭЛЕМЕНТ groupObj...
            const val = d3.extent(entry[1].map(d => Number(d['Продано (млн.)']))) //ВЫЧИСЛЯЕТСЯ МАКС И МИН КАЖДОГО ЭЛЕМЕНТА
          //  console.log('MAXMIN: '+val[0])
            arrGraph.push({labelX: entry[0], values: val}); //entry[0] - key, val - мин и макс;

        }

        if (key == 'Год выпуска' || key == 'Поколение') arrGraph.sort((a, b) => Number(a.labelX) >= Number(b.labelX)) //СОРТИРОВКА ЕСЛИ ЧИСЛА
        else arrGraph.sort((a,b) => a.labelX >= b.labelX)

        return arrGraph;
    }
        
        

    return (
        <details style={{paddingLeft:'5px'}}>
          <summary>Визуализация</summary>
          <form onSubmit={ handleSubmit}>
            <p style={{fontWeight:'bold'}}>Значение по оси OX:</p>
            <div>
                <input type='radio' name='ox' value='Разработчик' 
                 defaultChecked={ox === 'Разработчик'}/>
                Разработчик
                <br/>
                <input type='radio' name='ox' value='Год выпуска' />
                Год
                <br/>
                <input type='radio' name='ox' value='Поколение' />
                Поколение                
            </div>

            <p style={{fontWeight:'bold'}}>Значение по оси OY:</p>
              <div>
                <input type='checkbox' name='oy' 
                 defaultChecked={ oy[0] === true }/>
                Максимальные продажи <br/>
                <input type='checkbox' name='oy' />
                Минимальные продажи  
              </div>

            <br/>
            <div>
              <label for="chartType" style={{fontWeight:'bold'}}>Тип диаграммы: </label>
              <select name="chartType">
                <option value="scatter">Точечная</option>
                <option value="bar">Гистограмма</option>
              </select>                
            </div>      
            
            <p>
              <button type='submit'>Построить</button>
            </p>
          </form>
          <ChartDraw data={ createArrGraph(data, ox) } horiz={oy} chartType={chartType}/>
        </details>
    )
}

export default Chart
/*
компонент, для фильтрации таблицы
пропсы:
defaultData - массив по-умолчанию без никаких манипуляций
data - данные для фильтрации
filtering - функция обновления данных для фильтрации
*/
const Filter = (props) => {

  const handleSubmit= (event) => {
    event.preventDefault();
    console.log(event)

    // АССОЦИАТИВНЫЙ МАССИВ СО ЗНАЧЕНИЯМИ ФОРМЫ
    const filterField = {
      'text': {
        "Название": event.target["name"].value.toLowerCase(),
        "Тип": event.target["type"].value.toLowerCase(),
        "Разработчик": event.target["dev"].value.toLowerCase(),
        "Процессор": event.target["cpu"].value.toLowerCase()
      },
      'range': {
        "Такт. частота процессора (МГц)": {
          from: event.target["temp1"].value,
          to: event.target["temp2"].value
        },
        "Оперативная памяти (МБ)": {
          from: event.target["ram1"].value,
          to: event.target["ram2"].value
        },
        "Продано (млн.)": {
          from: event.target["sales1"].value,
          to: event.target["sales2"].value
        },
        "Поколение": {
          from: event.target["gen1"].value,
          to: event.target["gen2"].value
        },
        "Год выпуска": {
          from: event.target["year1"].value,
          to: event.target["year2"].value
        }                                              
      }
    };

    //фильтруем данные по значениям всех полей формы
    let arr = props.defaultData;                     //props.defaultData - ПЕРВОНАЧАЛЬНЫЙ НЕИЗМЕНЁННЫЙ МАССИВ
    for(const key in filterField.text) {   //В СЛОВАРЕ ВЫШЕ СНАЧАЛА ПРОХОДИТ ПО ЭЛЕМЕНТАМ text
      if (filterField.text[key] != '') {   //ПРОВЕРКА ПУСТО ЛИ ПОЛЕ
        arr = arr.filter(item =>
          item[key].toLowerCase().includes(filterField.text[key]));   //ФИЛЬТРАЦИЯ; ПРОПУСКАЕТСЯ ТОЛЬКО ТО, ЧТО СООТВЕТСТВУЕТ ЗНАЧЕНИЮ KEY
      }
    }

    for(const key in filterField.range) {         //ТЕПЕРЬ ПРОХОДИТ ПО range
      const range = filterField.range[key];
      if (range.from) {
        arr = arr.filter(item => 
          Number(item[key]) >= Number(range.from)
        );
      }
      if (range.to) {
        arr = arr.filter(item => 
          Number(item[key]) <= Number(range.to)
        );
      }
    }    

    //передаем родительскому компоненту отфильтрованный массив
    props.filtering(arr);

    //console.log('PAGINATION: '+(Math.ceil(arr.length / 10))+', '+props.currPage)
    if (Math.ceil(arr.length / 10) < props.currPage) { 
      props.pag(Math.ceil(arr.length / 10))
    }  
  }

  const handleReset = (event) => {  //ОЧИСТКА ФИЛЬТРАЦИИ - ПЕРЕДАЁТ ИЗНАЧАЛЬНЫЙ МАССИВ КОНСОЛЕЙ;
    props.filtering(props.defaultData)
    props.pag(1)
  }

  return (
    <form onSubmit={ handleSubmit } onReset={ handleReset }>
      <p>
        <label>Название: </label>
        <input name="name" type="text" />
      </p>
      <p>
        <label>Тип: </label>
        <select name='type'>
          <option value=''>Нет</option>
          {[...new Set(props.defaultData.map(val => val['Тип']))]
          .map(val => (<option value={val}>{val}</option>
))}
        </select>
      </p>  


      <p>
        <label>Разработчик: </label>
        <select name='dev'>
          <option value=''>Нет</option>
          { props.defaultData.map(val => val['Разработчик']).filter((elem, ind, arr) => {
            if (arr.indexOf(elem, ind+1) == -1) return true
            else return false
          }).map(item => <option value={item}>{item}</option>) }
        </select>
      </p>  
     

      <p>
        <label>Процессор: </label>
        <input name='cpu' type='text' />
      </p>  
      <p>
        <label>Такт. частота от: </label>
        <input name='temp1' type='number' />
        <label>Такт. частота до: </label>
        <input name='temp2' type='number' />        
      </p>        
      <p>
        <label>Опер. память от: </label>
        <input name='ram1' type='number' />
        <label>Опер. память до: </label>
        <input name='ram2' type='number' />        
      </p>    
      <p>
        <label>Продано от: </label>
        <input name='sales1' type='number' />
        <label>Продано до: </label>
        <input name='sales2' type='number' />        
      </p>   
      <p>
        <label>Поколение от: </label>
        <input name='gen1' type='number' />
        <label>Поколение до: </label>
        <input name='gen2' type='number' />        
      </p>      
      <p>
        <label>Год выпуска от: </label>
        <input name='year1' type='number' />
        <label>Год выпуска до: </label>
        <input name='year2' type='number' />        
      </p>                           
      <p>
        <button type='submit'>Фильтровать</button>
        <button type='reset'>Очистить фильтры</button>
      </p>
    </form>  
  )
}

export default Filter;
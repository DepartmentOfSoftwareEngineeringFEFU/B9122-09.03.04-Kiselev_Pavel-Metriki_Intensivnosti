import { useState } from 'react';
import { useEffect } from 'react';

const Sort = (props) => {            //КОМПОНЕНТ СОРТИРОВКИ
  
  const fields = Object.keys(props.defaultData[0]).filter(value => value !== 'Изображение');   //KEY'И В OPTION'АХ SELECT'А

  const [sortFields, setSortFields] = useState([ //МАССИВ ЗНАЧЕНИЙ ИЗ ПОЛЕЙ;
    { key: '', desc: false },
    { key: '', desc: false },
    { key: '', desc: false }
  ]);

  useEffect(() => {        //ХУК ДЛЯ ВЫВОДА СООБЩЕНИЙ
    console.log(sortFields);
  }, [sortFields]);



  const handleSubmit = (event) => {     //КНОПКА "СОРТИРОВАТЬ"
    event.preventDefault();

    const validSorts = sortFields.filter(s => (s.key != '') ? s.key : null);

    const sortedData = sortData(props.currData, validSorts); //СОБСНА САМА СОРТИРОВКА
    props.sorting(sortedData, '1'); //ОБНОВЛЕНИЕ СТРАНИЦЫ
  };

  const sortData = (data, sortFields) => {   //САМА ФУНКЦИЯ СОРТИРОВКИ
    if (!sortFields.length) return data
    const forSort = [...data] //КОПИРОВАНИЕ МАССИВА-ПРОПСА ЧТОБЫ ОН НЕ ИЗМЕНЯЛСЯ
  
    return forSort.sort((a, b) => {
      for (const { key, desc } of sortFields) {
       // alert(a[key]+' ? '+b[key])
        if (a[key] > b[key]) return desc ? -1 : 1
        if (a[key] < b[key]) return desc ? 1 : -1
      }

    });
  };

  const handleReset = () => {                //КНОПКА 'СБРОСИТЬ'
    props.sorting(props.noSortData);
    setSortFields([
      { key: '', desc: false },
      { key: '', desc: false },
      { key: '', desc: false }
    ]);
    
  };



  const changeKey = (i, event) => {               //ИЗМЕНЕНИЕ ЗНАЧЕНИЕ KEY
    setSortFields(prev => {
      const updated = [...prev]
      updated[i] = { ...updated[i], key: event.target.value } 

      if (event.target.value == '' && i>0) updated[i] = { ...updated[i], key: '', desc: false }

      if (event.target.value == '' && i < 2) {
        for (let j=i+1;j<=2;j++) updated[j] = { ...updated[j], key: '', desc: false } 
      }

      //console.log(sortFields)
      return updated;
    });

  };

  const changeDesc = (i, event) => {                         //ИЗМЕНЕНИЕ ЗНАЧЕНИЯ DESC
    setSortFields(prev => {
      const updated = [...prev]
      updated[i] = { ...updated[i], desc: event.target.checked } 

      //console.log(sortFields);
      return updated;
    });

  };  

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} >
        <label>Первый уровень:
        <select onChange={ (event) => changeKey(0, event) }
                value={ sortFields[0].key }>
            <option value=''>Нет</option>
            {fields.map(val => <option value={val}>{val}</option>)}
        </select>
        </label>
        <label> по убыванию?<input type="checkbox" 
                                  onChange={ (event) => changeDesc(0, event) }
                                  />
        </label><br/>
      
        <div style={{paddingTop: '5px'}}>
          <label>Второй уровень:
          <select onChange={ (event) => changeKey(1, event)} 
                value={ sortFields[1].key }
                disabled={sortFields[0].key ? false : true}>
              <option value=''>Нет</option>
            {fields.map(val => (val != sortFields[0].key) ? <option value={val}>{val}</option> : null)}            
          </select>
          </label>

          <label> по убыванию?<input type="checkbox" 
                                  onChange={ (event) => changeDesc(1, event) }
                                  checked={ sortFields[1].desc }
                                  disabled={sortFields[0].key && sortFields[1].key ? false : true}/>
          </label><br/>  
        </div>
      
        <div style={{paddingTop: '5px'}}>
          <label>Третий уровень:
          <select onChange={ (event) => changeKey(2, event)}
                value={ sortFields[2].key }
                disabled={sortFields[0].key && sortFields[1].key ? false : true}>

            <option value=''>Нет</option>
            {fields.map(val => (val != sortFields[0].key && val != sortFields[1].key) ? 
                                      <option value={val}>{val}</option> 
                                      : null)} 
          </select></label>
          <label> по убыванию?<input type="checkbox" 
                                  onChange={ (event) => changeDesc(2, event) }
                                  checked={ sortFields[2].desc }
                                  disabled={sortFields[0].key 
                                         && sortFields[1].key 
                                         && sortFields[2].key ? false : true}/>
          </label><br/> 
        </div>
      <p>
        <button type="submit">Сортировать</button>
        <button type="reset">Сбросить</button>
      </p>
    </form>
  );
};

export default Sort;
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import React, { useState, useMemo } from "react";
import TableContext from './Context.js';

/*
компонент, выводящий на страницу таблицу
пропсы:
data - данные для таблицы в виде массива объектов
*/
const Table = (props) => {

  const context = React.useContext(TableContext);

  const defaultTable = useMemo(() => { 
    return context.dataTable
  }, [])  

  /*const [dataTable, setDataTable] = useState(props.data);
  const [dataWithoutSort, setDataWithoutSort] = useState(dataTable)  //ДЛЯ СБРОСА СОРТИРОВКИ

  const updateDataTable = (value, isSort) => {   //ОБНОВЛЯЕМ ЗНАЧЕНИЕ dataTable;
    setDataTable(value);
    if (isSort == undefined) setDataWithoutSort(value)
    console.log(dataWithoutSort)
  }    */

  const pageNum = 1

  const [activePage, setActivePage] = useState("1");
  const changeActive = (event) => {
    setActivePage(event.target.innerHTML);
    };

  //количество страниц разбиения таблицы
  //data.length - КОЛ-ВО СТРОК ТАБЛИЦЫ
  //amountRows - СКОЛЬКО СТРОК ОТОБРАЖАЕТСЯ
  const n = Math.ceil(context.dataTable.length / Number(props.amountRows));

  // массив с номерами страниц
  const arr = Array.from({ length: n }, (v, i) => i + 1);

  //формируем совокупность span с номерами страниц
  const pages = arr.map((item, index) =>
    <span key={ index } className={
      (index+1 == activePage) ? "currNum" : "show"} onClick={ changeActive }> { item } </span>
  );

  //alert(dataTable.length)
  return(
    <>
    <details style={{paddingLeft:'5px'}}>
      <summary>Фильтрация</summary>
      <Filter filtering={ context.updateDataTable } defaultData={ defaultTable }   //КОМПОНЕНТ-ФИЛЬТРАЦИЯ; ПЕРЕДАЁТСЯ ФУНКЦИЯ ОБНОВЛЕНИЯ МАССИВА 
                                                                 //(ЧТОБЫ ИЗМЕНЕНИЯ ПОЯВЛЯЛИСЬ), САМ МАССИВ, И МАССИВ ПО-УМОЛЧАНИЮ;
              pag={ setActivePage } currPage={ activePage }/>                         
    </details>    

    <details style={{paddingLeft:'5px'}}>
      <summary>Сортировка</summary>
      <Sort sorting={context.updateDataTable} noSortData={context.dataWithoutSort} defaultData={defaultTable} currData={context.dataTable}/>
    </details>

    <table >
      <TableHead head={ Object.keys(defaultTable[0]) } />
      <TableBody body={ context.dataTable } amountRows={ props.isPag == true ? Number(props.amountRows) : Number(context.dataTable.length) }
                 numPage={ props.isPag == true ? activePage : 1}/>
    </table>
    <div className={(props.isPag == true) ? 'show' : 'hide'}>
        {pages}
    </div>
    </>
  )
}

export default Table;

/*
компонент, для вывода строки таблицы
пропсы:
row - данные для формирования ячеек строки таблицы в виде массива
*/
const TableRow = (props) => {
  const cells = (props.isHead == '0') 
  ? props.row.map((item, index) => (index == 1) ? <td key={index}> <img src={ item } alt={index}/> </td> : <td key={index} style={{textAlign: 'center'}}> { item } </td>)
  : props.row.map((item, index) => <th key={index} > { item } </th>);
  return(
    <> {cells} </>
  )
}

export default TableRow

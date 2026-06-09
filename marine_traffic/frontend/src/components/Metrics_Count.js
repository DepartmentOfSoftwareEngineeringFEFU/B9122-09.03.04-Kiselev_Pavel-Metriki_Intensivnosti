// Функция для пересчёта километров в градусы долготы на заданной широте
export const metricsCount = (ships=[], squares=[]) => {
  console.log('ПОДСЧЁТ МЕТРИКИ')
  for (let i=0; i<squares.length; i++) {
    let count = 0
    for (let j=0; j<ships.length; j++) {
      if (ships[j].lon >= squares[i].bounds[0][0] 
        && ships[j].lat >= squares[i].bounds[0][1]) {

          if (ships[j].lon <= squares[i].bounds[1][0] 
            && ships[j].lat <= squares[i].bounds[1][1]) {

              if (squares[i].safety == -1) squares[i].safety = 1
              else squares[i].safety++
          }
      }
    }
  }

  return squares
};
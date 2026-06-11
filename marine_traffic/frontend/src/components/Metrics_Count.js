const SpeedCount = (speed) => {
  return (speed/10)+1
}



export const metricsCount = (ships = [], squares = [], metric) => {
  console.log('ПОДСЧЁТ МЕТРИКИ');
  console.log(metric)
  
  // Создаём НОВЫЙ массив, но внутри — старые объекты
  const newSquares = [...squares];  // новый массив, но старые объекты
  let weight = 1

  for (let i = 0; i < newSquares.length; i++) {
      let count = 0
      for (let j = 0; j < ships.length; j++) {
          weight = 1

          const ship = ships[j];
          if (ship.lon >= newSquares[i].bounds[0][0] && 
              ship.lat >= newSquares[i].bounds[0][1] &&
              ship.lon <= newSquares[i].bounds[1][0] && 
              ship.lat <= newSquares[i].bounds[1][1]) {

              if (metric.speed == true) {
                weight = weight * SpeedCount(ship.speed)
              }
              
              console.log(weight)
              count += weight;
          }
      }
      
      newSquares[i].safety = count === 0 ? -1 : count;
  }
  
  return newSquares;  // новый массив, старые объекты
};
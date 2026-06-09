export const metricsCount = (ships = [], squares = []) => {
  console.log('ПОДСЧЁТ МЕТРИКИ');
  
  // Создаём НОВЫЙ массив, но внутри — старые объекты
  const newSquares = [...squares];  // новый массив, но старые объекты
  
  for (let i = 0; i < newSquares.length; i++) {
      let count = 0;
      for (let j = 0; j < ships.length; j++) {
          const ship = ships[j];
          if (ship.lon >= newSquares[i].bounds[0][0] && 
              ship.lat >= newSquares[i].bounds[0][1] &&
              ship.lon <= newSquares[i].bounds[1][0] && 
              ship.lat <= newSquares[i].bounds[1][1]) {
              count++;
          }
      }
      
      newSquares[i].safety = count === 0 ? -1 : count;
  }
  
  return newSquares;  // новый массив, старые объекты
};
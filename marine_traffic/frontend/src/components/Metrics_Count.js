const SpeedCount = (speed) => {
  return (speed/2)+1
}

const IDCount = (id) => {
  return (id) +1
}

const CourseCount = (course) => {
  return (course) +1
}

const AgeCount = (age) => {
  return (1/age)
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
              if (metric.id_marine == true) {
                weight = weight * IDCount(ship.id_marine)
              }
              if (metric.course == true) {
                weight = weight * CourseCount(ship.course)
              }
              if (metric.age == true) {
                weight = weight * AgeCount(ship.age)
              }
              
              console.log(weight)
              count += weight;
          }
      }
      
      newSquares[i].safety = count === 0 ? -1 : count;
  }
  
  return newSquares;  // новый массив, старые объекты
};
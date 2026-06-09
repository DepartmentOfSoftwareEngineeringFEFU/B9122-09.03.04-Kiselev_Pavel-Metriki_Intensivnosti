// Функция для пересчёта километров в градусы долготы на заданной широте
const kmToDegreesLon = (km, latitude) => {
    const R = 6371;
    const kmPerDegree = R * Math.cos(latitude * Math.PI / 180) * Math.PI / 180;
    return km / kmPerDegree;
};

export const generateGrid = (aqua_x, aqua_y, cellSizeKm) => {
    console.log("ГЕНЕРАЦИЯ ПОЛИГОНОВ")
    if (!aqua_x || !aqua_y || aqua_x.length !== 2 || aqua_y.length !== 2) {
        console.warn('generateGrid: некорректные координаты', { aqua_x, aqua_y });
        return [];  // возвращаем пустой массив вместо ошибки
    }
  const centerLat = (aqua_y[0] + aqua_y[1]) / 2;
  const stepLon = kmToDegreesLon(cellSizeKm, centerLat);
  const stepLat = cellSizeKm / 111.0;  // 5 км в градусах широты

  // Границы полигона
  const minLon = aqua_x[0] - 0.03;
  const maxLon = aqua_x[1] + 0.03;
  const minLat = aqua_y[0] - 0.003;
  const maxLat = aqua_y[1] + 0.003;



      // Размер области в градусах
      const widthDeg = maxLon - minLon;
      const heightDeg = maxLat - minLat;
  
      // Количество квадратов (целое)
      const cols = Math.floor(widthDeg / stepLon);
      const rows = Math.floor(heightDeg / stepLat);
  
      // Общая ширина и высота сетки
      const totalWidth = cols * stepLon;
      const totalHeight = rows * stepLat;
  
      // Смещение для центрирования
      const offsetX = (widthDeg - totalWidth) / 2;
      const offsetY = (heightDeg - totalHeight) / 2;
  
      // Стартовые координаты с учётом смещения
      const startLon = minLon + offsetX;
      const startLat = minLat + offsetY;



  // Создаём сетку квадратов
  // let lat = minLat; lat + stepLat <= maxLat; lat += stepLat
  const squares = [];
  for (let i = 0; i < rows; i++) {
    const lat = startLat + i * stepLat;
    const nextLat = lat + stepLat;
      for (let j = 0; j < cols; j++) {
        const lon = startLon + j * stepLon;
        const nextLon = lon + stepLon;

          squares.push({
              id: `${lat}_${lon}`,
              bounds: [
                  [lat, lon],
                  [nextLat, nextLon]
              ],
              safety: -1
          });
      }
  }

  console.log('КВАДРАТЫ:', squares.length)
  return squares;
};
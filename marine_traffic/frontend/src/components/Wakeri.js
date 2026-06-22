// Функция для пересчёта километров в градусы долготы на заданной широте
const kmToDegreesLon = (km, latitude) => {
    const R = 6371;
    const kmPerDegree = R * Math.cos(latitude * Math.PI / 180) * Math.PI / 180;
    return km / kmPerDegree;
};

export const generateGrid = (aqua_x, aqua_y, cellSizeKm) => {
    if (!aqua_x || !aqua_y || aqua_x.length !== 2 || aqua_y.length !== 2) {
        console.warn('generateGrid: некорректные координаты', { aqua_x, aqua_y });
        return [];  // возвращаем пустой массив вместо ошибки
    }
  const centerLat = (aqua_y[0] + aqua_y[1]) / 2;
  const stepLon = kmToDegreesLon(cellSizeKm, centerLat);
  const stepLat = cellSizeKm / 111.0;  // 5 км в градусах широты

  // Границы полигона
  const minLon = aqua_x[0]
  const maxLon = aqua_x[1]
  const minLat = aqua_y[0]
  const maxLat = aqua_y[1]

  // Создаём сетку квадратов
  // let lat = minLat; lat + stepLat <= maxLat; lat += stepLat
  const squares = [];
  for (let lat = maxLat; lat - stepLat > minLat - stepLat; lat -= stepLat) {
      for (let lon = minLon; lon + stepLon <= maxLon + stepLon; lon += stepLon) {
          squares.push({
              bounds: [
                  [lat - stepLat, lon],
                  [lat, lon + stepLon]
              ],
              id: `${lat}_${lon}`,
              safety: -1
          });
      }
  }

  return squares;
};
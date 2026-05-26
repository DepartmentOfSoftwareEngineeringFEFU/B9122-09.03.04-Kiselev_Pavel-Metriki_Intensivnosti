import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header style={{
      backgroundColor: '#138ff4',
      color: 'white',
      padding: '1.25rem 2rem',
      fontSize: '1.5rem',
      fontWeight: 'bold'
  }}>
      Метрики оценки интенсивности движения
    </header>
  )
}

export default Header;
import React, { useState } from 'react';

const Panel = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Кнопка открытия */}
            <button 
                onClick={toggleSidebar}
                style={{
                    position: 'fixed',
                    left: props.hidari == true ? '20px' : 'auto',
                    right: props.hidari == false ? '20px' : 'auto',
                    top: '80px',
                    zIndex: 1002,
                    backgroundColor: '#2c3e50',
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    fontSize: '20px'
                }}
            >
                {isOpen ? '✕' : '☰'}
            </button>

            {/* Затемнение фона (клик по нему закрывает панель) */}
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    style={{
                        position: 'fixed',
                        top: '70px',
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                    }}
                />
            )}

            {/* Сама панель */}
            <div
                style={{
                    position: 'fixed',
                    top: '70px',
                    left: props.hidari == true ? 0 : 'auto',
                    right: props.hidari == false ? 0 : 'auto',
                    width: '300px',
                    height: '100%',
                    backgroundColor: '#f5f5f5',
                    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
                    transform: isOpen ? 'translateX(0)' 
                    : props.hidari == true ? 'translateX(-100%)' : 'translateX(100%)',
                    transition: 'transform 0.3s ease-in-out',
                    zIndex: 1001,
                    padding: '60px 20px 20px 20px',
                    overflowY: 'auto'
                }}
            >
                {/* Здесь пока ничего нет */}
                {props.children}
            </div>
        </>
    );
}

export default Panel;
import React, { useState } from 'react';

// components/CenterMenu.js
const Preset = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
        {isOpen && <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '250px',
            height: '400px',
            backgroundColor: 'white',
            border: '2px solid #333',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 1010,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <div style={{display: 'flex', flexDirection: 'column',
                alignItems: 'center'
            }}>
              <h3>Меню</h3>
              <button style={{width: '200px', height: '50px',
                borderRadius: '10px', margin: '20px'}}>Загрузить датасет кораблей</button>

              <button style={{width: '200px', height: '50px',
                borderRadius: '10px', margin: '20px'}}>Загрузить акваторию</button>
            </div>

            <div>
              <button style={{width: '200px', height: '50px',
                borderRadius: '10px', margin: '20px'}}
                onClick={() => setIsOpen(false)}>Закрыть</button>
            </div>  

        </div>}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '70px',
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1009,
                    }}
                />
            )}
        </>    
    );
}

export default Preset;

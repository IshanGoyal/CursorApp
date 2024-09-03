import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [huskyPhotos, setHuskyPhotos] = useState([]);
  const [popupPosition, setPopupPosition] = useState({ top: '50%', left: '50%' });

  useEffect(() => {
    document.title = 'Yuki App';
    // Fetch random husky photos
    const fetchHuskyPhotos = async () => {
      const photos = [];
      for (let i = 0; i < 3; i++) {
        const response = await fetch('https://dog.ceo/api/breed/husky/images/random');
        const data = await response.json();
        photos.push(data.message);
      }
      setHuskyPhotos(photos);
    };
    fetchHuskyPhotos();
  }, []);

  const handleButtonClick = () => {
    const randomTop = Math.random() * 80 + 10; // 10% to 90% of viewport height
    const randomLeft = Math.random() * 80 + 10; // 10% to 90% of viewport width
    setPopupPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      backgroundColor: '#F0E6FF',
      padding: '0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <header className="App-header" style={{ 
        width: '100%',
        backgroundColor: 'purple', 
        color: 'white', 
        textAlign: 'center', 
        padding: '20px 0',
        fontWeight: 'bold',
        fontSize: '20px',
        position: 'absolute',
        top: 0
      }}>
        Welcome to Yuki's First Cursor App
      </header>
      <div 
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          width: '50px',
          height: '50px',
          backgroundImage: 'url("https://cdn-icons-png.flaticon.com/512/2171/2171991.png")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          animation: 'moveHusky 10s linear infinite'
        }}
      />
      <style>
        {`
          @keyframes moveHusky {
            0% { transform: translateX(-100px) translateY(0); }
            25% { transform: translateX(calc(100vw - 50px)) translateY(25vh); }
            50% { transform: translateX(calc(100vw - 50px)) translateY(50vh); }
            75% { transform: translateX(-100px) translateY(75vh); }
            100% { transform: translateX(-100px) translateY(0); }
          }
        `}
      </style>
      <div style={{ 
        width: '80%', 
        maxWidth: '600px', 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto'
      }}>
        <button 
          onClick={handleButtonClick}
          style={{
            backgroundColor: 'white',
            border: '2px solid #4B0082',
            padding: '10px 20px',
            marginTop: '20px',
            cursor: 'pointer'
          }}
        >
          <span style={{ color: 'purple' }}>Feeling Lucky?</span>
        </button>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '20px',
          width: '100%'
        }}>
          {huskyPhotos.map((photo, index) => (
            <div key={index} style={{ width: '30%', textAlign: 'center' }}>
              <img 
                src={photo} 
                alt={`Husky ${index + 1}`} 
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <a 
                href={photo} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  color: 'purple', 
                  fontStyle: 'italic', 
                  fontSize: '0.8em',
                  textDecoration: 'none'
                }}
              >
                Original Photo
              </a>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: popupPosition.top,
          left: popupPosition.left,
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          border: '2px solid #4B0082',
          zIndex: 1000,
          color: 'purple'
        }}>
          <p>BOOP!</p>
          <button onClick={handleClosePopup}>Close</button>
        </div>
      )}
      <footer style={{
        width: '100%',
        backgroundColor: 'purple',
        color: 'white',
        textAlign: 'center',
        padding: '10px 0',
        fontWeight: 'bold',
        marginTop: '20px',
        position: 'absolute',
        bottom: 0,
        fontSize: '20px'
      }}>
        Copyright Yuki Enterprises 2024
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
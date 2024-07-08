import React, { useState, useEffect } from 'react';

const RodriGameWithIntroScreen = () => {
  const [gameState, setGameState] = useState('intro'); // 'intro', 'playing'
  const [players, setPlayers] = useState(['', '']);
  const [reels, setReels] = useState(['🎲', '🎲', '🎲']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [challenge, setChallenge] = useState('¡Dale a la ruleta de Rodri!');
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣', '🚀', '👾', '🎮'];
  
  const challenges = [
    "Imita a tu youtuber favorito durante 30 segundos",
    "Canta el estribillo de tu canción favorita",
    "Haz tu mejor imitación de un personaje de videojuego",
    "Cuenta un chiste malo y ríete exageradamente",
    "Haz 5 sentadillas mientras nombras 5 juegos",
    "Toma una cucharada de salsa picante",
    "Bébete un chupito de zumo de limón puro",
    "Aguanta un cubito de hielo en la mano durante 10 segundos",
    "Dibuja rápidamente tu juego favorito",
    "Intenta hacer malabares con 2 objetos durante 15 segundos",
    "🎮 Juega una hora sin que nadie te eche la bronca 🎮",
    "Nombra 5 juegos en 10 segundos",
    "Haz tu mejor baile de victoria de videojuego",
    "Imita el sonido de tu efecto de videojuego favorito",
    "Inventa un eslogan para tu juego favorito"
  ];

  const itemsNeeded = [
    "Salsa picante",
    "Limones",
    "Cubitos de hielo",
    "Papel y lápiz",
    "Objetos para hacer malabares (pelotas pequeñas, mandarinas, etc.)",
    "Un mando de consola (opcional, para los retos de videojuegos)"
  ];

  const spinReels = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setChallenge('Girando...');

    let spins = 0;
    const maxSpins = 15;
    const interval = setInterval(() => {
      setReels(prevReels => prevReels.map(() => symbols[Math.floor(Math.random() * symbols.length)]));
      spins++;
      
      if (spins >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        setChallenge(`${players[currentPlayer]}: ${randomChallenge}`);
        setCurrentPlayer((currentPlayer + 1) % players.length);
      }
    }, 50);
  };

  const startGame = () => {
    if (players.every(player => player.trim() !== '')) {
      setGameState('playing');
    } else {
      alert('Por favor, introduce el nombre de todos los jugadores.');
    }
  };

  const IntroScreen = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: 'rgba(26, 1, 51, 0.9)',
      borderRadius: '15px',
      boxShadow: '0 0 20px #8a2be2',
    }}>
      <h2 style={{ color: '#FFD700', marginBottom: '20px' }}>¡Bienvenidos al Reto de Rodri Juega!</h2>
      <p style={{ color: 'white', marginBottom: '20px' }}>Para jugar, puedes necesitar:</p>
      <ul style={{ color: 'white', marginBottom: '20px', textAlign: 'left' }}>
        {itemsNeeded.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p style={{ color: 'white', marginBottom: '20px' }}>Introduce los nombres de los jugadores:</p>
      {players.map((player, index) => (
        <input
          key={index}
          type="text"
          value={player}
          onChange={(e) => {
            const newPlayers = [...players];
            newPlayers[index] = e.target.value;
            setPlayers(newPlayers);
          }}
          placeholder={`Jugador ${index + 1}`}
          style={{ marginBottom: '10px', padding: '5px' }}
        />
      ))}
      <button onClick={startGame} style={{
        backgroundColor: '#00ff00',
        color: '#1a0133',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginTop: '20px'
      }}>
        ¡Comenzar el Juego!
      </button>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: '"Bangers", cursive',
      backgroundColor: '#1a0133',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      backgroundImage: 'linear-gradient(45deg, #1a0133 25%, #2a0154 25%, #2a0154 50%, #1a0133 50%, #1a0133 75%, #2a0154 75%, #2a0154 100%)',
      backgroundSize: '40px 40px',
      animation: 'moveBackground 3s linear infinite',
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
          @keyframes moveBackground {
            0% {background-position: 0 0;}
            100% {background-position: 40px 40px;}
          }
          @keyframes neonGlow {
            0% {text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de;}
            100% {text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de;}
          }
          @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
          }
        `}
      </style>

      <h1 style={{ 
        fontSize: '4rem', 
        marginBottom: '1rem',
        color: '#FFD700',
        textShadow: '0 0 10px #FFD700',
        animation: 'neonGlow 1.5s ease-in-out infinite alternate'
      }}>
        🎡 El Reto de Rodri Juega 👨‍🚀
      </h1>

      {gameState === 'intro' ? (
        <IntroScreen />
      ) : (
        <>
          <a href="https://youtube.com/@rodrijuegagamepley?feature=share" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              backgroundColor: '#FF0000',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '30px',
              display: 'inline-block',
              boxShadow: '0 0 20px #FF0000',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🎥 Canal de Rodri Juega 🎥
          </a>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4a0e4e',
            borderRadius: '20px',
            padding: '30px',
            marginBottom: '30px',
            boxShadow: '0 0 30px #8a2be2',
            animation: isSpinning ? 'shake 0.5s infinite' : 'none'
          }}>
            {reels.map((symbol, index) => (
              <div key={index} style={{
                fontSize: '6rem',
                margin: '0 15px',
                width: '120px',
                height: '160px',
                backgroundColor: '#ffd700',
                color: '#1a0133',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                boxShadow: '0 0 15px #ffd700',
                transition: 'all 0.3s ease'
              }}>
                {symbol}
              </div>
            ))}
          </div>

          <p style={{ 
            fontSize: '2rem', 
            minHeight: '80px', 
            margin: '20px 0',
            padding: '20px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            boxShadow: '0 0 20px rgba(255,255,255,0.2)',
            transition: 'all 0.3s ease'
          }}>
            {challenge}
          </p>
          
          <button 
            onClick={spinReels} 
            disabled={isSpinning}
            style={{
              fontSize: '2rem',
              padding: '20px 40px',
              backgroundColor: isSpinning ? '#888' : '#00ff00',
              color: '#1a0133',
              border: 'none',
              borderRadius: '50px',
              cursor: isSpinning ? 'not-allowed' : 'pointer',
              boxShadow: '0 0 20px #00ff00',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            {isSpinning ? '🔄 Girando...' : '🎰 Girar Ruleta'}
          </button>
        </>
      )}
    </div>
  );
};

export default RodriGameWithIntroScreen;
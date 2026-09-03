import { useState } from 'react';
import { Login } from './components/Login';

function App() {
  const [usuario, setUsuario] = useState(null);

  return (
    <div className="app-container">
      {!usuario ? (
        <Login onLoginSuccess={(usr) => setUsuario(usr)} />
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'sans-serif' }}>
          <h1>¡Bienvenido, {usuario.nombre}! 👋</h1>
          <p>Rol: <strong>{usuario.rol}</strong></p>
          <button 
            onClick={() => setUsuario(null)}
            style={{ 
              marginTop: '1.5rem',
              padding: '0.6rem 1.2rem', 
              backgroundColor: '#86BEDA', 
              color: '#1e293b',
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold',
              cursor: 'pointer' 
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
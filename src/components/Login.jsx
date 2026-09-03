import { useState, useEffect } from 'react';

export const Login = ({ onLoginSuccess }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuarioId, setSelectedUsuarioId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const mockUsuarios = [
          { id: 1, nombre: 'Carlos Mendoza', rol: 'Administrador' },
          { id: 2, nombre: 'Ana Torres', rol: 'Mesero' },
          { id: 3, nombre: 'Luis Gómez', rol: 'Cocina' }
        ];
        setUsuarios(mockUsuarios);
      } catch (err) {
        setError('No se pudo cargar la lista de usuarios.');
      }
    };

    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedUsuarioId) {
      setError('Selecciona un usuario para continuar.');
      return;
    }

    if (!password.trim()) {
      setError('Ingresa tu contraseña.');
      return;
    }

    setLoading(true);

    try {
      const usuarioEncontrado = usuarios.find(u => u.id === Number(selectedUsuarioId));
      
      if (onLoginSuccess) {
        onLoginSuccess(usuarioEncontrado);
      }
    } catch (err) {
      setError(err.message || 'Contraseña incorrecta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logoBadge}>🍽️</div>
          <h2 style={styles.title}>Sistema de Restaurante</h2>
          <p style={styles.subtitle}>Selecciona tu perfil e ingresa clave</p>
        </div>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Usuario registrado</label>
          <select 
            value={selectedUsuarioId} 
            onChange={(e) => setSelectedUsuarioId(e.target.value)}
            style={styles.select}
            required
          >
            <option value="">-- Selecciona un usuario --</option>
            {usuarios.map((usr) => (
              <option key={usr.id} value={usr.id}>
                {usr.nombre} — ({usr.rol})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Contraseña</label>
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={styles.input}
              maxLength={32}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggleBtn}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={loading ? { ...styles.submitBtn, opacity: 0.7 } : styles.submitBtn}
        >
          {loading ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  card: { backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', width: '100%', maxWidth: '380px', border: '1px solid #e2e8f0' },
  header: { textAlign: 'center', marginBottom: '2rem' },
  logoBadge: { width: '50px', height: '50px', backgroundColor: '#86BEDA22', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 1rem auto' },
  title: { margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#1e293b', fontWeight: '700' },
  subtitle: { margin: 0, fontSize: '0.875rem', color: '#64748b' },
  errorAlert: { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.25rem', textAlign: 'center' },
  inputGroup: { marginBottom: '1.25rem' },
  label: { display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: '#334155' },
  select: { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' },
  passwordWrapper: { position: 'relative' },
  input: { width: '100%', padding: '0.75rem', paddingRight: '2.5rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' },
  toggleBtn: { position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' },
  submitBtn: { width: '100%', padding: '0.85rem', backgroundColor: '#86BEDA', color: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', marginTop: '0.5rem' }
};
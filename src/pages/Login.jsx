import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, signInWithGoogle } from '../firebase';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate(location.state?.from || '/');
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate(location.state?.from || '/');
    } catch (err) {
      setError('Помилка при вході через Google');
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/invalid-email': return 'Невірний формат email';
      case 'auth/user-disabled': return 'Акаунт вимкнено';
      case 'auth/user-not-found': return 'Користувача не знайдено';
      case 'auth/wrong-password': return 'Невірний пароль';
      default: return 'Помилка входу. Спробуйте ще раз';
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Вхід</h2>
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required placeholder="Ваш email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль:</label>
            <input type="password" id="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              required placeholder="Ваш пароль" />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>

        <button onClick={handleGoogleLogin} className="auth-button google-button" disabled={loading}>
          Увійти через Google
        </button>

        <div className="auth-footer">
          <p>Ще не зареєстровані? <Link to="/register">Створити акаунт</Link></p>
          <p><Link to="/forgot-password">Забули пароль?</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

import { useState } from 'react';
import { resetPassword } from '../firebase';
import './Login.css';

function Reset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setMessage('Лист для відновлення пароля надіслано');
    } catch (err) {
      setError('Помилка. Перевірте email і спробуйте ще раз');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Відновлення пароля</h2>
        {message && <div className="auth-success">{message}</div>}
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleReset}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required placeholder="Ваш email" />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Надсилаємо...' : 'Надіслати лист'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reset;

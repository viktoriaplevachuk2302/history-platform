import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Header.css';
import { useEffect, useState } from 'react';

function Header() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Відображаємо displayName (ім'я з реєстрації) або першу частину email
        setUserName(currentUser.displayName || currentUser.email.split('@')[0]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Помилка при виході:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>Історичні Події України</h1>
        </Link>
        <nav>
          <ul className="nav-links">
            <li><Link to="/timeline">Хронологія</Link></li>
            <li><Link to="/events">Історичні події</Link></li>
            {user && <li><Link to="/tests">Тестування</Link></li>}
            <li><Link to="/comments">Відгуки</Link></li>
            <li><Link to="/about">Про нас</Link></li>
            {user ? (
              <>
                <li>
                  <span className="user-name">{userName}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Вийти
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="login-btn">
                    Увійти
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="register-btn">
                    Реєстрація
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
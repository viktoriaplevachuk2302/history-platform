import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Events from './pages/Events';
import Tests from './pages/Tests';
import Comments from './pages/Comments';
import About from './pages/About';
import EventDetail from './pages/EventDetails';
import Progress from './pages/Progress';
import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Reset'; 
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const RequireAuth = ({ children }) => {
    if (!user) {
      return (
        <div className="auth-message">
          <h3>Будь ласка, увійдіть у систему</h3>
          <p>Для доступу до цієї сторінки необхідно авторизуватися</p>
          <Link 
            to="/login" 
            state={{ from: location }}
            className="auth-btn"
          >
            Увійти
          </Link>
        </div>
      );
    }
    return children;
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-spinner"></div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header user={user} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/events" element={<Events />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/about" element={<About />} />
          <Route path="/event/:id" element={<EventDetail />} />
          
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/forgot-password" element={<Reset />} />
          
          <Route 
            path="/tests" 
            element={
              <RequireAuth>
                <Tests />
              </RequireAuth>
            } 
          />
          <Route 
            path="/progress" 
            element={
              <RequireAuth>
                <Progress />
              </RequireAuth>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
import React, {useEffect, useState} from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Donate from './pages/Donate';
import Volunteer from './pages/Volunteer';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/AdminDashboard';
import Payment from './pages/Payment';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthContext = React.createContext();

export default function App(){
  const [user, setUser] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('ngo_user')); } catch { return null; }
  });
  const [dark, setDark] = useState(()=> localStorage.getItem('ngo_dark') === '1');
  const navigate = useNavigate();

  useEffect(()=> {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage.setItem('ngo_dark', dark ? '1' : '0');
  }, [dark]);

  const logout = () => { localStorage.removeItem('ngo_token'); localStorage.removeItem('ngo_user'); setUser(null); navigate('/'); }

  return (
    <AuthContext.Provider value={{user,setUser}}>
      <div>
        <header className="nav">
          <div className="container">
            <div style={{display:'flex',alignItems:'center',gap:20}}>
              <h1 className="brand"><Link to="/">Aashray</Link></h1>
              <nav style={{display:'flex',gap:10}}>
                <Link to="/projects">Projects</Link>
                <Link to="/donate">Donate</Link>
                <Link to="/volunteer">Volunteer</Link>
                <Link to="/contact">Contact</Link>
              </nav>
            </div>

            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <label style={{display:'flex',alignItems:'center',gap:8}}>
                <input type="checkbox" checked={dark} onChange={e=>setDark(e.target.checked)} /> Dark
              </label>

              {user ? (
                <>
                  {user.role === 'admin' && <Link to="/admin" style={{fontWeight:600}}>Admin</Link>}
                  <span style={{fontWeight:600}}>{user.name}</span>
                  <button className="btn" onClick={logout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup" className="btn">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="container" style={{paddingTop:20}}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={location.pathname} initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.35}}>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/projects" element={<Projects/>} />
                <Route path="/donate" element={<Donate/>} />
                <Route path="/volunteer" element={<Volunteer/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/admin" element={<Admin/>} />
                <Route path="/payment" element={<Payment/>} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="footer">© {new Date().getFullYear()} Aashray NGO</footer>
      </div>
    </AuthContext.Provider>
  )
}

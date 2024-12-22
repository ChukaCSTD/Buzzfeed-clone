import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './pages/Welcome';
import Error404 from './pages/Error404';
import RegisterForm from './pages/Register';
import LoginForm from './pages/Login';
import DataProvider from './context/DataContext';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import { useLocation } from 'react-router-dom';
import SinglePost from './pages/SinglePost';
import CreatePost from './pages/CreatePost';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </DataProvider>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/adminlogin' && location.pathname !== '/adminregister' && location.pathname !== '/admindashboard' && location.pathname !== '*' && <Navigation />}
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path='/posts/new' element={<CreatePost />}></Route>
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;

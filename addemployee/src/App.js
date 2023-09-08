
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Login from './Login';
import Navigation from './Navigation';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="protectedroute" element={<ProtectedRoute/>} />
      </Routes>
      <Navigation/>
    </div>
  );
}

export default App;

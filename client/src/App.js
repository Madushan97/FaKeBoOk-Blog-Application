import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout';
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

function App() {
  return (

    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Homepage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

    </Routes>

  );
}

export default App;

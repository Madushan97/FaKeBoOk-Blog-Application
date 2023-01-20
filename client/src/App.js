import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout';
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { UserContextProvider } from './UserContext';

function App() {
  return (

    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Homepage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>

      </Routes>
    </UserContextProvider>


  );
}

export default App;

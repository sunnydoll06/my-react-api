import './App.css';
import Login from "./pages/Login";
import Table from './pages/Table';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

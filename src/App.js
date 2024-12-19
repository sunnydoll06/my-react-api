import './App.css';
import Login from "./pages/Login";
import Table from './pages/Table';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </HashRouter>
  );
}


export default App;

import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PokemonManagementApp from './Components/PokemonManagementApp';
import PokemonDetails from './Components/PokemonDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pokemon" />} />
        <Route path="/pokemon" element={<PokemonManagementApp />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

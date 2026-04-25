import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PokemonModal from './PokemonModal';

function PokemonManagementApp() {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentPokemon, setCurrentPokemon] = useState(null);

    useEffect(() => {
        getPokemons();
    }, []);

    const getPokemons = async () => {
        try {
            const res = await axios.get('/api/pokemon');
            setPokemons(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAdd = () => {
        setCurrentPokemon(null);
        setShowModal(true);
    };

    const handleEdit = (p) => {
        setCurrentPokemon(p);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this?")) {
            try {
                await axios.delete(`/api/pokemon/${id}`);
                alert("Deleted!");
                getPokemons();
            } catch (err) {
                alert("Error deleting");
            }
        }
    };

    const filtered = pokemons.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1>My Pokemon App</h1>
            <button onClick={handleAdd} style={{ marginBottom: '10px' }}>Add New Pokemon</button>
            <br />
            <input 
                type="text" 
                placeholder="Search pokemon..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                style={{ padding: '5px', marginBottom: '20px', width: '300px' }}
            />

            <div className="pokemon-list">
                {filtered.map(p => (
                    <div key={p._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                        <h3>{p.name}</h3>
                        <p>{p.breed}</p>
                        <Link to={`/pokemon/${p._id}`}>View Details</Link>
                        <button onClick={() => handleEdit(p)} style={{ marginLeft: '10px' }}>Edit</button>
                        <button onClick={() => handleDelete(p._id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
                    </div>
                ))}
            </div>

            {showModal && (
                <PokemonModal 
                    close={() => setShowModal(false)} 
                    refresh={getPokemons} 
                    pokemon={currentPokemon} 
                />
            )}
        </div>
    );
}

export default PokemonManagementApp;

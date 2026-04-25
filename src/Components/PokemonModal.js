import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonModal({ close, refresh, pokemon }) {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Normal');

    useEffect(() => {
        if (pokemon) {
            setName(pokemon.name);
            setBreed(pokemon.breed);
            setDescription(pokemon.description);
            setType(pokemon.type);
        }
    }, [pokemon]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = { name, breed, description, type };
        
        try {
            if (pokemon) {
                // Update
                await axios.put(`http://localhost:3001/api/pokemon/${pokemon._id}`, obj);
                alert("Updated!");
            } else {
                // Create
                await axios.post('http://localhost:3001/api/pokemon', obj);
                alert("Added!");
            }
            refresh();
            close();
        } catch (err) {
            alert("Error saving");
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '400px' }}>
                <h2>{pokemon ? 'Edit Pokemon' : 'Add Pokemon'}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label><br />
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label>Breed:</label><br />
                        <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} required style={{ width: '100%' }} />
                    </div>
                    <div>
                        <label>Type:</label><br />
                        <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%' }}>
                            <option value="Normal">Normal</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Grass">Grass</option>
                        </select>
                    </div>
                    <div>
                        <label>Description:</label><br />
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ width: '100%' }} />
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                    <button type="button" onClick={close} style={{ marginLeft: '10px' }}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default PokemonModal;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function PokemonDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPokemon();
    }, [id]);

    const fetchPokemon = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/pokemon/${id}`);
            setPokemon(res.data);
            setLoading(false);
        } catch (err) {
            console.log("Error fetching:", err);
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this pokemon?")) {
            try {
                await axios.delete(`http://localhost:3001/api/pokemon/${id}`);
                alert("Deleted successfully!");
                navigate('/pokemon');
            } catch (err) {
                alert("Error deleting");
            }
        }
    };

    if (loading) return <h2>Loading...</h2>;
    if (!pokemon) return <h2>Pokemon not found!</h2>;

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/pokemon">Back to List</Link>
            <h1>{pokemon.name}</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                {pokemon.image && <img src={pokemon.image} alt={pokemon.name} style={{ width: '200px' }} />}
                <div>
                    <p><strong>Breed:</strong> {pokemon.breed}</p>
                    <p><strong>Type:</strong> {pokemon.type}</p>
                    <p><strong>Description:</strong> {pokemon.description}</p>
                    <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetails;

import React from 'react';
import { Link } from 'react-router-dom';

const TYPE_COLORS = {
    Fire:     { bg: 'rgba(255,100,30,0.15)', border: 'rgba(255,100,30,0.3)', color: '#ff8c42' },
    Water:    { bg: 'rgba(74,159,255,0.15)', border: 'rgba(74,159,255,0.3)', color: '#4a9fff' },
    Electric: { bg: 'rgba(255,217,74,0.15)', border: 'rgba(255,217,74,0.3)', color: '#ffd94a' },
    Grass:    { bg: 'rgba(34,197,94,0.15)',  border: 'rgba(34,197,94,0.3)',  color: '#22c55e' },
    Ice:      { bg: 'rgba(147,210,255,0.15)',border: 'rgba(147,210,255,0.3)',color: '#93d2ff' },
    Fighting: { bg: 'rgba(200,80,50,0.15)',  border: 'rgba(200,80,50,0.3)',  color: '#c85032' },
    Poison:   { bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)', color: '#a855f7' },
    Ground:   { bg: 'rgba(180,150,80,0.15)', border: 'rgba(180,150,80,0.3)', color: '#b4965a' },
    Flying:   { bg: 'rgba(130,180,230,0.15)',border: 'rgba(130,180,230,0.3)',color: '#82b4e6' },
    Psychic:  { bg: 'rgba(255,80,140,0.15)', border: 'rgba(255,80,140,0.3)', color: '#ff508c' },
    Bug:      { bg: 'rgba(120,200,80,0.15)', border: 'rgba(120,200,80,0.3)', color: '#78c850' },
    Rock:     { bg: 'rgba(160,140,100,0.15)',border: 'rgba(160,140,100,0.3)',color: '#a08c64' },
    Ghost:    { bg: 'rgba(100,80,160,0.15)', border: 'rgba(100,80,160,0.3)', color: '#6450a0' },
    Dragon:   { bg: 'rgba(80,80,220,0.15)',  border: 'rgba(80,80,220,0.3)',  color: '#5050dc' },
    Dark:     { bg: 'rgba(80,60,50,0.3)',    border: 'rgba(80,60,50,0.5)',   color: '#705848' },
    Steel:    { bg: 'rgba(180,180,200,0.15)',border: 'rgba(180,180,200,0.3)',color: '#b4b4c8' },
    Fairy:    { bg: 'rgba(255,160,200,0.15)',border: 'rgba(255,160,200,0.3)',color: '#ffa0c8' },
    Normal:   { bg: 'rgba(160,160,160,0.15)',border: 'rgba(160,160,160,0.3)',color: '#a0a0a0' },
};

function TypeBadge({ type }) {
    const style = TYPE_COLORS[type] || TYPE_COLORS.Normal;
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '3px 10px',
            borderRadius: 999,
            fontSize: '0.73rem',
            fontWeight: 600,
            background: style.bg,
            border: `1px solid ${style.border}`,
            color: style.color,
        }}>
            {type}
        </span>
    );
}

function ConfirmDeleteModal({ pokemon, onConfirm, onCancel, loading }) {
    if (!pokemon) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-box" style={{ maxWidth: 400 }}>
                <div className="confirm-body">
                    <span className="confirm-icon">⚠️</span>
                    <div className="confirm-title">Release {pokemon.name}?</div>
                    <div className="confirm-desc">
                        This will permanently remove <strong style={{ color: 'var(--text-primary)' }}>{pokemon.name}</strong> from your Pokédex.
                        This action cannot be undone.
                    </div>
                </div>
                <div className="modal-footer" style={{ paddingTop: 0 }}>
                    <button className="btn-outline" style={{ flex: 1 }} onClick={onCancel} disabled={loading}>
                        Keep It
                    </button>
                    <button className="btn-danger-confirm" onClick={onConfirm} disabled={loading} id="confirm-delete-btn">
                        {loading
                            ? <><i className="bi bi-hourglass-split" /> Releasing...</>
                            : <><i className="bi bi-trash-fill" /> Release</>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ===== CARD VIEW ===== */
function PokemonCard({ pokemon, index, onEdit, onDelete }) {
    return (
        <div className="pokemon-card" id={`pokemon-card-${pokemon._id}`}>
            <div className="card-image-wrapper">
                {pokemon.image ? (
                    <img src={pokemon.image} alt={pokemon.name} className="card-pokemon-img" />
                ) : (
                    <div className="card-pokeball-placeholder" />
                )}
            </div>
            <div className="card-body">
                <div className="card-number">#{String(index + 1).padStart(3, '0')}</div>
                <div className="card-name">{pokemon.name}</div>
                <div style={{ marginBottom: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span className="card-breed">{pokemon.breed}</span>
                    {pokemon.type && <TypeBadge type={pokemon.type} />}
                </div>
                <div className="card-desc">{pokemon.description}</div>
                <div className="card-actions">
                    <Link
                        to={`/pokemon/${pokemon._id}`}
                        className="btn-view"
                        title="View Details"
                        id={`view-btn-${pokemon._id}`}
                    >
                        <i className="bi bi-eye-fill" />
                    </Link>
                    <div className="spacer" />
                    <button
                        className="btn-edit"
                        onClick={() => onEdit(pokemon)}
                        title="Edit"
                        id={`edit-btn-${pokemon._id}`}
                    >
                        <i className="bi bi-pencil-fill" />
                    </button>
                    <button
                        className="btn-delete"
                        onClick={() => onDelete(pokemon)}
                        title="Delete"
                        id={`delete-btn-${pokemon._id}`}
                    >
                        <i className="bi bi-trash-fill" />
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ===== TABLE VIEW ===== */
function PokemonTableView({ pokemons, onEdit, onDelete }) {
    return (
        <div className="pokemon-table-wrapper">
            <table className="pokemon-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th></th>
                        <th>Name</th>
                        <th>Breed</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pokemons.map((pokemon, index) => (
                        <tr key={pokemon._id} id={`pokemon-row-${pokemon._id}`}>
                            <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                #{String(index + 1).padStart(3, '0')}
                            </td>
                            <td>
                                {pokemon.image
                                    ? <img src={pokemon.image} alt={pokemon.name} className="table-pokemon-img" />
                                    : <div className="table-pokeball-placeholder" />
                                }
                            </td>
                            <td>
                                <Link to={`/pokemon/${pokemon._id}`} className="table-name-link">
                                    {pokemon.name}
                                </Link>
                            </td>
                            <td>{pokemon.breed}</td>
                            <td>
                                {pokemon.type ? <TypeBadge type={pokemon.type} /> : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                            </td>
                            <td style={{ maxWidth: 260 }}>
                                <span style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}>
                                    {pokemon.description}
                                </span>
                            </td>
                            <td>
                                <div className="table-actions">
                                    <Link
                                        to={`/pokemon/${pokemon._id}`}
                                        className="btn-view"
                                        title="View"
                                        id={`table-view-btn-${pokemon._id}`}
                                    >
                                        <i className="bi bi-eye-fill" />
                                    </Link>
                                    <button
                                        className="btn-edit"
                                        onClick={() => onEdit(pokemon)}
                                        title="Edit"
                                        id={`table-edit-btn-${pokemon._id}`}
                                    >
                                        <i className="bi bi-pencil-fill" />
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => onDelete(pokemon)}
                                        title="Delete"
                                        id={`table-delete-btn-${pokemon._id}`}
                                    >
                                        <i className="bi bi-trash-fill" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ===== MAIN EXPORT ===== */
function PokemonTable({ pokemons, view, onEdit, onDelete }) {
    if (view === 'table') {
        return <PokemonTableView pokemons={pokemons} onEdit={onEdit} onDelete={onDelete} />;
    }
    return (
        <div className="pokemon-grid">
            {pokemons.map((pokemon, i) => (
                <PokemonCard key={pokemon._id} pokemon={pokemon} index={i} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}

export { ConfirmDeleteModal, TypeBadge };
export default PokemonTable;

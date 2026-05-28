import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import { ACTIONS } from '../store.js';

export default function VehicleDetail() {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();
  const [details, setDetails] = useState(null);
  const isFav = store.favorites.some(f => f.uid === id && f.type === 'vehicle');

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/vehicles/${id}`)
      .then(r => r.json())
      .then(d => setDetails(d.result?.properties || null));
  }, [id]);

  const toggle = () => {
    const payload = { uid: id, type: 'vehicle', name: details?.name || id };
    dispatch({ type: isFav ? ACTIONS.REMOVE_FAVORITE : ACTIONS.ADD_FAVORITE, payload });
  };

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-outline-warning mb-3">
        <i className="fa-solid fa-arrow-left me-2"></i>Back
      </Link>
      {!details ? (
        <div className="text-center"><div className="spinner-border text-warning"></div></div>
      ) : (
        <div className="row">
          <div className="col-md-4">
            <img
              src={`https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`}
              className="img-fluid rounded"
              alt={details.name}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Vehicle'; }}
            />
          </div>
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 style={{ color: '#f0e68c' }}>{details.name}</h1>
              <button className={`btn ${isFav ? 'btn-danger' : 'btn-outline-warning'}`} onClick={toggle}>
                <i className={`fa-${isFav ? 'solid' : 'regular'} fa-heart me-1`}></i>
                {isFav ? 'Remove Favorite' : 'Add Favorite'}
              </button>
            </div>
            <table className="table" style={{ color: '#f0e68c', borderColor: '#f0e68c33' }}>
              <tbody>
                {Object.entries({
                  'Model': details.model,
                  'Class': details.vehicle_class,
                  'Manufacturer': details.manufacturer,
                  'Cost': details.cost_in_credits,
                  'Length': details.length,
                  'Max Speed': details.max_atmosphering_speed,
                  'Crew': details.crew,
                  'Passengers': details.passengers,
                }).map(([k, v]) => (
                  <tr key={k}>
                    <td style={{ borderColor: '#f0e68c33' }}><strong>{k}</strong></td>
                    <td style={{ borderColor: '#f0e68c33' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

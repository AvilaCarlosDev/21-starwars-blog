import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import { ACTIONS } from '../store.js';

export default function Layout() {
  const { store, dispatch } = useGlobalReducer();

  const removeFavorite = (fav) => {
    dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload: fav });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1a1a2e', borderBottom: '2px solid #f0e68c' }}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fa-solid fa-star me-2" style={{ color: '#f0e68c' }}></i>
            Star Wars Blog
          </Link>
          <div className="d-flex align-items-center ms-auto">
            <div className="dropdown">
              <button className="btn btn-outline-warning dropdown-toggle" type="button" data-bs-toggle="dropdown">
                <i className="fa-solid fa-heart me-1"></i>
                Favoritos ({store.favorites.length})
              </button>
              <ul className="dropdown-menu dropdown-menu-end" style={{ backgroundColor: '#1a1a2e', borderColor: '#f0e68c' }}>
                {store.favorites.length === 0 ? (
                  <li><span className="dropdown-item text-muted">No hay favoritos</span></li>
                ) : (
                  store.favorites.map((fav, idx) => (
                    <li key={idx} className="dropdown-item d-flex justify-content-between align-items-center" style={{ color: '#f0e68c' }}>
                      <Link to={`/${fav.type}/${fav.uid}`} style={{ color: '#f0e68c', textDecoration: 'none' }}>
                        {fav.name}
                      </Link>
                      <button className="btn btn-sm btn-danger ms-2" onClick={() => removeFavorite(fav)}>
                        <i className="fa-solid fa-times"></i>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}

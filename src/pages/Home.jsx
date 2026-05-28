import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';
import { ACTIONS } from '../store.js';

const SWAPI = 'https://www.swapi.tech/api';

function StarWarsCard({ item, type, dispatch, favorites }) {
  const isFav = favorites.some(f => f.uid === item.uid && f.type === type);

  const toggle = () => {
    if (isFav) {
      dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload: { uid: item.uid, type, name: item.name } });
    } else {
      dispatch({ type: ACTIONS.ADD_FAVORITE, payload: { uid: item.uid, type, name: item.name } });
    }
  };

  const imgUrl = type === 'character'
    ? `https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`
    : type === 'planet'
    ? `https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`
    : `https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`;

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100">
        <img
          src={imgUrl}
          className="card-img-top"
          alt={item.name}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Star+Wars'; }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.name}</h5>
          <div className="mt-auto d-flex justify-content-between">
            <Link to={`/${type}/${item.uid}`} className="btn btn-warning btn-sm">
              Learn more!
            </Link>
            <button
              className={`btn btn-sm ${isFav ? 'btn-danger' : 'btn-outline-warning'}`}
              onClick={toggle}
            >
              <i className={`fa-${isFav ? 'solid' : 'regular'} fa-heart`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [charRes, planetRes, vehicleRes] = await Promise.all([
          fetch(`${SWAPI}/people?page=1&limit=10`),
          fetch(`${SWAPI}/planets?page=1&limit=10`),
          fetch(`${SWAPI}/vehicles?page=1&limit=10`),
        ]);
        const [chars, planets, vehicles] = await Promise.all([charRes.json(), planetRes.json(), vehicleRes.json()]);
        dispatch({ type: ACTIONS.SET_CHARACTERS, payload: chars.results || [] });
        dispatch({ type: ACTIONS.SET_PLANETS, payload: planets.results || [] });
        dispatch({ type: ACTIONS.SET_VEHICLES, payload: vehicles.results || [] });
      } catch (err) {
        console.error(err);
      }
    };
    if (!store.characters.length) fetchAll();
  }, []);

  return (
    <div>
      <section className="mb-5">
        <h2 className="section-title">Characters</h2>
        <div className="row">
          {store.characters.map(c => (
            <StarWarsCard key={c.uid} item={c} type="character" dispatch={dispatch} favorites={store.favorites} />
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title">Planets</h2>
        <div className="row">
          {store.planets.map(p => (
            <StarWarsCard key={p.uid} item={p} type="planet" dispatch={dispatch} favorites={store.favorites} />
          ))}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title">Vehicles</h2>
        <div className="row">
          {store.vehicles.map(v => (
            <StarWarsCard key={v.uid} item={v} type="vehicle" dispatch={dispatch} favorites={store.favorites} />
          ))}
        </div>
      </section>
    </div>
  );
}

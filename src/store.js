export const ACTIONS = {
  SET_CHARACTERS: 'SET_CHARACTERS',
  SET_PLANETS: 'SET_PLANETS',
  SET_VEHICLES: 'SET_VEHICLES',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
};

export function initialStore() {
  return {
    characters: [],
    planets: [],
    vehicles: [],
    favorites: [],
    loading: false,
    error: null,
  };
}

export function storeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_CHARACTERS:
      return { ...state, characters: action.payload };
    case ACTIONS.SET_PLANETS:
      return { ...state, planets: action.payload };
    case ACTIONS.SET_VEHICLES:
      return { ...state, vehicles: action.payload };
    case ACTIONS.ADD_FAVORITE:
      if (state.favorites.find(f => f.uid === action.payload.uid && f.type === action.payload.type)) {
        return state;
      }
      return { ...state, favorites: [...state.favorites, action.payload] };
    case ACTIONS.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          f => !(f.uid === action.payload.uid && f.type === action.payload.type)
        )
      };
    default:
      return state;
  }
}

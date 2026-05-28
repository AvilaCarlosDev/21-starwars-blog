import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CharacterDetail from './pages/CharacterDetail.jsx';
import PlanetDetail from './pages/PlanetDetail.jsx';
import VehicleDetail from './pages/VehicleDetail.jsx';
import Layout from './component/Layout.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'character/:id', element: <CharacterDetail /> },
      { path: 'planet/:id', element: <PlanetDetail /> },
      { path: 'vehicle/:id', element: <VehicleDetail /> },
    ]
  }
]);

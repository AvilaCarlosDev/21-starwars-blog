# Blog de Star Wars - React & Context API

Proyecto del curso Full Stack Development de 4Geeks Academy.

## Descripcion
Aplicacion web construida con React, React Router y Context API que muestra personajes, planetas y vehiculos del universo Star Wars usando la SWAPI API.

## Funcionalidades
- Lista de personajes, planetas y vehiculos de Star Wars
- Vista de detalle de cada elemento
- Funcionalidad de favoritos (Read Later) usando Context API
- Diseno responsivo con Bootstrap
- Navegacion con React Router

## Tecnologias
- React 18
- React Router v6
- Context API (useReducer)
- Bootstrap 5
- Vite
- SWAPI (swapi.tech)

## Como ejecutar
```bash
npm install
npm run dev
```

## Estructura del proyecto
```
src/
  component/
      Navbar.jsx       - Barra de navegacion con lista de favoritos
          CharacterCard.jsx - Tarjeta de personaje
              PlanetCard.jsx   - Tarjeta de planeta
                  VehicleCard.jsx  - Tarjeta de vehiculo
                    pages/
                        Home.jsx         - Vista principal con listados
                            CharacterDetail.jsx - Detalle de personaje
                                PlanetDetail.jsx - Detalle de planeta
                                    VehicleDetail.jsx - Detalle de vehiculo
                                      hooks/
                                          useGlobalReducer.jsx - Hook de estado global
                                            store.js           - Estado inicial y reducer
                                              routes.jsx         - Configuracion de rutas
                                                main.jsx           - Punto de entrada
                                                ```

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import SportsContext from '../contexts/SportsContext';

const mockSports = ['soccer_epl', 'basketball_nba'];
const mockMatches = [
  {
    id: '1',
    sport_key: 'soccer_epl',
    home_team: 'Time A',
    away_team: 'Time B',
    commence_time: new Date().toISOString(),
    bookmakers: [
      {
        title: 'Bookmaker 1',
        markets: [
          {
            key: 'h2h',
            outcomes: [
              { name: 'Time A', price: 1.5 },
              { name: 'Time B', price: 2.8 },
            ],
          },
        ],
      },
    ],
  },
];

describe('Home', () => {
  it('renderiza título principal e categorias', () => {
    render(
      <SportsContext.Provider
        value={{
          sports: mockSports,
          upcomingMatches: [],
          loading: false,
        }}
      >
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </SportsContext.Provider>
    );

    expect(screen.getByText('Plataforma de Apostas')).toBeInTheDocument();
    expect(screen.getByText('Premier League')).toBeInTheDocument();
    expect(screen.getByText('NBA (Basquete)')).toBeInTheDocument();
  });

  it('exibe jogos futuros quando disponíveis', () => {
    render(
      <SportsContext.Provider
        value={{
          sports: [],
          upcomingMatches: mockMatches,
          loading: false,
        }}
      >
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </SportsContext.Provider>
    );

    expect(screen.getByText('Time A vs Time B')).toBeInTheDocument();
    expect(screen.getByText(/Melhores chances/i)).toBeInTheDocument();
  });

  it('exibe mensagem de carregamento', () => {
    render(
      <SportsContext.Provider
        value={{
          sports: [],
          upcomingMatches: [],
          loading: true,
        }}
      >
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </SportsContext.Provider>
    );

    expect(screen.getAllByText('Carregando...')).toHaveLength(2); 
  });
});

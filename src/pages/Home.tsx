import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SportsContext from '../contexts/SportsContext';

function formatSportName(sport: string) {
  const formatted = sport
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (formatted === 'Americanfootball Nfl') return 'NFL (Futebol Americano)';
  if (formatted === 'Americanfootball Ncaaf') return 'NCAA (Universitário)';
  if (formatted === 'Americanfootball Nfl Super Bowl Winner') return 'NFL - Super Bowl';
  if (formatted === 'Basketball Nba') return 'NBA (Basquete)';
  if (formatted === 'Soccer Epl') return 'Premier League';

  return formatted;
}

export default function Home() {
  const { sports, upcomingMatches, loading } = useContext(SportsContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/esportes?busca=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="px-6 py-10 bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen font-sans">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-4">Plataforma de Apostas</h1>
      <p className="text-center text-gray-600 text-lg mb-6">
        Bem-vindo! Veja os jogos recentes, próximos e as melhores apostas disponíveis.
      </p>

      {/* Campo de busca */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10 flex">
        <input
          type="text"
          placeholder="Buscar esporte (ex: futebol, basquete...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow p-2 border rounded-l-full text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded-r-full hover:bg-blue-800 transition"
        >
          Buscar
        </button>
      </form>

      {/* Categorias de Esportes */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Categorias de Esportes</h2>
        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : sports.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {sports.slice(0, 5).map((sport) => (
              <Link
                key={sport}
                to={`/esportes/${sport}`}
                className="block p-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:bg-blue-50 transition text-center"
              >
                <span className="text-blue-700 text-lg font-semibold">{formatSportName(sport)}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500">Nenhuma categoria encontrada.</p>
        )}
      </section>

      {/* Jogos Próximos */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Jogos Próximos</h2>
        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : upcomingMatches.length > 0 ? (
          <ul className="space-y-6">
            {upcomingMatches.map((match) => (
              <li
                key={match.id}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <Link
                  to={`/partida/${match.id}`}
                  className="block text-xl font-bold text-blue-700 hover:underline"
                >
                  {match.home_team} vs {match.away_team}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(match.commence_time).toLocaleString()}
                </p>

                {match.bookmakers && (
                  <div className="mt-3 text-sm text-gray-700">
                    <p className="font-medium">Melhores chances:</p>
                    <ul className="ml-4 mt-1 space-y-1">
                      {match.bookmakers[0]?.markets[0]?.outcomes.map((outcome) => (
                        <li key={outcome.name}>
                          {outcome.name}: <span className="font-semibold">{outcome.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-red-500">
            Nenhum jogo próximo encontrado. Verifique a API ou o sport_key.
          </p>
        )}
      </section>
    </div>
  );
}

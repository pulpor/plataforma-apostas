import { useContext } from 'react';
import { Link } from 'react-router-dom';
import SportsContext from '../contexts/SportsContext';

export default function Home() {
  const { sports, upcomingMatches, loading } = useContext(SportsContext);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Plataforma de Apostas</h1>
      <p className="text-center text-gray-600 mb-8">Bem-vindo! Veja os jogos recentes, próximos e melhores odds.</p>

      {/* Categorias de Esportes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Categorias de Esportes</h2>
        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : sports.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sports.slice(0, 5).map((sport) => (
              <Link
                key={sport}
                to={`/sports/${sport}`}
                className="block p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition text-center"
              >
                <span className="text-blue-600 font-medium">{sport}</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500">Nenhuma categoria encontrada.</p>
        )}
      </section>

      {/* Jogos Próximos */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Jogos Próximos</h2>
        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : upcomingMatches.length > 0 ? (
          <ul className="space-y-4">
            {upcomingMatches.map((match) => (
              <li key={match.id} className="p-4 bg-white rounded-lg shadow">
                <Link to={`/match/${match.id}`} className="text-blue-600 hover:underline">
                  {match.home_team} vs {match.away_team} -{' '}
                  {new Date(match.commence_time).toLocaleString()}
                </Link>
                {match.bookmakers && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Melhores odds:</p>
                    {match.bookmakers[0]?.markets[0]?.outcomes.map((outcome) => (
                      <p key={outcome.name} className="ml-4">
                        {outcome.name}: {outcome.price}
                      </p>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-red-500">Nenhum jogo próximo encontrado. Verifique a API ou o sport_key.</p>
        )}
      </section>
    </div>
  );
}
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import SportsContext from '../contexts/SportsContext';

function formatSportName(sport: string | undefined): string {
  if (!sport) return '';

  const map: Record<string, string> = {
    'americanfootball_nfl': 'NFL (Futebol Americano)',
    'americanfootball_ncaaf': 'NCAA (Universitário)',
    'americanfootball_nfl_super_bowl_winner': 'NFL - Super Bowl',
    'basketball_nba': 'NBA (Basquete)',
    'soccer_epl': 'Premier League',
  };

  return map[sport] || sport
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); 
}

export default function SportDetail() {
  const { sport } = useParams(); 
  const { upcomingMatches } = useContext(SportsContext); 
  interface Match {
    id: string;
    home_team: string;
    away_team: string;
    commence_time: string;
    sport_key: string;
  }

  const [matches, setMatches] = useState<Match[]>([]); // Estado para armazenar as partidas

  useEffect(() => {
    if (sport) {
      console.log("Sport na URL:", sport);
      console.log("Matches disponíveis:", upcomingMatches);

      const filteredMatches = upcomingMatches.filter((match) => {
        const sportKeyNormalized = match.sport_key.toLowerCase().replace(/_/g, '');
        const sportParamNormalized = sport.toLowerCase().replace(/_/g, '');
        const isMatch = sportKeyNormalized.startsWith(sportParamNormalized);
        console.log(`Comparando "${sportKeyNormalized}" com "${sportParamNormalized}": ${isMatch}`);

        return isMatch;
      });

      console.log("Partidas filtradas:", filteredMatches);

      setMatches(filteredMatches);
    }
  }, [sport, upcomingMatches]);




  if (!sport) {
    return <p>Carregando esporte...</p>;
  }

  return (
     <div className="p-6 bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-blue-700 text-white rounded-full shadow hover:bg-blue-800 transition"
        >
          ← Voltar para o início
        </Link>
      </div>
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Ligas para: <span className="text-blue-700">{formatSportName(sport)}</span>
          </h2>
        </div>

        <p className="text-gray-600 mb-8">Veja abaixo as ligas e partidas disponíveis para o esporte selecionado.</p>

        {matches.length > 0 ? (
          <div className="grid gap-4">
            {matches.map((match) => (
              <div key={match.id} className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700">{match.home_team} vs {match.away_team}</h3>
                <p className="text-sm text-gray-500">Data: {new Date(match.commence_time).toLocaleString()}</p>

                <Link
                  to={`/partida/${match.id}`}
                  className="text-blue-600 hover:underline mt-4 block"
                >
                  Ver Detalhes
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Nenhuma partida disponível para este esporte.</p>
        )}
      </div>
    </div>
  );

}

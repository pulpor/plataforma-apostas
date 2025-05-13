import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { SportsContext } from '../contexts/SportsContext'; // Contexto para acessar as informações

// Função para formatar o nome do esporte
function formatSportName(sport: string | undefined): string {
  if (!sport) return '';

  // Mapa de esportes personalizados para facilitar a leitura
  const map: Record<string, string> = {
    'americanfootball_nfl': 'NFL (Futebol Americano)',
    'americanfootball_ncaaf': 'NCAA (Universitário)',
    'americanfootball_nfl_super_bowl_winner': 'NFL - Super Bowl',
    'basketball_nba': 'NBA (Basquete)',
    'soccer_epl': 'Premier League',
  };

  return map[sport] || sport
    .replace(/_/g, ' ') // Substitui os underlines por espaços
    .split(' ') // Divide a string em palavras
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza a primeira letra de cada palavra
    .join(' '); // Junta as palavras
}

export default function SportDetail() {
  const { sport } = useParams(); // Pegando o esporte da URL
  const { upcomingMatches } = useContext(SportsContext); // Contexto para acessar as informações
  const [matches, setMatches] = useState<any[]>([]); // Estado para armazenar as partidas

  useEffect(() => {
    if (sport) {
      console.log("Sport na URL:", sport);
      console.log("Matches disponíveis:", upcomingMatches);

      const filteredMatches = upcomingMatches.filter((match) => {
        // Normalizando para garantir que comparações sejam feitas sem diferença de maiúsculas/minúsculas ou underscores
        const sportKeyNormalized = match.sport_key.toLowerCase().replace(/_/g, '');
        const sportParamNormalized = sport.toLowerCase().replace(/_/g, '');

        // Verificando se o nome do esporte da URL é um prefixo do nome da chave do esporte
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
    <div className="p-6 bg-gray-50 min-h-screen">
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

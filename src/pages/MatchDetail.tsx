import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SportsContext } from '../contexts/SportsContext'; // Contexto para acessar as informações

export default function MatchDetail() {
  const { id } = useParams();
  const { upcomingMatches } = useContext(SportsContext);

  const [matchDetails, setMatchDetails] = useState<any | null>(null);

  useEffect(() => {
    if (id && upcomingMatches.length > 0) {
      const match = upcomingMatches.find((match) => match.id === id);
      setMatchDetails(match);
    }
  }, [id, upcomingMatches]);

  if (!matchDetails) {
    return <p>Carregando detalhes da partida...</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Detalhes da Partida
        </h2>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-2xl font-bold text-gray-800">{matchDetails.home_team} vs {matchDetails.away_team}</h3>
            <p className="text-sm text-gray-500">
              <strong>Data:</strong> {new Date(matchDetails.commence_time).toLocaleString()}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-100 rounded-lg shadow">
              <h4 className="font-semibold text-gray-700">Odds Casa</h4>
              <p className="text-xl text-blue-700">{matchDetails.bookmakers[0]?.markets[0]?.outcomes[0]?.price || 'N/A'}</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg shadow">
              <h4 className="font-semibold text-gray-700">Empate</h4>
              <p className="text-xl text-yellow-700">{matchDetails.bookmakers[0]?.markets[0]?.outcomes[1]?.price || 'N/A'}</p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg shadow">
              <h4 className="font-semibold text-gray-700">Odds Visitante</h4>
              <p className="text-xl text-red-700">{matchDetails.bookmakers[0]?.markets[0]?.outcomes[2]?.price || 'N/A'}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-lg text-gray-800 font-semibold mb-2">Informações adicionais</p>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-600">Transmissão ao vivo disponível para esta partida.</li>
              <li className="text-gray-600">Análise detalhada de desempenho será atualizada após o jogo.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


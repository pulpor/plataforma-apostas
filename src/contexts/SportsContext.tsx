import { createContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';

interface Match {
  id: string;
  sport_key: string;
  home_team: string;
  away_team: string;
  commence_time: string;
  bookmakers?: {
    title: string;
    markets: {
      key: string;
      outcomes: { name: string; price: number }[];
    }[];
  }[];
}

interface SportsContextProps {
  sports: string[];
  upcomingMatches: Match[];
  loading: boolean;
}
const SportsContext = createContext<SportsContextProps>({
  sports: [],
  upcomingMatches: [],
  loading: false,
});

export const SportsProvider = ({ children }: { children: ReactNode }) => {
  const [sports, setSports] = useState<string[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      if (!apiKey) {
        console.error('A chave da API não foi definida. Verifique o arquivo .env e reinicie o servidor.');
        return;
      }

      setLoading(true);
      try {
        const sportsResponse = await fetch(`https://api.the-odds-api.com/v4/sports?apiKey=${apiKey}`);
        
        if (!sportsResponse.ok) {
          const errorText = await sportsResponse.text();
          throw new Error(`Erro na API de esportes: ${sportsResponse.status} - ${errorText}`);
        }

        interface SportApiResponse {
          key: string;
          active: boolean;
          group: string;
        }

        const sportsData: SportApiResponse[] = await sportsResponse.json();
        const validSports = sportsData.filter((sport) => sport.active && sport.group !== 'Specials');
        const sportKeys = validSports.map((sport) => sport.key);

        setSports(sportKeys);
        console.log('Esportes válidos:', validSports);

        if (validSports.length === 0) {
          console.warn('Nenhum esporte com odds disponíveis.');
          setUpcomingMatches([]);
          return;
        }

        const selectedSportKey = validSports[0].key;
        console.log('Buscando jogos para o esporte:', selectedSportKey);

        const oddsUrl = `https://api.the-odds-api.com/v4/sports/${selectedSportKey}/odds/?apiKey=${apiKey}&regions=us&markets=h2h&oddsFormat=american`;
        console.log('Buscando probabilidades em:', oddsUrl);

        const oddsResponse = await fetch(oddsUrl);
        if (!oddsResponse.ok) {
          const errorText = await oddsResponse.text();
          throw new Error(`Erro na API de odds: ${oddsResponse.status} - ${errorText}`);
        }

        const oddsData = await oddsResponse.json();
        setUpcomingMatches(oddsData);
        console.log('Jogos próximos carregados:', oddsData);
      } catch (error: unknown) {
        console.error('🔴 Erro ao buscar dados da API:', error);

        let errorMessage = '';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }

        if (
          errorMessage.includes('Usage quota has been reached') ||
          errorMessage.includes('exceeded') ||
          errorMessage.includes('429') ||
          errorMessage.toLowerCase().includes('limit')
        ) {
          console.error('\n' + '👇'.repeat(10));
          console.error('LIMITE GRATUITO EXCEDIDO NA API');
          console.error('👆'.repeat(10));
          console.error(`A chave de API atual atingiu o número máximo de requisições permitido no plano gratuito da The Odds API.\n
            Mensagem de erro: ${errorMessage}\n
            Essa mensagem foi exibida automaticamente para fins de controle interno.
          `);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);


  const contextValue = useMemo(
    () => ({ sports, upcomingMatches, loading }),
    [sports, upcomingMatches, loading]
  );

  return (
    <SportsContext.Provider value={contextValue}>
      {children}
    </SportsContext.Provider>
  );
};

export default SportsContext;

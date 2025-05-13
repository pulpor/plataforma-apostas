export default function formatSportName(sport: string): string {
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

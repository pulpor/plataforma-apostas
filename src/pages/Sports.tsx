import { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SportsContext from '../contexts/SportsContext';
import formatSportName from '../utils/formatSportName';

function SportsPage() {
  const { sports, loading } = useContext(SportsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('busca') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams(value ? { busca: value } : {});
  };

  const filteredSports = sports.filter((sport) =>
    sport.key?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sport.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-6 py-10 bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-4">Esportes</h1>
      <input
        type="text"
        placeholder="Buscar esporte"
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 mb-6 border rounded-full w-full"
      />

      {loading ? (
        <p className="text-center text-gray-500">Carregando...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredSports.map((sportKey) => (
            <Link
              key={sportKey}
              to={`/sports/${sportKey}`}
              className="block p-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:bg-blue-50 transition text-center"
            >
              <span className="text-blue-700 text-lg font-semibold">
                {formatSportName(sportKey)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SportsPage;
import { useContext } from 'react'
import { SportsContext } from '../contexts/SportsContext'
import { Link } from 'react-router-dom'

export default function Sports() {
  const { sports, loading } = useContext(SportsContext)

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Esportes Disponíveis</h2>
      {loading ? (
        <p>Carregando esportes...</p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-4">
          {sports.map((sport, index) => (
            <li key={index}>
              <Link
                to={`/sports/${sport.toLowerCase().replace(/\s/g, '-')}`}
                className="block bg-blue-100 hover:bg-blue-200 p-4 rounded shadow"
              >
                {sport}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

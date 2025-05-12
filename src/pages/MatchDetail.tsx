import { useParams } from 'react-router-dom'

export default function MatchDetail() {
  const { id } = useParams()

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Detalhes da Partida {id}</h2>
      <p className="mt-2">Odds, estatísticas e informações completas da partida.</p>
    </div>
  )
}

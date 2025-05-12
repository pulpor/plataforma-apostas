import { useParams } from 'react-router-dom'

export default function SportDetail() {
  const { sport } = useParams()

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Ligas para: {sport}</h2>
      <p className="mt-2">Aqui vão as ligas e partidas do esporte selecionado.</p>
    </div>
  )
}

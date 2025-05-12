const API_KEY = import.meta.env.CHAVE
const BASE_URL = 'https://api.the-odds-api.com/v4'

export async function fetchSports() {
  const res = await fetch(`${BASE_URL}/sports?apiKey=${API_KEY}`)
  if (!res.ok) throw new Error('Erro ao buscar esportes')
  return res.json()
}

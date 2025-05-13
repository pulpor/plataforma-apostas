import { createContext, useState, useEffect } from "react"
import type { ReactNode } from 'react'

interface SportsContextProps {
  sports: string[]
  loading: boolean
}

export const SportsContext = createContext<SportsContextProps>({
  sports: [],
  loading: false,
})

export function SportsProvider({ children }: { children: ReactNode }) {
  const [sports, setSports] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchSports() {
      const apiKey = import.meta.env.VITE_CHAVE;
      
      if (!apiKey) {
        console.error("A chave da API não foi definida.");
        return;
      }
      
      try {
        setLoading(true);
        const res = await fetch(`https://api.the-odds-api.com/v4/sports?apiKey=${apiKey}`);
        const data = await res.json();

        console.log(data);
        setSports(data);

      } catch (error) {
        console.error("Erro ao buscar esportes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSports();
  }, []);


  return (
    <SportsContext.Provider value={{ sports, loading }}>
      {children}
    </SportsContext.Provider>
  )
}

export default SportsProvider;

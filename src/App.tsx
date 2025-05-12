import AppRouter from './routes/AppRouter'
import { SportsProvider } from './contexts/SportsContext'

export default function App() {
  return (
    <SportsProvider>
      <AppRouter />
    </SportsProvider>
  )
}

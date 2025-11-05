import { Routes, Route, Navigate } from 'react-router-dom'
import CharacterList from './pages/CharacterList'
import CharacterDetail from './pages/CharacterDetail'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <ThemeToggle />

      <Routes>
        <Route path="/" element={<Navigate to="/lista-de-personajes" />} />
        <Route path="/lista-de-personajes" element={<CharacterList />} />
        <Route path="/personaje/:id" element={<CharacterDetail />} />
      </Routes>
    </div>
  )
}

export default App

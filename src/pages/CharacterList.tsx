import CharacterCard from '../components/CharacterCard'
import SearchBar from '../components/SearchBar'
import { useFetchCharacters } from '../hooks/useFetchCharacters'

const CharacterList = () => {
  const {
    characters,
    loading,
    error,
    hasMore,
    query,
    setQuery,
    loadMore,
  } = useFetchCharacters()

  // 🌀 Scroll infinito
  // (Detecta cuando el usuario llega al final de la página y carga más resultados)
  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 200 >=
      document.documentElement.offsetHeight
    ) {
      loadMore()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Lista de Personajes
        </h1>

        <SearchBar searchTerm={query} setSearchTerm={setQuery} />

        {error && (
          <p className="text-center text-red-500 dark:text-red-400 mt-4">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>

        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            Cargando...
          </p>
        )}
        {!hasMore && !loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            No hay más personajes para mostrar.
          </p>
        )}
      </div>
    </div>
  )
}

export default CharacterList
